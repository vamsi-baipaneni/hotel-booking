import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const ImageSection = () => {
    const {register ,watch, setValue, getValues, formState: {errors}, control} = useFormContext();
    const images = useWatch({name: 'imageFiles', control});
    const imageUrls = useWatch({name: 'imageUrls', control});

    const handleDelete = (e, index)=>{
        e.preventDefault();
        const currentImages = images;
        const updatedImages = Array.from(currentImages).filter((_,i)=>i!==index);
        const datatransfer = new DataTransfer();
        updatedImages.forEach(image=>datatransfer.items.add(image));
        setValue('imageFiles',datatransfer.files);
    }

    const handleUrlDelete = (e, index)=>{
        e.preventDefault();
        const currentUrls = imageUrls;
        const updatedUrls = currentUrls.filter((_, i)=>i!==index);
        setValue('imageUrls', updatedUrls);
    }

  return (
    <div className='gap-4 flex flex-col'>
        <div className='flex flex-row gap-1 items-center justify-start'>
            <h2 className='text-2xl font-bold'>Upload Images</h2>
            <span className='text-sm font-light mt-1.5'>(Max upload 6 images)</span>
        </div>
        <input
        type='file'
        multiple
        accept='image/*'
        {...register('imageFiles', {
            validate: (images)=>{
                const length = images.length+(imageUrls?.length || 0);
                if(length<=0){
                    return "Please upload atleast one image"
                }
                if(length>6){
                    return "Cannot upload more than 6 images. Try again!"
                }
                return true;
            }
        })}
        />
        {errors.imageFiles && <span className='text-red-500 font-semibold'>{errors.imageFiles.message}</span>}
        <div className='flex flex-wrap gap-2'>
            {imageUrls && imageUrls.map((url,urlIndex)=>(
                <div key={urlIndex} className='relative group'>
                    <img
                    src = {url}
                    alt = {`Preview ${urlIndex}`}
                    className='w-40 h-40 object-cover'
                />
                <button onClick={(e)=>handleUrlDelete(e,urlIndex)} className='absolute top-0 right-0 group-hover:bg-red-600 flex justify-center items-center text-white w-6 h-6 rounded-full text-xs'>
                    &times;
                </button>
                </div>
            ))}
            {Array.from(images || []).map((image,index)=>(
                <div className='relative group' key={index}>
                    <img
                        src={URL.createObjectURL(image)}
                        alt = {`Preview ${index}`}
                        className='w-40 h-40 object-cover'
                    />
                    <button onClick={(e)=>handleDelete(e,index)} className='absolute top-0 right-0 group-hover:bg-red-600 flex justify-center items-center text-white w-6 h-6 rounded-full text-xs'>
                        &times;
                    </button>
                </div>
            ))}

        </div>
    </div>
  )
}

export default ImageSection;

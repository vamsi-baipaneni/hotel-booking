import React from 'react';
import { useFormContext } from 'react-hook-form';

const ImageSection = () => {
    const { formState: { errors }, watch, setValue, getValues } = useFormContext();
    const totalImages = watch('imageFiles') || [];

    const arrayToFileList = (filesArray) =>{
        const dataTransfer = new DataTransfer();
        filesArray.forEach(file => dataTransfer.items.add(file));
        return dataTransfer.files;
    }

    const handleImageChange = (event)=>{
        const newImages = Array.from(event.target.files);
        const currentImages = Array.from(totalImages);
        const finalImages = arrayToFileList(currentImages.concat(newImages))
        setValue('imageFiles', finalImages);
    }

    const removeImage = (index) => {
        const currentFiles = Array.from(totalImages);
        currentFiles.splice(index, 1);
        const newFileList = arrayToFileList(currentFiles);
        setValue('imageFiles', newFileList);
    };

    return (
        <div>
            <h2 className='text-xl font-semibold mb-4'>Upload Images</h2>
            <div className='p-4 border rounded flex flex-col gap-4'>
                <input 
                    type='file' 
                    multiple 
                    accept='image/*'
                    onChange={handleImageChange}

                    /*
                    {...register('imageFiles', {
                        validate: (imageFiles) => {
                            if (imageFiles.length === 0) {
                                return "Please add at least one image";
                            }
                            return true;
                        }
                    })}
                    */
                    
                    disabled={totalImages.length >= 6} 
                    className='w-full'
                />
                {errors.imageFiles && <span className='text-red-500 font-semibold'>{errors.imageFiles.message}</span>}

                <div className='flex flex-wrap gap-2'>
                    {Array.from(getValues('imageFiles') || []).map((file, index) => (
                        <div key={index} className='relative'>
                            <img 
                                src={URL.createObjectURL(file)} 
                                alt={`Preview ${index}`} 
                                className='w-20 h-20 object-cover'
                            />
                            <button 
                                type='button' 
                                onClick={() => removeImage(index)} 
                                className='absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center'>
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageSection;
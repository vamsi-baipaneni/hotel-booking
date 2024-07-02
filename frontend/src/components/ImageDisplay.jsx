import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { FaPlay } from 'react-icons/fa';

const ImageDisplay = ({imageUrls}) => {
    const length = imageUrls.length;
    const [index, setIndex] = useState(0);
    const handleIncrement = (e)=>{
        if(index+1 <= length-1){
            setIndex(index+1);
        }
        setIndex(0);
    }

    const handleDecrement = (e)=>{
        if(index-1>=0){
            setIndex(index-1);
        }
        setIndex(length-1);
    }

    return (
        <div className='w-full h-[300px]'>
            <img
            src={imageUrls[index]}
            alt='Preview'
            className='w-full h-full object-cover object-center'/>
        </div>
    )
}
ImageDisplay.propTypes = {
    imageUrls: PropTypes.array
}
export default ImageDisplay;

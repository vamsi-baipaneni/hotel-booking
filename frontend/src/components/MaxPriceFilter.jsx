import React, { useEffect, useState } from 'react';

const MaxPriceFilter = ({currentMaxPrice, onChange}) => {
    const handleConfirm = ()=>{
        onChange(price);
    }
    const [price, setPrice] = useState(currentMaxPrice);

    useEffect(()=>{
        setPrice(currentMaxPrice);
    },[currentMaxPrice]);

  return (
    <div className='border p-3 flex flex-col'>
      <h4 className='text-md font-semibold mb-2'>Max Price</h4>
      <input type = 'number' value={price} placeholder='$' className='font-light p-1 border rounded-sm mb-1' onChange={(e)=>setPrice(e.target.value)}/>
      <button className='bg-blue-500 text-white rounded-sm p-1 text-sm' onClick={handleConfirm}>Set Price</button>
    </div>
  )
}

export default MaxPriceFilter;

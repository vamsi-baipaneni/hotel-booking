import React from 'react'

const Home = () => {
  return (
    <div className='bg-orange-200 absolute -top-5 right-0 left-0 flex flex-row shadow-lg'>
      <form className='bg-blue-600 px-2 py-2 flex container justify-evenly mx-auto'>
        <input className='py-2 px-2 items-center justify-center' placeholder='Title...'></input>
        <div className='justify-center space-x-2'>
          <span className='justify-center items-center'>Beds</span>
          <select>
            <option value = "" >Please select a value</option>
            <option value = "1" >1 Bed</option>
            <option value = "2" >2 Bed</option>
            <option value = "3" >3 Bed</option>
            <option value = "4" >4 Bed</option>
            <option value = "5" >5 Bed</option>
          </select>
        </div>
        <div className='justify-center space-x-2'>
          <span className='justify-center items-center'>Baths</span>
          <select>
            <option value = "" >Please select a value</option>
            <option value = "1" >1 Bath</option>
            <option value = "2" >2 Bath</option>
            <option value = "3" >3 Bath</option>
            <option value = "4" >4 Bath</option>
            <option value = "5" >5 Bath</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default Home

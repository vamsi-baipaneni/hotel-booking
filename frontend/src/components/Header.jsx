import React from 'react';
import {Link} from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import SignOutButton from './SignOutButton';

const Header = () => {


  const {isLoggedIn} = useAuthContext();
  return (
    <div className='bg-blue-800 py-10 max-w-screen '>
      <div className='md:container md:mx-auto flex justify-between'>
        <span className='text-3xl text-white tracking-tight font-bold'>
            <Link to='/'>MernHolidays.com</Link>
        </span>
        <span className='flex gap-2'>
          {isLoggedIn?
          <>
          <Link className = "flex items-center px-4 text-md text-white font-bold hover:cursor-pointer hover:bg-white hover:text-blue-800" to = "/about">About</Link>
          <Link className = "flex items-center px-4 text-md text-white font-bold hover:cursor-pointer hover:bg-white hover:text-blue-800" to = "/add-hotel">Add Hotel</Link>
          <SignOutButton />
          </>
          :<Link className='flex items-center px-4 text-md text-blue-800 font-bold bg-white hover:cursor-pointer hover:bg-gray-300' to="/login">Log in</Link>
        }
        </span>
      </div>
    </div>
  )
}

export default Header;
 
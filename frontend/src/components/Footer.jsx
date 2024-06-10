import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='bg-blue-800 md:py-10 max-w-screen'>
      <div className='container mx-auto flex md:flex-row items-center justify-between'>
        <span className='text-2xl text-white tracking-tight font-bold'>
            <Link to="/">MernHolidays.com</Link>
        </span>
        <div className='flex gap-4'>
            <span className='text-xl text-white tracking-tight font-bold'>
                <Link to="/about">About</Link>
            </span>
            <span className='text-xl text-white tracking-tight font-bold'>
                <Link to="/privacy-notice">Privacy Policy</Link>
            </span>
            <span className='text-xl text-white tracking-tight font-bold'>
                <Link to="/contactus">Contact Us</Link>
            </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;

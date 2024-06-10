import React, { useEffect } from 'react'
import PropTypes from 'prop-types';

const Toast = ({message, status, onClose}) => {

    useEffect(()=>{
        const timer = setTimeout(()=>{
            onClose();
        },5000);

        return ()=>{
            clearTimeout(timer);
        };
    }, [onClose]);

    const styles = status==="SUCCESS" ? 
    "fixed max-w-md z-50 p-4 top-4 right-4 bg-green-600 border-rounded" : "fixed max-w-md z-50 p-4 top-4 right-4 bg-red-600 border-rounded" ;

  return (
    <div className = {styles}>
      <div className='justify-center items-center'>
        <span className='font-semibold text-white text-lg'>{message}</span>
      </div>
    </div>
  );
};

Toast.propTypes = {
    message: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Toast;

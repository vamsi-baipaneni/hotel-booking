import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as apiClient from '../fetch/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Signin = () => {

  const {showToast} = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.submitLogin, {
    onSuccess: async ()=>{
      showToast({message: "Login Successful!", status: "SUCCESS"});
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error)=>{
      showToast({message: error.message, status: "ERROR"});
    }
  })

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData({
      ...formData,[name]: value
    });
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    const formErrors = {};
    if(formData.email.trim()===""){
      formErrors.email = "Please enter a valid email"
    }
    if(formData.password===""){
      formErrors.password = "Please enter a password"
    }
    setErrors(formErrors);

    if(Object.keys(formErrors).length===0){
      mutation.mutate(formData);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <form onSubmit = {handleSubmit} className='flex flex-col gap-4 w-96'>
        <h2 className='text-3xl text-black font-bold tracking-tight'>Welcome to MernHolidays, Please login here to continue...</h2>
        <div className='flex flex-col gap-5'>
          <label className='flex flex-col text-xl font-light tracking-tight'>
            Email
            <input name='email' type="email" className='border rounded-sm px-2 py-2 border-black' onChange={handleChange}></input>
            {errors.email && <span className='text-red-500'>{errors.email}</span>}
          </label>
          <label className='flex flex-col text-xl font-light tracking-tight'>
            Password
            <input name='password' type="password" className='border rounded-sm px-2 py-2 border-black' onChange={handleChange}></input>
            {errors.password && <span className='text-red-500'>{errors.password}</span>}
          </label>
        </div>
        <div className='flex flex-col gap-5 items-center'>
          <span className='text-md font-light tracking-tight justify-start'>New User? <Link className="hover:cursor-pointer underline" to="/register">Sign Up Here</Link></span>
          <button className='bg-blue-800 px-1 py-2 text-white rounded-sm active:bg-blue-700 active:shadow-lg text-xl w-full'>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Signin;

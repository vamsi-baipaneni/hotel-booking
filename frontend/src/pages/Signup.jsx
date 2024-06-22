import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as apiClient from '../fetch/api-client';
import { useAuthContext } from '../context/AuthContext';

const Signup = () => {

  const {showToast} = useAuthContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(apiClient.submitForm, {
    onSuccess : async () =>{
      showToast({message: "Registration Successful!", status: "SUCCESS"});
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError:(error)=>{
      showToast({message: error.message, status: "ERROR"});
    }
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryCode: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  const countryCodes = [
    {code: '+1', name: 'United States'},
    {code: '+91', name: 'India'}
  ];

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData({
      ...formData, [name]: value
    });
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const validationErrors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!formData.firstName.trim()){
      validationErrors.firstName = "First Name is required"
    }
    if(!formData.lastName.trim()){
      validationErrors.lastName = "Last Name is required"
    }
    if(!formData.email || !emailRegex.test(formData.email)){
      validationErrors.email = "Please provide a valid email"
    }
    if(!formData.password || !passwordRegex.test(formData.password) || formData.password.length<8){
      validationErrors.password = "Please provide a valid password"
    }
    if(formData.password!==formData.confirmPassword){
      validationErrors.confirmPassword = "Password's Don't Match"
    }
    if(formData.countryCode==""){
      validationErrors.countryCode = "Please select a valid country code"
    }
    if(formData.phoneNumber.length!==10){
      validationErrors.phoneNumber = "Please provide a valid phone number"
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const {confirmPassword, ...dataToSubmit} = formData;
      // Form is valid, submit the data
      mutation.mutate(dataToSubmit);
    }
  }

  return (
    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
      <h2 className='text-4xl text-black tracking-tight font-bold'>Create an Account</h2>
      <div className='flex flex-col md:flex-row gap-5'>
        <label className='text-l font-light tracking-tight flex-1'>First Name
          <input name="firstName" className='border rounded w-full py-2 px-2' onChange={handleChange}></input>
          {errors.firstName && <span className='text-red-500'>{errors.firstName}</span>}
        </label>
        <label className='text-l font-light tracking-tight flex-1'>Last Name
          <input name="lastName" className='border rounded w-full py-2 px-2' onChange={handleChange}></input>
          {errors.lastName && <span className='text-red-500'>{errors.lastName}</span>}
        </label>
      </div>
      <label className='text-l font-light tracking-tight flex-1'>Email
        <input name = "email" className='border rounded w-full px-2 py-2' onChange={handleChange} autoComplete='true'></input>
        {errors.email && <span className='text-red-500'>{errors.email}</span>}
      </label>
      <label className='text-l font-light tracking-tight flex-1'>Password
        <input name = "password" type = 'password' className='border rounded w-full px-2 py-2' onChange = {handleChange}></input>
        {errors.password && <span className='text-red-500'>{errors.password}</span>}
      </label>
      <label className='text-l font-light tracking-tight flex-1'>Confirm Password
        <input name="confirmPassword" type = 'password' className='border rounded w-full px-2 py-2' onChange={handleChange}></input>
        {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword}</span>}
      </label>
      <label className='text-l font-light tracking-tight flex-1 flex gap-5'>
        Country Code
        <select name='countryCode' onChange={handleChange}>
          <option value="">Please select an option</option>
          {
            countryCodes.map((country)=>(
              <option key={country.code} value={country.code}>{country.code} ( {country.name} )</option>
            ))
          }
        </select>
        {errors.countryCode && <span className='text-red-500'>{errors.countryCode}</span>}
      </label>
      <label className='text-l font-light tracking-tight flex-1'>Phone Number
        <input name="phoneNumber" className='border rounded w-full px-2 py-2' onChange={handleChange}></input>
        {errors.phoneNumber && <span className='text-red-500'>{errors.phoneNumber}</span>}
      </label>
      <span className='flex flex-row justify-between items-center'>
        <span className='text-l font-light tracking-tight'>Already registered? Please <Link className='hover:cursor-pointer underline' to="/login">Sign in here</Link></span>
        <button className='bg-blue-800 text-white text-3xl p-2 border rounded-md disabled:bg-slate-600 active:bg-blue-700 active:shadow-lg' disabled={formData.email===""}>Create Account</button>
      </span>
    </form>
  );
};

export default Signup;

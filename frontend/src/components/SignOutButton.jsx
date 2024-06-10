import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useAuthContext } from '../context/AuthContext';
import * as apiClient from '../fetch/api-client'

const SignOutButton = () => {

    const queryClient = useQueryClient();
    const {showToast} = useAuthContext();

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async ()=>{
            showToast({message: "Logout Successul!", status: "SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
        },
        onError: (error)=>{
            showToast({message: error.message, status: "ERROR"})
        }
    });

    const handleClick = ()=>{
        mutation.mutate();
    }

  return (
    <button className='flex items-center px-4 text-md text-blue-800 bg-white font-bold hover:cursor-pointer hover:bg-gray-300'
    onClick={handleClick}>
        Log Out
    </button>
  )
}

export default SignOutButton

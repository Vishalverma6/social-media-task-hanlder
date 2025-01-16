import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { login } from '../../../services/operations/authApi';


const LoginForm = () => {

    const dispatch= useDispatch();
    const navigate =useNavigate();

    const [formData, setFormData]= useState({
    userName:"", 
    password:"",
      });

      const {userName,password}= formData
      const [showPassword, setShowPassword]=useState(false);
      function changeHandler(event) {
      setFormData((prevData) => (
            {...prevData,
                [event.target.name]:event.target.value
            }
        ))
    }

    function visibilityHandler(){
      setShowPassword((prev) => !prev)
  }


  function submitHandler(event){
    event.preventDefault();
    dispatch(login(userName,password,navigate))

    console.log("Printing the form Data :",formData)
   } 

  return (
    <div className='flex flex-col text-white w-9/12 md:w-5/12 max-w-[1050px] justify-between py-12 mx-auto gap-y-12 mt-7 gap-x-36'>
      <form onSubmit={submitHandler}
        className='flex flex-col w-full gap-y-4 mt-6'
      >

             <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    userName <sup className='text-pink-200'>*</sup>
                </p>
                <input
                 required type='text'
                 value={formData.userName}
                 placeholder='Enter UserName'
                 name='userName'
                 onChange={changeHandler}
                 className='bg-richblack-800 rounded-[.5rem] text-richblack-5 w-full p-[8px] border-b-2' 
                />
            </label>

            <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Password <sup className='text-pink-200'>*</sup>
                </p>
                <input
                required type={showPassword ? ("text"): ("password")}
                value={formData.password} 
                placeholder='Enter Password'
                name='password'
                onChange={changeHandler}
                
                className='bg-richblack-800 rounded-[.5rem] text-richblack-5 w-full p-[8px] border-b-2  '
                />
                <span onClick={visibilityHandler} 
                className='absolute right-3 top-[38px] cursor-pointer'
                >
                    {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):
                    (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                </span>

                <button type='submit'
              className='bg-yellow-50 mt-6 rounded-[8px] py-[8px]
              px-[12px] font-medium text-richblack-900 w-full'>
                  Sign In
            </button>
            </label>
      </form>
      
      
    </div>
  )
}

export default LoginForm

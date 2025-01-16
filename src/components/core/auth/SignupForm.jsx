import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../../services/operations/authApi';

const SignupForm = () => {
    const dispatch= useDispatch()
    const [formData, setFormData] = useState({
        name:"",
        userName:"",
        password:"",
        confirmPassword:"",
    });

    const navigate= useNavigate();
    const[showPassword,setShowPassword]= useState(false);
    const [showConfirmPassword,setShowConfirmPassword]= useState(false)

    function changeHandler(event){
        setFormData((prev)=> (
            {
                ...prev,
                [event.target.name]:event.target.value
            }
        ))
    }

    const {name,
        userName
        ,password
        ,confirmPassword} = formData

    function submitHandler(event){
        event.preventDefault();
        if(formData.password!==formData.confirmPassword){
            console.log("password do not match")
            toast.error("Password do not matched")
            return
        }

        const signupData ={
            ...formData
        };
        // dispatch(signupForm(signupData));
        dispatch(signUp(name,userName,password,confirmPassword,navigate))

        // reset signUp form
        setFormData({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:"",
        })
            
    }


  return (
    <div className='flex flex-col text-white w-9/12 md:w-5/12 max-w-[1050px] justify-between py-12 mx-auto gap-y-12 mt-7 gap-x-36'>
      <h1 className='text-2xl'>
        Welcome to the Admin Signup Page. Only users with administrative privileges are allowed.
      </h1>

      <form onSubmit={submitHandler} 
       className='w-full'
      >
         
               <label>
                    <p className='text-[0.875] text-richblack-5 mb-1 leading-[1.375]'>
                        Name <sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                       type='text'
                       name='name'
                       value={formData.name}
                       placeholder='Enter Your Name'
                       onChange={changeHandler}
                       className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-2'
                    />
                </label>
         
         
            <label>
              <p className='text-[0.875] text-richblack-5 mb-1 leading-[1.375]'>
                  User Name <sup className='text-pink-200'>*</sup>
              </p>
              <input 
                 type='text'
                  name='userName'
                  value={formData.userName}
                  placeholder='Enter User Name'
                  onChange={changeHandler}
                  className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-2'
                />
            </label>
         

         {/* Password and confirm password  */}
         <div className='flex flex-col md:flex-row gap-x-4 mt-[20px]'>
                <label className='relative'>
                    <p className='text-[0.875] text-richblack-5 mb-1 leading-[1.375]'>
                        Create Password<sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                       type={showPassword ?"text" : "password"}
                       name='password'
                       value={formData.password}
                       placeholder='Enter password'
                       onChange={changeHandler}
                       className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-2'
                    />
                    <span onClick={()=> setShowPassword((prev)=> !prev)}
                    className='absolute right-3  top-[38px] cursor-pointer'>
                        {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>):
                        (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)}
                    </span>
                </label>
                <label className='relative'>
                    <p className='text-[0.875] text-richblack-5 mb-1 leading-[1.375]'>
                        Confirm password<sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                       type={showConfirmPassword ? "text":"password"}
                       name='confirmPassword'
                       value={formData.confirmPassword}
                       placeholder='Confirm Password'
                       onChange={changeHandler}
                       className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-2'
                    />
                    <span onClick={()=> setShowConfirmPassword( (prev)=> !prev)}
                    className='absolute right-3 top-[38px]  cursor-pointer'
                    >
                          {
                            showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>):
                            (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)
                          }
                    </span>
                </label>

                </div>
                <button type='submit'
                className='bg-yellow-50 mt-6 rounded-[8px] py-[8px]
                px-[12px] font-medium text-richblack-900 w-full'>
                    Create Account
                </button>
      </form>
    </div>
  )
}

export default SignupForm

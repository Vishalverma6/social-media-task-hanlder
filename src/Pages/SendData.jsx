import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { sendUserData } from '../services/operations/ottherAPI'
import toast from 'react-hot-toast'

const SendData = () => {

    const {register,reset, handleSubmit,setValue
        , formState:{errors} 
    } = useForm()
    const [selectedFile, setSelectedFile] = useState([]);

    const onSubmit =async(data)=> {
        try{

            const formData= new FormData();
            formData.append("name",data.name);
            formData.append("socialMediaHandle", data.socialMediaHandle);

            // Append All slected images
            selectedFile.forEach((image) => {
                formData.append("images",image);
            })

            const result = await sendUserData(formData);
            console.log("result",result);
            // toast.success("Data submitted successFully");
        }
        catch(error){
            console.log(error);
            toast.error("Data could not Submitted")
        }
        reset();
        setSelectedFile([]);
    }

    const handleFileChange =(event)=> {
        const files = Array.from(event.target.files);
        setSelectedFile((prevFiles) => [...prevFiles, ...files])

    }
    console.log("selected Files",selectedFile)
   

  return (
    <div className='text-white flex flex-col ml-5 md:ml-32 justify-center w-8/12 gap-2 mt-20'>
        <h1 className='text-3xl '>
            User Submission Form
        </h1>
       <form onSubmit={handleSubmit(onSubmit)} 
        className='flex flex-col w-9/12 gap-2 justify-center '
       >
          <label className="text-sm text-richblack-5" htmlFor='name'>Name<sup className='text-red-500'>*</sup></label>
           <input
                id='name'
                placeholder='Please enter Your Name '
                {...register("name",{required:true})}
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-2'
                />
                {errors.name && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Name is required**
                </span>
                )}      
            
            {/* Social media handle */}

            <label className="text-sm text-richblack-5" htmlFor='socialMediaHandle'>Social Media Handle<sup className='text-red-500'>*</sup></label>
             <input
                id='socialMediaHandle'
                placeholder='Please enter Social Media Handle '
                {...register("socialMediaHandle",{required:true})}
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-2'
                />
                {errors.socialMediaHandle && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Social Media Handle is required**
                </span>
                )}   

                {/* Upload Images  */}
                <label className="text-sm text-richblack-5" htmlFor='images'>
                    Upload Images <sup className='text-red-500'>*</sup>
                </label>
                <input
                  id='images'
                  type='file'
                  {...register("images",{required:true})}
                  multiple 
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                 
                  className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-2'
                />
                {errors.images && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Images are required
                </span>
                )} 

                {/* Button */}
                <button type='submit'
                  className='bg-yellow-50 mt-6 rounded-[8px] py-[8px]
                  px-[12px] font-medium text-richblack-900 w-full'
                >
                    Submit
                </button>
       </form>
    </div>
  )
}

export default SendData

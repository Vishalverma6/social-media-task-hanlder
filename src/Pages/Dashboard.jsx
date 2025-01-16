import React, { useEffect, useState } from 'react'
import { deletUserdata, getAllUserData } from '../services/operations/ottherAPI';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [userData, setUserdata] = useState(null);



    const getUserData = async() => {
        try{
            const response = await getAllUserData();
            console.log("Response",response)

            setUserdata(response);
        }
        catch(error){

        }
    }

    useEffect(()=> {
        getUserData();
    },[])

    // const clickHandler =()=> {
    //   getUserData();
    // }
    const DeleteHandler  = async(dataId) => {
      await deletUserdata({dataId});
      // console.log("dataId",dataId)
      // toast.success("deleted")
      getUserData();
    }
  return (
    <div className='bg-richblack-800 w-11/12 mx-auto min-h-screen p-6'>

      {/* <button 
       onClick={() => clickHandler()}
      className='bg-yellow-100 text-richblack-800 hover:bg-yellow-300 rounded-md p-1'>
         User data
      </button> */}
      {/* Heading */}
      <h1 className='text-3xl font-bold text-white mb-6 text-center'>
        All User's Submitted Data
      </h1>

      {/* Data Container */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {userData?.map((data) => (
          <div
            key={data?._id}
            className='bg-blue-600 text-white rounded-lg shadow-lg p-4'
          >
            {/* User Info */}
            <div className='mb-4'>
             <div className='flex justify-between '>
              <p className='text-lg font-semibold'>
                Name: <span className='font-normal'>{data?.name}</span>
              </p>
               <button 
                 onClick={() => DeleteHandler(data?._id)}
               className='bg-yellow-200 py-[6px] rounded-md hover:bg-yellow-400 px-[9px]'>
                  Delete
               </button>
             </div>

              <p className='text-lg font-semibold'>
                Social Media Handle: <span className='font-normal'>{data?.socialMediaHandle}</span>
              </p>
            </div>

            {/* Images Section */}
            <div className='flex flex-wrap gap-4'>
              {data?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`User ${data?.name}'s Image ${index + 1}`}
                  className='w-24 h-24 object-cover rounded-md border-2 border-gray-700'
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard

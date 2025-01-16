import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../services/operations/authApi';


const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state)=> state.auth);
    const location= useLocation();
    const logoutHandler = () => {
        dispatch(logout(navigate));
    }

    const data =[
        {
            title : "Home",
            path: "/"
        },
        {
            title:"Send Data",
            path: "/sendData"
        }
    ];

    const matchRoute = (route)=> {
        return matchPath({path:route},location.pathname)
    }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-700 '>
      <div className='flex w-11/12 max-w-maxContent items-center  justify-between px-1 md:px-24'>
        <nav>
            <ul className='flex gap-x-2 md:gap-x-6 text-richblack-25'>
                {
                    data?.map((link, index) => (
                        <li key={index}>
                            <Link to={link?.path}>
                            <p className={`${matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25" }`}>
                                {link?.title}
                            </p>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>

        {/* Signup and login button */}
        <div className='flex gap-x-3 md:gap-x-4 items-center '>    
                    {
                        token===null && (
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-[10px] py-[6px]
                                text-richblack-100 rounded-md'>
                                    Log In
                                </button>                        
                            </Link>
                        )
                    }
                    {
                        token===null && (
                            <Link to="/signup">
                                <button className='border border-richblack-700 bg-richblack-800 px-[10px] py-[6px]
                                text-richblack-100 rounded-md'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                    token &&(
                        <button 
                        onClick={logoutHandler}
                        className='border border-richblack-700 bg-richblack-800 px-[10px] py-[6px]
                        text-richblack-100 rounded-md'>
                            Logout
                        </button>
                    )
                }
        </div>
      </div>

    </div>
  )
}

export default Navbar

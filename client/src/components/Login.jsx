import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [status, setStatus]=useState("");
    const [error, setError]=useState("");
    const navigate = useNavigate();


axios.defaults.withCredentials = true;
const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:5000/login', {email, password})
    .then(res =>{
        console.log("Response", res)
        if(res.data.Status === "Success"){
          if(res.data.role === 'admin'){
            setStatus(res.data.message)
            navigate("/dashboard")
          }else{
            setStatus("Successfully Logged IN!")
            navigate("/")
          }
        }
        setError(res.data.message)
    }).catch(err => {
        console.log(err)
        setError("Error in Login!")
    })
}
    
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-400'>
        <div className='min-w-[400px] flex justify-center items-center flex-col bg-white text-black px-6 rounded-xl'>
            <div className="my-5">
            {status && <div className='flex text-center text-green-600 py-1'>{status}</div>}
             {error && <div className='flex text-center text-red-600 py-1'>{error}</div>}
            </div>
        <p className='font-bold text-5xl py-6 pb-10'>Login</p>
        <form onSubmit={handleSubmit}>
            <div className='pb-10'>
                <p className='font-bold text-black text-xl'>Email</p>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Enter Email' className='border-gray-300 rounded-md py-1 px-3 placeholder:text-gray-600 min-w-[300px] border-[2px] mt-2 text-start placeholder:text-start outline-none focus:outline-none'/>
            </div>
            <div className='pb-6'>
                <p className='font-bold text-black text-xl'>Password</p>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Enter Password' className='border-gray-300 rounded-md py-1 px-3 placeholder:text-gray-600 min-w-[300px] border-[2px] mt-2 text-start placeholder:text-start outline-none focus:outline-none'/>
            </div>
           <Link to="/forget-password">
           <p className='text-blue-600 font-semibold text-sm pb-4 text-start'>Forget Password?</p>
           </Link>
            <button type='submit' className='min-w-[300px]  rounded bg-green-600 text-white text-center py-1'>Login</button>
            <p className='py-3 text-center text-gray-600'>Haven&apos;t Account</p>
            <Link to="/register" >
                <button className='mb-6 border-2 border-gray-200 rounded min-w-[300px] bg-gray-100 text-gray-800 py-1 text-center'>Register</button>
            </Link>
        </form>
    </div>
    </div>
  )
}

export default Login
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();
    const [errorMessage,setErrorMessage] = useState('');

    const logInUser= async (e)=>{
        e.preventDefault();

        const data={
            email:email,
            password:password
        }
        try{
            await axios.post(`http://localhost:8888/login`,{data}).then(
                (res)=>{
                    if(res.data.length === 1){
                        // console.log("userDAta:",res.data)
                        localStorage.setItem("user", JSON.stringify(res.data));
                        navigate("/");
                    }else{
                        setErrorMessage("incorrect email or password!...Please try again")
                    }
                }
            ).catch(
            (err)=>{
                console.log(err)
            }
            )
        }catch(err){
            console.log(err)
        }
    }
    
  return (
        <div className="grid justify-center content-center w-full  min-h-screen bg-gray-200">
            <form onSubmit={(e)=>logInUser(e)} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[500px] h-[300px]">
                <h1 className='font-bold text-red-600 text-center mb-5'>{errorMessage}</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Email
                    </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="email" placeholder="Email" required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="******************" required />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Log In
                    </button>
                </div>
            </form>
        </div>
  )
}

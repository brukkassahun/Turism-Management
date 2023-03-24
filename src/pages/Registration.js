import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Registration() {
    const [firstName,setFirstName] = useState();
    const [lastName,setLastName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [errorMessage,setErrorMessage] = useState('');
    const navigate = useNavigate();

    const register=async (e)=>{
        e.preventDefault();

        axios.get(`http://localhost:8888/isUserRegistered/${email}`).then(res=>{
            if(res.data.length === 0){
                const data={
                    firstName:firstName,
                    lastName:lastName,
                    email:email,
                    password:password
                }
                
                try{
                    axios.post(`http://localhost:8888/registration`,{data}).then(
                        (res)=>{
                            // localStorage.setItem("user", JSON.stringify(res.data));
                            navigate("/login");
                        }
                    )
                      
                }catch(err){
                    console.log(err)
                }
            }else{
                setErrorMessage("email already in use......Try using another email!")
            }
        }).catch(er=>{
            console.log(er)
        })
    }
    
  return (
        <div className="grid justify-center content-center w-full  min-h-screen bg-gray-200">
            <form onSubmit={(e)=>register(e)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[500px] h-[470px]">
                <h1 className='font-bold text-red-600 text-center mb-5'>{errorMessage}</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                        First Name
                    </label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="firstName" type="text" placeholder="First Name" required/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                        last Name
                    </label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="lastName" type="text" placeholder="Last Name" required/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Email
                    </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="email" placeholder="Email" required/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="******************" required />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
  )
}


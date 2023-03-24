import React from 'react'
import blog from "../imgs/blog.jpg"
import { Link } from "react-router-dom";

export default function ListBlog(props) {
    const id=props.id
    const title=props.title
    const date=props.date
    const image='./uploads/' + props.image
    const user=props.user
    const state={
        id:id
    }
    
    return (
        <div className="w-[360px] h-[400px] bg-gray-100 mr-5 mb-5">
            <div className="w-full h-[200px]">
                <img src={image} className="w-full h-full bg-cover"/>
            </div>
            <div className="w-full h-[100px] mt-5">
                <h1 className="font-bold text-black text-[20px] pl-2">{title}</h1>
            </div>
            <div className="w-full h-[100px] grid grid-cols-2 content-start">
                <div className="w-full h-full grid content-end p-2">
                    <p>{user}</p>
                    <p>{date}</p>
                </div>
                <div className="w-full h-full grid content-end justify-end p-2">
                    <Link to={`/blogDetail/${id}`} state={{ state }} className="bg-blue-400 rounded-md shadow-md p-2 w-[60px] font-bold text-white">
                        Read
                    </Link>
                </div>
            </div>
        </div>
    )
}

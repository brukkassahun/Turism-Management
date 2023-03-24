import React from 'react'
import { Link } from "react-router-dom";

export default function ListPlaces(props) {
    const id = props.id;
    const contentType = props.contentType ;
    const name = props.name ;
    const price = props.price;
    const detail = props.detail;
    const image = './uploads/' + props.image;
    const country = props.country;
    const state={
        id:id,
        contentType:contentType
    }
  
  return (
    <div className="grid w-[280px] rounded-md shadow-md bg-gray-100 m-2">
        <div className="w-[280px] h-[200px]">
            <img alt="image" src={image} className="w-full h-full"/>
        </div>
        <div className="pt-2 pl-2">
            <h1 className="font-bold capitalize">{name}</h1>
        </div>
        <div className="flex overflow-clip content-start h-[160px] p-2">
            <p className="text-justify">{detail}</p>
        </div>
        <div className="p-5 flex content-start justify-end">
            <p className="font-bold border-pink-500 border-2 rounded-md shadow-md p-5">${price}</p>
            <Link to={`/place/detail/${id}`} state={{ state }} className="bg-blue-400 rounded-md shadow-md p-5 ml-5 font-bold text-white">
                Detail
            </Link>
        </div>
        <div className="font-bold bg-black text-white p-2 rounded-sm shadow-sm w-auto capitalize">{country}</div>
    </div>
  )
}

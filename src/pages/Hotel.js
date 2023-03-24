import React , { useEffect , useState } from 'react'
import hotelImg from "../imgs/hotel.jpg"
import ListHotel from '../components/ListHotel'
import axios from 'axios';

export default function Hotel() {
  const [hotel,setHotel] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8888/hotel/get",{}).then(res=>{
        setHotel(res.data)
    }).catch(er=>{
        console.log(er)
    })
}, [])

  return (
    <div className="w-full min-h-screen relative">
      <div className="w-full h-[400px]">
        <img src={hotelImg} className="w-full h-full bg-cover"/>
      </div>
      <div className="w-full h-[400px] bg-black opacity-50 absolute z-20 top-0 left-0 grid content-center">
      </div>
      <div className="w-full h-[400px] bg-transparent absolute z-30 top-0 left-0 grid content-center">
        <h1 className="font-extrabold text-[40px] text-white text-center">Book Your Hotel With Us!</h1>
      </div>

      <div className="p-10 flex flex-wrap justify-start">
      {hotel.map((hotel) => <ListHotel id={hotel.id} name={hotel.name} price={hotel.price} detail={hotel.detail} image={hotel.image} country={hotel.country} />)}
      </div>
    </div>
  )
}

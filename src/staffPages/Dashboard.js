import { useState , useEffect } from "react"
import axios from 'axios';


const Dashboard = () => {
  const [bookings,setBookings]=useState(0)
  const [enq,setEnq]=useState(0)
  const [hotel,setHotel]=useState(0)
  const [hotelBooking,setHotelBooking]=useState(0)
  const [packages,setPackages]=useState(0)
  const [packagesF,setPackagesF]=useState(0)

  useEffect(() => {
    axios.get("http://localhost:8888/hotel/get",{}).then(res=>{
      setHotel(res.data.length);
    }).catch(er=>{
        console.log(er)
    })
    axios.get("http://localhost:8888/hotelBooking/get",{}).then(res=>{
      setHotelBooking(res.data.length);
    }).catch(er=>{
        console.log(er)
    })
    axios.get("http://localhost:8888/packages/allFpackages",{}).then(res=>{
      setPackagesF(res.data.length);
    }).catch(er=>{
        console.log(er)
    })
    axios.get("http://localhost:8888/packages/allPackages",{}).then(res=>{
      setPackages(res.data.length);
    }).catch(er=>{
      console.log(er)
    })
    axios.get("http://localhost:8888/enquiry/all",{}).then(res=>{
      setEnq(res.data.length);
    }).catch(er=>{
      console.log(er)
    })
    axios.get("http://localhost:8888/booking/all",{}).then(res=>{
      setBookings(res.data.length);
    }).catch(er=>{
      console.log(er)
    })

  }, [])

    return (
      <div className="grid w-full min-h-screen content-start text-black bg-white">
        <div className="grid w-full bg-gray-400 h-[150px] p-5">
          <h1 className="text-white font-bold text-[40px]">Dashboard</h1>
        </div>
        <div className="flex flex-wrap">
          <div className="grid w-[300px] h-[100px] text-white content-center justify-center rounded-md shadow-md bg-pink-700 m-5">
            <p className="font-bold">Bookings : {bookings} </p>
            </div>
          <div className="grid w-[300px] h-[100px] text-white content-center justify-center rounded-md shadow-md bg-pink-700 m-5">
            <p className="font-bold">Enquiries : {enq} </p>
            </div>
          <div className="grid w-[300px] h-[100px] text-white content-center justify-center rounded-md shadow-md bg-pink-700 m-5">
            <p className="font-bold">Total Packages : {packages}</p>
            </div>
          <div className="grid w-[300px] h-[100px] text-white content-center justify-center rounded-md shadow-md bg-pink-700 m-5">
            <p className="font-bold">Total Famouse Packages : {packagesF}</p>
          </div>
          <div className="grid w-[300px] h-[100px] text-white content-center justify-center rounded-md shadow-md bg-pink-700 m-5">
            <p className="font-bold">Total Hotels : {hotel}</p>
          </div>
          <div className="grid w-[300px] h-[100px] text-white content-center justify-center rounded-md shadow-md bg-pink-700 m-5">
            <p className="font-bold">Total Hotel Bookings : {hotelBooking}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
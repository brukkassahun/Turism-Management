import { useState , useEffect } from "react"
import axios from 'axios';

export default function Profile() {

    const [books,setBooks] = useState([]);
    const [hotelBooks,setHotelBooks] = useState([]);
    const data = localStorage.getItem("user");
    const user = JSON.parse(data);
    const id=user[0].id;

    useEffect(() => {
        axios.get(`http://localhost:8888/booking/userBookings/${id}`,{}).then(res=>{
            // console.log(res)
            setBooks(res.data)
        }).catch(er=>{
            console.log(er)
        })
      }, [])
    useEffect(() => {
        axios.get(`http://localhost:8888/hotelBooking/userBookings/${id}`,{}).then(res=>{
            // console.log(res)
            setHotelBooks(res.data)
        }).catch(er=>{
            console.log(er)
        })
      }, [])

  return (
    <div className="grid content-start w-full p-5 min-h-screen bg-gray-100">
        <div className="grid content-start shadow-md rounded-md m-5 p-5 bg-white">
            <p className="font-bold text-black">First Name : {user[0].firstName}</p>
            <p className="font-bold text-black">Last Name : {user[0].lastName}</p>
            <p className="font-bold text-black">Email : {user[0].email}</p>
        </div>
        <div className="grid w-full bg-white shadow-md rounded-md">
            <div className='w-full p-5'>
                <h1 className="font-bold text-black text-[40px]">Booking History</h1>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 font-bold">
              <thead class="text-black uppercase bg-gray-50">
                <tr class="font-extrabold">
                  <th scope="col" class="px-4 py-4  bg-pink-300">
                     ID
                  </th>
                  <th scope="col" class="px-4 py-4  bg-pink-200">
                      First Name
                  </th>
                  <th scope="col" class="px-4 py-4  bg-pink-300">
                      Last Name
                  </th>
                  <th scope="col" class="px-4 py-4  bg-pink-200">
                    Number Of People
                  </th>
                  <th scope="col" class="px-4 py-4  bg-pink-300">
                      Registration Date
                  </th>
                  <th scope="col" class="px-4 py-4  bg-pink-200">
                      From
                  </th>
                  <th scope="col" class="px-4 py-4  bg-pink-300">
                      To
                  </th>
                  <th scope="col" class="px-4 py-4  bg-pink-200">
                      Status
                  </th>
                  <th scope="col" class="px-4 py-4  bg-pink-300">
                      Total Price
                  </th>
                </tr>
              </thead>
              <tbody>
              { 
                    books.map((item) =>(
                      <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 uppercase" key={item.id}>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.id}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.firstName}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.lastName}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.numberOfPeople}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.created_at}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.from}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.to}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.status}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.total}</td>
                      </tr>
                      )) 
                  }
              </tbody>
            </table>
            </div>
        </div>
        <div className="grid w-full bg-white shadow-md rounded-md mt-10">
            <div className='w-full p-5'>
                <h1 className="font-bold text-black text-[40px]">Hotel Booking History</h1>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 font-bold">
              <thead class="text-black uppercase bg-gray-50">
                <tr class="font-extrabold">
                  <th scope="col" class="px-4 py-4  bg-pink-300">
                     ID
                  </th>
                  <th scope="col" class="px-4 py-4  bg-pink-200">
                      First Name
                  </th>
                  <th scope="col" class="px-4 py-4  bg-pink-300">
                      Last Name
                  </th>
                  <th scope="col" class="px-4 py-4  bg-pink-200">
                    Number Of People
                  </th>
                  <th scope="col" class="px-4 py-4  bg-pink-300">
                      Registration Date
                  </th>
                  <th scope="col" class="px-4 py-4  bg-pink-200">
                      CheckIn
                  </th>
                  <th scope="col" class="px-4 py-4  bg-pink-300">
                      CheckOut
                  </th>
                  <th scope="col" class="px-4 py-4  bg-pink-200">
                      Status
                  </th>
                  <th scope="col" class="px-4 py-4  bg-pink-300">
                      Total Price
                  </th>
                </tr>
              </thead>
              <tbody>
              { 
                    hotelBooks.map((item) =>(
                      <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 uppercase" key={item.id}>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.id}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.firstName}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.lastName}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.numberOfPeople}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.created_at}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.checkIn}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.checkOut}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.status}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.total}</td>
                      </tr>
                      )) 
                  }
              </tbody>
            </table>
            </div>
        </div>
    </div>
  )
}

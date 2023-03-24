import { useState , useEffect } from "react"
import axios from 'axios';
import ManageViewBookings from "../components/ManageViewBookings"

const Bookings = () => {
  const [books,setBooks] = useState([]);
  const [pId,setPid] = useState()
  const [showVal,setShowVal] = useState('list')

  const [changed,setChanged] = useState(false);
  const [changedC,setChangedC] = useState(false);

  const conform=async (id)=>{
      await axios.get(`http://localhost:8888/booking/update/status/${id}`,{}).then(()=>{
          setChanged(!changed)
          setChangedC(!changedC)
      })
  }
  const cancel=async (id)=>{
      await axios.get(`http://localhost:8888/booking/update/statusCancel/${id}`,{}).then(()=>{
        setChanged(!changed)
        setChangedC(!changedC)
      })
  }
  const deleteB=async (id)=>{
      await axios.delete(`http://localhost:8888/booking/delete/${id}`,{}).then(()=>{
        setChanged(!changed)
        setChangedC(!changedC)
      })
  }

  useEffect(() => {
    axios.get("http://localhost:8888/booking/all",{}).then(res=>{
        // console.log(res)
        setBooks(res.data)
    }).catch(er=>{
        console.log(er)
    })
  }, [showVal,changed,changedC])

  function handleClose() {
    setShowVal('list');
  }

    return (
      <div className="grid w-full min-h-screen content-start text-black bg-white">
        <div className="grid w-full bg-gray-400 h-[150px] p-5">
          <h1 className="text-white font-bold text-[40px]">Bookings</h1>
        </div>
        {
          showVal === 'list' ? 
          <div className="flex w-full content-start justify-start">
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
                  <th scope="col" className="px-4 py-4  bg-pink-300">
                      Action
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
                        {/* <td scope="row" class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.phoneNumber}</td> */}
                        {/* <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.email}</td> */}
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.numberOfPeople}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.created_at}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.from}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.to}</td>
                        {/* <td scope="row" class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.comment}</td> */}
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.status}</td>
                        <td scope="row" class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <button 
                            onClick={
                                ()=>{
                                    setPid(item.id);
                                    setShowVal('detail');
                                }
                            } 
                            className='bg-blue-600 font-bold text-white p-2 rounded-md shadow-md m-2'>View</button>
                          {
                            item.status !== 'CONFORMED' ?
                            <button 
                            onClick={
                                ()=>{
                                  conform(item.id)
                                }
                            } 
                            className='bg-yellow-600 font-bold text-white p-2 rounded-md shadow-md m-2'>Conform</button>
                            :
                            <button 
                              disabled
                            className='bg-yellow-200 font-bold text-white p-2 rounded-md shadow-md m-2'>Conform</button>
                          }
                          {
                            item.status !== 'CANCELLED' ?
                            <button 
                            onClick={
                                ()=>{
                                  cancel(item.id)
                                }
                            } 
                            className='bg-pink-600 font-bold text-white p-2 rounded-md shadow-md m-2'>Cancel</button>
                            :
                            <button 
                              disabled
                            className='bg-pink-300 font-bold text-white p-2 rounded-md shadow-md m-2'>Cancel</button>
                          }
                          <button 
                          onClick={
                              ()=>{
                                deleteB(item.id)
                              }
                          } 
                          className='bg-red-600 font-bold text-white p-2 rounded-md shadow-md m-2'>Delete</button>
                        </td>
                      </tr>
                      )) 
                  }
              </tbody>
            </table>
          </div>
          :
          null
        }
        {
          showVal === 'detail' ?
              <ManageViewBookings pId={pId} handleClose={handleClose} />
          :
          null
        }
      </div>
    );
  };
  
  export default Bookings;
import { useState , useEffect } from "react"
import axios from 'axios';
import ManageViewEnquiry from "../components/ManageViewEnquiry"

const Enquries = () => {
  const [enq,setEnq] = useState([]);
  const [pId,setPid] = useState([])
  const [showVal,setShowVal] = useState('list')

  useEffect(() => {
      axios.get("http://localhost:8888/enquiry/all",{}).then(res=>{
          // console.log(res)
          setEnq(res.data)
      }).catch(er=>{
          console.log(er)
      })
  }, [showVal])
 
  function handleClose() {
    setShowVal('list');
  }

  return (
    <div className="grid w-full min-h-screen content-start text-black bg-white">
        <div className="grid w-full bg-gray-400 h-[150px] p-5">
          <h1 className="text-white font-bold text-[40px]">Enquries</h1>
        </div>
        {
      showVal === 'list' ?
        <div className="flex w-full content-start justify-start">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 font-bold">
            <thead class="text-black uppercase bg-gray-50">
              <tr class="font-extrabold">
                <th scope="col" class="px-1 py-1  bg-pink-300">
                    Id
                </th>
                <th scope="col" class="px-1 py-1  bg-pink-200">
                    First Name
                </th>
                <th scope="col" class="px-1 py-1  bg-pink-300">
                    Last Name
                </th>
                <th scope="col" class="px-1 py-1  bg-pink-200">
                    Phone Number
                </th>
                <th scope="col" class="px-1 py-1  bg-pink-300">
                    Email
                </th>
                <th scope="col" class="px-1 py-1  bg-pink-200">
                    Creation Date
                </th>
                <th scope="col" class="px-1 py-1  bg-pink-300">
                    message
                </th>
                <th scope="col" class="px-1 py-1  bg-pink-200">
                    Status
                </th>
                <th scope="col" class="px-1 py-1  bg-pink-300">
                    Action
                </th>
              </tr>
            </thead>
            <tbody>
                { 
                  enq.map((item) =>(
                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 uppercase" key={item.id}>
                      <td scope="row" class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.id}</td>
                      <td scope="row" class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.firstName}</td>
                      <td scope="row" class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.lastName}</td>
                      <td scope="row" class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.email}</td>
                      <td scope="row" class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.phoneNumber}</td>
                      <td scope="row" class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.created_at}</td>
                      <td scope="row" class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.message}</td>
                      <td scope="row" class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.status}</td>
                      <td scope="row" class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <button 
                          onClick={
                              ()=>{
                                  setPid(item.id);
                                  setShowVal('detail');
                              }
                          } 
                          className='bg-blue-600 font-bold text-white p-2 rounded-md shadow-md m-2'>Read</button>
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
            <ManageViewEnquiry pId={pId} handleClose={handleClose} />
        :
        null
    }
    </div>
  );
};

export default Enquries;
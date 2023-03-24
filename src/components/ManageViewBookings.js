import { useState , useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ManageViewBookings(props) {
    const pId = props.pId;
    const [packageData,setPackageData] = useState()

    useEffect(() => {
        axios.get(`http://localhost:8888/booking/get/${pId}`,{}).then(res=>{
            console.log("this is astes:",res.data)
            setPackageData(res.data[0])
        }).catch(er=>{
            console.log(er)
        })
    }, [])
    
  return (
    <div className='w-full p-5'>
        <div className='flex justify-center w-full'>
            <button onClick={props.handleClose} className="p-5 bg-red-600 rounded-md shadow-md font-bold text-white" >
                Close
            </button>
        </div>
        <form>
            <div className="mb-6">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Booking no.</label>
                <input value={packageData?.id}  name="name"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Registration Date</label>
                <input value={packageData?.created_at}  name="name"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                <input value={packageData?.firstName}  name="name"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                <input value={packageData?.lastName}  name="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                <input value={packageData?.phoneNumber} name="type"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="features" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input value={packageData?.email}  name="features"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="features" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number Of People</label>
                <input value={packageData?.numberOfPeople}  name="features"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="features" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From</label>
                <input value={packageData?.from}  name="features"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="features" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To</label>
                <input value={packageData?.to}  name="features"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="features" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comment</label>
                <textarea value={packageData?.comment}  name="features"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="features" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                <input value={packageData?.status}  name="features"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="features" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total</label>
                <p className='font-bold text-black'>{packageData?.numberOfPeople*packageData?.price}</p>
            </div>          
         
        </form>
    </div>
  )
}

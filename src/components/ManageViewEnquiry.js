import { useState , useEffect } from 'react';
import axios from 'axios';

export default function ManageViewEnquiry(props) {
    const pId = props.pId;
    const [packageData,setPackageData] = useState()

    useEffect(() => {
        axios.get(`http://localhost:8888/enquiry/get/${pId}`,{}).then(res=>{
            setPackageData(res.data[0])
        }).catch(er=>{
            console.log(er)
        })
        axios.post(`http://localhost:8888/enquiry/update/${pId}`);
    }, [])

  return (
    <div className='w-full bg-white p-5'>
        <div className='flex justify-center w-full'>
            <button onClick={props.handleClose} className="p-5 bg-red-600 rounded-md shadow-md font-bold text-white" >
                Close
            </button>
        </div>
        <form>
            <div className="mb-6">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Name</label>
                <input value={packageData?.firstName}  type="text" name="name"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package price</label>
                <input value={packageData?.lastName} type="text" name="name"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package country</label>
                <input value={packageData?.email}  type="text" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Type</label>
                <input value={packageData?.phoneNumber} type="text" name="type"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="features" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Fearures</label>
                <input value={packageData?.created_at}  type="text" name="features"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="detail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Detail</label>
                <textarea value={packageData?.message} type="text" name="detail" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
        </form>
    </div>
  )
}

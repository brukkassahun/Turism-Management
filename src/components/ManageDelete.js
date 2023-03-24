import { useState , useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ManageDelete(props) {
    const pId = props.pId;
    const manageType=props.manageType;
    const [packageData,setPackageData] = useState()
    
    useEffect(() => {
        axios.get(`http://localhost:8888/packages/${manageType}/${pId}`,{}).then(res=>{
            setPackageData(res.data[0])
        }).catch(er=>{
            console.log(er)
        })
    }, [])

    const deletePackage = () =>{
        const payload={
            image:packageData?.image
        }
        axios.delete(`http://localhost:8888/packages/delete/${manageType}/${pId}`,{ data: payload }).then(
            ()=>{
                toast.success('Successfully Deleted!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                const close =()=>{
                    props.handleClose()
                }
                setTimeout(() => {
                    close()
                }, 1200);
            }
        ).catch(
            ()=>{
                toast.error('Delete Failed!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        )
    }

  return (
    <div className='w-full'>
        {/* show the upload progress */}
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
            <ToastContainer />
        </div>
        <div className='flex justify-center w-full'>
            <button onClick={props.handleClose} className="p-5 bg-red-600 rounded-md shadow-md font-bold text-white" >
                Close
            </button>
        </div>
        <form>
            <div className="mb-6">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Name</label>
                <input value={packageData?.name}  type="text" name="name"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package price</label>
                <input value={packageData?.price} type="number" name="name"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package country</label>
                <input value={packageData?.country}  type="text" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Type</label>
                <input value={packageData?.type} type="text" name="type"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="features" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Fearures</label>
                <input value={packageData?.features}  type="text" name="features"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="detail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Detail</label>
                <textarea value={packageData?.detail} type="text" name="detail" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Image</label>
                {/* <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" placeholder="Package Image" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/> */}
            </div>  
            <div className="w-[300px] h-[200px]">
                <img alt="image" src={'../uploads/' + packageData?.image} className="w-full h-full"/>
            </div>
        </form>
        <div className='flex w-full justify-center m-5'>
            <button onClick={deletePackage} className="p-2 bg-red-600 rounded-md shadow-md font-bold text-white" >
               Delete
            </button>
        </div>
    </div>
  )
}

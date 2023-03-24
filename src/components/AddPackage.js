import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddPackage(props) {
    const postType = props.postType
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [country, setCountry] = useState("");
    const [type, setType] = useState("");
    const [features, setFeatures] = useState("");
    const [detail, setDetail] = useState("");
    const [image, setImage] = useState(null);
    const [progres, setProgress] = useState(false);

    
    const uploadPackage= async (e)=>{
        e.preventDefault();
    
        const formData = new FormData()
    
        formData.append('name',name.toLowerCase())
        formData.append('price',price)
        formData.append('country',country.toLowerCase())
        formData.append('type',type)
        formData.append('features',features)
        formData.append('detail',detail)
        formData.append('avatar',image)
    
        try {
          const res = await axios.post(`http://localhost:8888/packages/${postType}`,formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          });
          setProgress(true)
          toast.success('Successfully Uploaded!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        } catch (err) {
          if (err.response.status === 500) {
            toast.error('Upload Failed!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          } else {
            // console.log(err.response.data.msg);
            toast.error('Upload Failed!', {
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
        }
      }

    return (
        <form onSubmit={(e)=>uploadPackage(e)}>
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
            <div className="mb-6">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Package Name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package price</label>
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" name="name" placeholder="Package price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package country</label>
                <input value={country} onChange={(e) => setCountry(e.target.value)} type="text" name="name" placeholder="Package country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Type</label>
                <input value={type} onChange={(e) => setType(e.target.value)} type="text" name="type" placeholder="Package Type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="features" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Fearures</label>
                <input value={features} onChange={(e) => setFeatures(e.target.value)} type="text" name="features" placeholder="Package Fearures" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="detail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Detail</label>
                <textarea value={detail} onChange={(e) => setDetail(e.target.value)} type="text" name="detail" placeholder="Package Detail" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Image</label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" placeholder="Package Image" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>  
            <div className='grid content-start bg-white'>
            {
                image != null ?
                <img
                alt="not found"
                width={"250px"}
                height={"200px"}
                src={URL.createObjectURL(image)}
            />
            :
            null
            }
            </div>        
            <div className="m-5">
            {
                !progres ?
                <button className="bg-pink-700 rounded-md shadow-md p-2 font-bold text-white">Upload</button>
                :
                <button className="bg-pink-400 rounded-md shadow-md p-2 font-bold text-white" disabled>Upload</button>
            }
            </div>
        </form>
    )
}

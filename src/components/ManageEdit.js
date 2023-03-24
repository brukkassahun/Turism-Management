import { useState , useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ManageEdit(props) {
    const pId = props.pId;
    const manageType=props.manageType;
    const [packageData,setPackageData] = useState()
    const [isNew,setIsNew] = useState(false)
    const [newImage,setNewimage] = useState()

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [country, setCountry] = useState("");
    const [type, setType] = useState("");
    const [features, setFeatures] = useState("");
    const [detail, setDetail] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8888/packages/${manageType}/${pId}`,{}).then(res=>{
            // setPackageData(res.data[0])
            setName(res.data[0].name);
            setPrice(res.data[0].price);
            setCountry(res.data[0].country);
            setType(res.data[0].type);
            setFeatures(res.data[0].features);
            setDetail(res.data[0].detail);
            setImage(res.data[0].image);
        }).catch(er=>{
            console.log(er)
        })
    }, [])

    const updatePackage = () =>{
        //if there is a new image to be updated use this api
        if(isNew){
            const formData = new FormData()
    
            formData.append('id',pId)
            formData.append('name',name)
            formData.append('price',price)
            formData.append('country',country)
            formData.append('type',type)
            formData.append('features',features)
            formData.append('detail',detail)
            formData.append('avatar',newImage)
            formData.append('oldimage',image)
            axios.post(`http://localhost:8888/packages/updateWithImage/${manageType}`,formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
              }).then(
                ()=>{
                    toast.success('Successfully Updated!', {
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
                    toast.error('Update Failed!', {
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
        }else{
            const data={
                name:name,
                price:price,
                country:country,
                type:type,
                features:features,
                detail:detail,
                image:image,
            }
            axios.put(`http://localhost:8888/packages/update/${manageType}/${pId}`,{data}).then(
                ()=>{
                    toast.success('Successfully Updated!', {
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
                    toast.error('Update Failed!', {
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
                <input value={name} onChange={(e) => setName(e.target.value)}  type="text" name="name"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package price</label>
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" name="name"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package country</label>
                <input value={country} onChange={(e) => setCountry(e.target.value)}  type="text" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Type</label>
                <input value={type} onChange={(e) => setType(e.target.value)} type="text" name="type"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="features" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Fearures</label>
                <input value={features} onChange={(e) => setFeatures(e.target.value)}  type="text" name="features"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="detail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Detail</label>
                <textarea value={detail} onChange={(e) => setDetail(e.target.value)} type="text" name="detail" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>          
            <div className="mb-6">
                <label for="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Image</label>
                <input onChange={(e) => {
                    setNewimage(e.target.files[0]);
                    setIsNew(true);
                }} type="file" name="image" placeholder="Package Image" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>  
            <div className="w-[300px] h-[200px]">
                {
                    !isNew ?
                    <img alt="image" src={'../uploads/' + image} className="w-full h-full"/>
                    :
                    <img alt="image" src={URL.createObjectURL(newImage)} className="w-full h-full"/>

                }
            </div>
        </form>
        <div className='flex w-full justify-center m-5'>
            <button onClick={updatePackage} className="p-2 bg-blue-600 rounded-md shadow-md font-bold text-white" >
               Update
            </button>
        </div>
    </div>
  )
}

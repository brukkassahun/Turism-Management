import { useState , useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManageView from './ManageView'
import ManageEdit from './ManageEdit'
import ManageDelete from './ManageDelete'

export default function ManagePackages(props) {
    const manageType=props.manageType;
    const [packages,setPackages] = useState([])
    const [pId,setPid] = useState([])
    const [showVal,setShowVal] = useState('list')

    function handleClose() {
        setShowVal('list');
    }

    useEffect(() => {
        axios.get(`http://localhost:8888/packages/${manageType}`,{}).then(res=>{
          setPackages(res.data)
        }).catch(er=>{
            console.log(er)
        })
    }, [showVal])

    return (
        <div className="flex w-full content-start justify-start">
            {
                showVal === 'list' ?
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 font-bold">
                <thead class="text-black uppercase bg-gray-50">
                    <tr class="font-extrabold">
                    <th scope="col" class="px-2 py-2  bg-pink-300">
                        ID
                    </th>
                    <th scope="col" class="px-2 py-2  bg-pink-200">
                        Name
                    </th>
                    <th scope="col" class="px-2 py-2  bg-pink-300">
                        country
                    </th>
                    <th scope="col" class="px-2 py-2  bg-pink-200">
                        price
                    </th>
                    <th scope="col" class="px-2 py-2  bg-pink-300">
                        Type
                    </th>
                    <th scope="col" class="px-2 py-2  bg-pink-200">
                        features
                    </th>
                    <th scope="col" class="px-2 py-2  bg-pink-300">
                        Action
                    </th>
                    </tr>
                </thead>
                <tbody>
                {packages.map((item) => 
                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 uppercase">
                        <td scope="row" class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.id}</td>
                        <td scope="row" class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</td>
                        <td scope="row" class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.country}</td>
                        <td scope="row" class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.price}</td>
                        <td scope="row" class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.type}</td>
                        <td scope="row" class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.features}</td>
                        <td scope="row" class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <button 
                            onClick={
                                ()=>{
                                    setPid(item.id);
                                    setShowVal('detail');
                                }
                            } 
                            className='bg-blue-600 font-bold text-white p-2 rounded-md shadow-md m-2'>View</button>
                        <button 
                            onClick={
                                ()=>{
                                    setPid(item.id);
                                    setShowVal('edit');
                                }
                            } 
                            className='bg-pink-500 font-bold text-white p-2 rounded-md shadow-md m-2'>Edit</button>
                        <button 
                            onClick={
                                ()=>{
                                    setPid(item.id);
                                    setShowVal('delete');
                                }
                            } 
                            className='bg-red-600 font-bold text-white p-2 rounded-md shadow-md m-2'>Delete</button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            :
            null
            }
            {
                showVal === 'detail' ?
                    <ManageView pId={pId} manageType={manageType} handleClose={handleClose} />
                :
                null
            }
            {
                showVal === 'edit' ?
                    <ManageEdit pId={pId} manageType={manageType} handleClose={handleClose} />
                :
                null
            }
            {
                showVal === 'delete' ?
                    <ManageDelete pId={pId} manageType={manageType} handleClose={handleClose} />
                :
                null
            }
        </div>
    )
}

import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import clsx from 'clsx';
import AddPackage from '../components/AddPackage';
import ManagePackages from '../components/ManagePackages';

const Packages = () => {
  const [selected,setSelected] = useState('packages');
  
  // const del =  axios.delete("http://localhost:8888/packages/delete")

  return (
    <div className="grid  content-start w-full min-h-screen  bg-white text-black relative">
      {/* <div className="absolute z-50 top-5 left-0 bg-white w-[90%] min-h-[90vh] rounded-md shadow-md">
        dsfsdf
      </div> */}
      <div className="flex justify-start content-start w-full bg-gray-400 h-[150px] p-5">
        <button 
          onClick={()=>setSelected('packages')} 
          className={
            clsx("rounded-md shadow-md p-5 font-bold m-5",
              {
                'bg-pink-700 text-white':selected === 'packages',
                'bg-black text-white':selected !== 'packages'
              }
            )
          }
          >
          Add packages
        </button>
        <button 
          onClick={()=>setSelected('Fpackages')} 
          className={
            clsx("rounded-md shadow-md p-5 font-bold m-5",
              {
                'bg-pink-700 text-white':selected === 'Fpackages',
                'bg-black text-white':selected !== 'Fpackages'
              }
            )
          }
          >
          Add Famouse packages
        </button>
        <button 
          onClick={()=>{
            setSelected('manage');
          }} 
          className={
            clsx("rounded-md shadow-md p-5 font-bold m-5",
              {
                'bg-pink-700 text-white':selected === 'manage',
                'bg-black text-white':selected !== 'manage'
              }
            )
          }
          >
          Manage All Packages
        </button>
        <button 
          onClick={()=>{
            setSelected('manageF');
          }} 
          className={
            clsx("rounded-md shadow-md p-5 font-bold m-5",
              {
                'bg-pink-700 text-white':selected === 'manageF',
                'bg-black text-white':selected !== 'manageF'
              }
            )
          }
          >
          Manage All Famouse Packages
        </button>
      </div>
      <div className="grid w-full p-5 ">
        {
          selected === 'packages' ?
          <AddPackage postType="addNewPackage" key="addNewPackage"/>
          :
          null
        }
        {
          selected === 'Fpackages' ?
          <AddPackage postType="addNewFpackage" key="addNewFpackage"/>
          :
          null
        }
        {
          selected === 'manage' ?
          <ManagePackages manageType="allPackages" key="allPackages" />
          :
          null
        }
        {
          selected === 'manageF' ?
          <ManagePackages manageType="allFpackages" key="allFpackages" />
          :
          null
        }
      </div>
    </div>
  );
};
  
export default Packages;

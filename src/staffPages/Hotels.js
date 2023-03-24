import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import clsx from 'clsx';
import AddHotel from '../components/AddHotel';

const Hotels = () => {
  const [selected,setSelected] = useState('packages');
  
  // const del =  axios.delete("http://localhost:8888/packages/delete")

  return (
    <div className="grid  content-start w-full min-h-screen  bg-white text-black relative">
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
          Add Hotel
        </button>
      </div>
      <div className="grid w-full p-5 ">
          <AddHotel/>
      </div>
    </div>
  );
};
  
export default Hotels;

import { Outlet, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import AdminLogIn from "./AdminLogIn";

const AdminLayout = () => {
  let location = useLocation();
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

  
  return (
    <div className="flex w-full min-h-screen">
    {
       typeof user?.length !== 'undefined' ?
        <>
        {
          user[0]?.userRoll === 'admin' ?
          <div className="flex w-full min-h-screen">
            <div className="grid content-start w-[20%] min-h-screen bg-gray-400 p-5">
            <p className="text-white font-bold text-[35px]">Turism Management</p>
            <ul className="grid w-full content-start justify-start mt-10">
              <li
                className={
                  clsx("mb-10  rounded-md shadow-md w-full p-2",
                    {
                      'bg-pink-700 text-white':location.pathname === '/admin/dashboard',
                      'bg-white text-black':location.pathname !== '/admin/dashboard',
                    }
                  )
                }
              >
                <Link to="dashboard" class="font-bold  p-2">Dashboard</Link>
              </li>
              <li 
                className={
                  clsx("mb-10  rounded-md shadow-md w-full p-2",
                    {
                      'bg-pink-700 text-white':location.pathname === '/admin/packages',
                      'bg-white text-black':location.pathname !== '/admin/packages'
                    }
                  )
                }
              >
                <Link to="packages" class="font-bold  p-2">Tour Packages</Link>
              </li>
              <li 
                className={
                  clsx("mb-10  rounded-md shadow-md w-full p-2",
                    {
                      'bg-pink-700 text-white':location.pathname === '/admin/bookings',
                      'bg-white text-black':location.pathname !== '/admin/bookings'
                    }
                  )
                }
              >
                <Link to="bookings" class="font-bold  p-2">Bookings</Link>
              </li>
              <li 
                className={
                  clsx("mb-10  rounded-md shadow-md w-full p-2",
                    {
                      'bg-pink-700 text-white':location.pathname === '/admin/hotel',
                      'bg-white text-black':location.pathname !== '/admin/hotel'
                    }
                  )
                }
              >
                <Link to="hotel" class="font-bold  p-2">Hotel</Link>
              </li>
              <li 
                className={
                  clsx("mb-10 rounded-md shadow-md w-full p-2",
                    {
                      'bg-pink-700 text-white':location.pathname === '/admin/enquries',
                      'bg-white text-black':location.pathname !== '/admin/enquries'
                    }
                  )
                }          
              >
                <Link to="enquries" class="font-bold  p-2">Enquries</Link>
              </li>
            </ul>
          </div>
          <div className="grid w-[80%] bg-red-600 min-h-screen">
            <Outlet />
          </div>
          </div>
          :
          <AdminLogIn/>
        }
        </>
      :
      <AdminLogIn/>
    }
    </div>
    
  )
};

export default AdminLayout;
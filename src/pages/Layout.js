import { Outlet, Link ,useNavigate ,useLocation  } from "react-router-dom";
import clsx from 'clsx';

const Layout = () => {
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);
  const navigate = useNavigate();
  const location = useLocation ();


  const logOut=()=>{
    navigate('/')
    localStorage.setItem("user", JSON.stringify([]));
  }

  return (
    <>
      <nav class="grid grid-cols-4 w-full pl-20 pr-20 pt-2 pb-2">
        <ul class="bg-white flex justify-start col-span-3">
          <li class="m-5">
            <Link 
              to="/" 
              className={
                clsx("font-bold  text-white p-2 rounded shadow-md hover:bg-black hover:text-white",
                  {
                    'bg-black':location.pathname === '/',
                    'bg-pink-400':location.pathname !== '/',
                  }
                )
              }
              >Home</Link>
          </li>
          <li class="m-5">
            <Link 
              to="/places" 
              className={
                clsx("font-bold  text-white p-2 rounded shadow-md hover:bg-black hover:text-white",
                  {
                    'bg-black':location.pathname === '/places',
                    'bg-pink-400':location.pathname !== '/places',
                  }
                )
              }
              >Places</Link>
          </li>
          <li class="m-5">
            <Link 
              to="/hotel" 
              className={
                clsx("font-bold  text-white p-2 rounded shadow-md hover:bg-black hover:text-white",
                  {
                    'bg-black':location.pathname === '/hotel',
                    'bg-pink-400':location.pathname !== '/hotel',
                  }
                )
              }
              >Hotel</Link>
          </li>
          <li class="m-5">
            <Link 
              to="/blog" 
              className={
                clsx("font-bold  text-white p-2 rounded shadow-md hover:bg-black hover:text-white",
                  {
                    'bg-black':location.pathname === '/blog',
                    'bg-pink-400':location.pathname !== '/blog',
                  }
                )
              }
              >Blog</Link>
          </li>
          <li class="m-5">
            <Link 
              to="/enquiry" 
              className={
                clsx("font-bold  text-white p-2 rounded shadow-md hover:bg-black hover:text-white",
                  {
                    'bg-black':location.pathname === '/enquiry',
                    'bg-pink-400':location.pathname !== '/enquiry',
                  }
                )
              }
              >Enquiry</Link>
          </li>
          <li class="m-5">
            <Link 
              to="/about" 
              className={
                clsx("font-bold  text-white p-2 rounded shadow-md hover:bg-black hover:text-white",
                  {
                    'bg-black':location.pathname === '/about',
                    'bg-pink-400':location.pathname !== '/about',
                  }
                )
              }
              >About</Link>
          </li>
        </ul>
        {
         typeof user?.length === 'undefined' || user?.length === 0 ?
          <ul class="bg-white flex justify-end">
            <li class="m-5">
              <Link to="/login" class="font-bold bg-transparent outline outline-pink-600 p-2 rounded shadow-md text-pink-600 hover:bg-black">Log in</Link>
            </li>
            <li class="ml-5 mr-10 mt-5 mb-5">
              <Link to="/registration" class="font-bold bg-transparent outline outline-pink-600 p-2 rounded shadow-md text-pink-600 hover:bg-black">Sign Up</Link>
            </li>
          </ul>
          :
          <ul class="bg-white flex justify-end">
            <li class="m-5">
              <button onClick={()=>logOut()} class="font-bold bg-transparent outline outline-pink-600 p-2 rounded shadow-md text-pink-600 hover:bg-black">Log Out</button>
            </li>
            <li class="m-5">
              <button onClick={()=>navigate('/profile')} class="font-bold bg-transparent outline outline-pink-600 p-2 rounded shadow-md text-pink-600 hover:bg-black">Profile</button>
            </li>
          </ul>

        }
      </nav>

      <Outlet />
      
      <div className="grid w-full h-[150px] bg-pink-400 p-10 mt-10">
        <h1 className="font-bold p-5 bg-black text-white">Travel With Us Now!</h1>
      </div>
      <div className="grid w-full h-[50px] bg-black text-white p-10">
        @2023
      </div>
    </>
  )
};

export default Layout;
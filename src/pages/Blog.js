import React ,{ useState , useEffect } from 'react'
import blogImg from "../imgs/blog.jpg"
import ListBlog from "../components/ListBlog"
import { Link , useLocation } from "react-router-dom";
import axios from 'axios';

export default function Blog() {
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);
  const [progres, setProgress] = useState(false);
  const [blog,setBlog] = useState([]);

  useEffect(() => {
      axios.get("http://localhost:8888/blog/get/all",{}).then(res=>{
          // console.log(res.data)
          setBlog(res.data)
      }).catch(er=>{
          console.log(er)
      })
  }, [])

  return (
    <div className="w-full min-h-screen relative">
      <div className="w-full h-[400px]">
        <img src={blogImg} className="w-full h-full bg-cover"/>
      </div>
      <div className="w-full h-[400px] bg-black opacity-50 absolute z-20 top-0 left-0 grid content-center">
      </div>
      <div className="w-full h-[400px] bg-transparent absolute z-30 top-0 left-0 grid content-center">
        <h1 className="font-extrabold text-[40px] text-white text-center">Share Your Traveling Experiences!</h1>
        <div className="flex w-full p-5 justify-center">
        {
            typeof user?.length === 'undefined' || user?.length === 0 ?
            <Link  to="/login" class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Create Your First Blog Now!</Link>
            :
            <>
             <Link  to="/createBlog" class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Create Your First Blog Now!</Link>
            </>
        }
        </div>
      </div>

      <div className="p-10 flex flex-wrap justify-start">
        {
          blog.map(item=><ListBlog id={item.id} title={item.title} blog={item.name} date={item.date}  image={item.image} user={item.user}/>)
        }
      </div>
    </div>
  )
}

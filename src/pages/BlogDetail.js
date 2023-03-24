import { useState , useEffect } from "react"
import axios from 'axios';
import { Link , useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userIcon from "../icons/user.png";
import DOMPurify from 'dompurify';

export default function BlogDetail() {
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);
  const [blog,setBlog] = useState([]);
  const [comments,setComments] = useState([]);
  const [comment,setComment] = useState();
  const location = useLocation(); 
  const id = location.state.state.id
  const [newComment,setNewComment] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:8888/blog/detail/${id}`,{}).then(res=>{
        // console.log(res.data[0])
        setBlog(res.data[0])
    }).catch(er=>{
        console.log(er)
    })
  }, [])

  useEffect(() => {
    getComments()
    setComment('')
  }, [newComment])

  const getComments=()=>{
    axios.get(`http://localhost:8888/blog/comments/${id}`,{data}).then(res=>{
        setComments(res.data)
    })
  }

  const createComment=async (e) =>{
    e.preventDefault();

    const userName=user[0].firstName + ' ' + user[0].lastName;
    const userId=user[0].id;

    const data={
        comment:comment,
        blogId:id,
        userId:userId,
        userName:userName,
    }
    const res = await axios.post('http://localhost:8888/blogComment/add',{data})
    setNewComment(comment)
  }

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }

  return (
    <div className="w-full min-h-screen p-5" onLoad={()=>getComments()}>
        <div className="w-full bg-transparent grid content-center">
            <h1 className="font-extrabold text-[40px] text-black">{blog.title}</h1>
        </div>
        <div className="w-full h-full grid content-end p-2">
            <p>{blog.user}  | {blog.date}</p>
        </div>
        <div className="w-full h-[300px]">
            <img src={'/uploads/' + blog.image} className="w-full h-full bg-cover"/>
        </div>
        <div
          className="mt-5 p-2"
          dangerouslySetInnerHTML={createMarkup(blog.blog)}>
        </div>
        <div className="grid w-full mt-10 p-5">
            <h1 className="text-black text-[40px] font-bold">Comments</h1>
            <form onSubmit={(e)=>createComment(e)}>
              <div className="mb-2">
                  <label for="detail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comment</label>
                  <textarea  value={comment} onChange={(e) => setComment(e.target.value)} type="text" name="detail" placeholder="Your comment here" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>   
              <div className="mt-2">
                  <button className="bg-pink-700 rounded-md shadow-md p-2 font-bold text-white">Send</button>
              </div>
            </form>
            <div className="grid w-full mt-5">
                {comments?.map((item)=><div className="grid content-start shadow-md rounded-md w-full mb-5">
                    <div classNme="grid w-full">
                        <div className="w-full bg-gray-100 flex mb-5">
                            <div className="">
                                <img src={userIcon} className="w-[50px] h-[50px] rounded-[50px]"/>
                            </div>
                            <p className="pl-2 mt-5 text-black font-bold">{item.userName}</p>
                        </div>
                        <div className="p-5">
                            <p className="text-black">{item.comment}</p>
                        </div>
                        <div className="w-full bg-gray-100 p-3">
                            <p className="mt-5 text-black font-bold">Date: {item.created_at}</p>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    </div>
  )
}


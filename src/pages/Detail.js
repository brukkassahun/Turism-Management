import { useState , useEffect } from "react"
import axios from 'axios';
import { Link , useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userIcon from "../icons/user.png";

const Detail = () => {
    const data = localStorage.getItem("user");
    const user = JSON.parse(data);
    const [place,setPlace] = useState([]);
    const [comments,setComments] = useState([]);
    const location = useLocation(); 
    const id = location.state.state.id
    const contentType=location.state.state.contentType
    const [progres, setProgress] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [comment, setComment] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState(1);

    useEffect(() => {
        axios.get(`http://localhost:8888/packages/${contentType}/${id}`,{}).then(res=>{
            // console.log(res.data[0])
            setPlace(res.data[0])
        }).catch(er=>{
            console.log(er)
        })
    }, [])

    
    const getComments=()=>{
        const data={
            contentType:contentType
        }
        axios.get(`http://localhost:8888/bookings/comments/${contentType}/${place.id}`,{data}).then(res=>{
            setComments(res.data)
        })
    }
    

    const book=(e)=>{
        e.preventDefault();

        const data={
            firstName:firstName,
            lastName:lastName,
            numberOfPeople:numberOfPeople,
            email:email,
            phoneNumber:phoneNumber,
            from:from,
            to:to,
            userId:user[0].id,
            packageId:place.id,
            contentType:contentType,
            comment:comment,
            price:place.price,
            total:parseInt(place.price) * numberOfPeople
        }
        
        axios.post('http://localhost:8888/booking/add',{data}).then(
            ()=>{
                setProgress(true)
                toast.success('Successfully Booked!', {
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
        ).catch(
            ()=>{
                toast.error('Book Failed!', {
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
      <div className="grid w-full min-h-screen content-center justify-center bg-gray-100 text-white" onLoad={()=>getComments()}>
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
        <div className="grid grid-cols-5 w-full content-start justify-center min-h-screen p-5">
            <div className="grid col-span-3 content-start justify-center p-5">
                <img src={'/uploads/' + place.image} className="w-screen h-full"/>
            </div>
            <div className="grid col-span-2 p-2 min-h-screen">
                <div className="grid content-start justify-center p-5 outline-pink-400 outline bg-white  text-black">
                    <div className="grid w-full outline outline-gray-100 p-10 mb-5">
                        <p className="font-bold text-black">${place.price} / per person</p>
                    </div>
                    <div className="grid w-full outline outline-gray-100 p-5">
                        <p className="font-bold text-black">Your Inforamtion</p>
                        <div class="w-full mt-5">
                            <form className="grid content-start w-full h-full " onSubmit={(e)=>book(e)}>
                                <div class="flex mb-2">
                                    <div class="mr-2 grid content-start">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">
                                        First Name
                                        </label>
                                        <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="firstName" type="text" placeholder="firstName"/>
                                    </div>
                                    <div class="grid content-start">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="lastName">
                                        Last Name
                                        </label>
                                        <input required value={lastName} onChange={(e) => setLastName(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="lastName" type="text" placeholder="lastName"/>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" for="phoneNumber">
                                        Email
                                    </label>
                                    <input required value={email} onChange={(e) => setEmail(e.target.value)} type="tel" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" placeholder="Email"/>
                                </div>
                                <div className="grid grid-cols-2 mb-2">
                                    <div class="grid content-start mr-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" for="phoneNumber">
                                            Phone Number
                                        </label>
                                        <input required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="tel" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="phoneNumber" placeholder="Phone Number"/>
                                    </div>
                                    <div class="grid content-start">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                        Number of People
                                        </label>
                                        <input required value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} min="1" type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="numberOfPeople" placeholder="Number of people"/>
                                    </div>
                                </div>
                                <div class="flex mb-2">
                                    <div className="grid content-start mr-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" for="from">
                                           From
                                        </label>
                                        <input required value={from} onChange={(e) => setFrom(e.target.value)} type="date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="from" />
                                    </div>
                                    <div className="grid content-start mr-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" for="to">
                                           To
                                        </label>
                                        <input required value={to} onChange={(e) => setTo(e.target.value)} type="date" className="ml-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="to" />
                                    </div>
                                </div>
                                <div class="grid content-start w-full mb-2">
                                    <label for="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comment</label>
                                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} type="text" name="comment" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div className="min-w-[130px] p-5 outline outline-gray-100 mb-2 bg-pink-100">
                                    <p className="font-bold text-black">total : {place.price * numberOfPeople}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                {
                                    typeof user?.length === 'undefined' || user?.length === 0 ?
                                    <Link  to="/login" class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Book Now</Link>
                                    :
                                    <>
                                    {
                                        !progres ?
                                        <button class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Book Now
                                        </button>
                                    :
                                    <button disabled class="bg-pink-300  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Book Now
                                    </button>
                                    }
                                    </>
                                }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid w-full  p-5 bg-white">
            <div className="grid w-full  p-5 outline shadow-md rounded-md">
                <h1 className="text-black font-bold text-[40px]">{place.name}</h1>
                <div className="flex w-full p-5">
                    <p className="bg-black p-2 rounded-md shadow-md text-white font-bold">Country:{place.country}</p>
                    <p></p>
                </div>
                <div className="grid w-full p-2">
                    <p className="text-black text-justify">{place.detail}</p>
                </div>
            </div>
            <div className="grid w-full mt-10 p-5">
                <h1 className="text-black text-[40px] font-bold">Comments</h1>
                <div className="grid w-full mt-5">
                    {comments?.map((item)=><div className="grid content-start shadow-md rounded-md w-full mb-5">
                        <div classNme="grid w-full">
                            <div className="w-full bg-gray-100 flex mb-5">
                                <div className="">
                                    <img src={userIcon} className="w-[50px] h-[50px] rounded-[50px]"/>
                                </div>
                                <p className="pl-2 mt-5 text-black font-bold">{item.firstName} {item.lastName}</p>
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
      </div>
    );
  };
  
  export default Detail;


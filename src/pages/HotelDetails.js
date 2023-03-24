import { useState , useEffect } from "react"
import axios from 'axios';
import { Link , useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HotelDetails = () => {
    const data = localStorage.getItem("user");
    const user = JSON.parse(data);
    const [hotel,setHotel] = useState([]);
    const location = useLocation(); 
    const id = location.state.state.id
    const [progres, setProgress] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState(1);

    useEffect(() => {
        axios.get(`http://localhost:8888/hotel/get/${id}`,{}).then(res=>{
            setHotel(res.data[0])
        }).catch(er=>{
            console.log(er)
        })
    }, [])

    console.log("hotel:",hotel)
    const book=(e)=>{
        e.preventDefault();

        const data={
            firstName:firstName,
            lastName:lastName,
            numberOfPeople:numberOfPeople,
            email:email,
            phoneNumber:phoneNumber,
            checkIn:from,
            checkOut:to,
            userId:user[0].id,
            packageId:hotel.id,
            price:hotel.price,
            total:parseInt(hotel.price) * numberOfPeople
        }
        
        axios.post('http://localhost:8888/hotelBooking/add',{data}).then(
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
      <div className="grid w-full min-h-screen content-center justify-center bg-gray-100 text-white">
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
                <img src={'/uploads/' + hotel.image} className="w-screen h-full"/>
            </div>
            <div className="grid col-span-2 p-2 min-h-screen">
                <div className="grid content-start justify-center p-5 outline-pink-400 outline bg-white  text-black">
                    <div className="grid w-full outline outline-gray-100 p-10 mb-5">
                        <p className="font-bold text-black">${hotel.price} / per room</p>
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
                                           CheckIn
                                        </label>
                                        <input required value={from} onChange={(e) => setFrom(e.target.value)} type="date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="from" />
                                    </div>
                                    <div className="grid content-start mr-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" for="to">
                                           checkOut
                                        </label>
                                        <input required value={to} onChange={(e) => setTo(e.target.value)} type="date" className="ml-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="to" />
                                    </div>
                                </div>
                                <div className="min-w-[130px] p-5 outline outline-gray-100 mb-2 bg-pink-100">
                                    <p className="font-bold text-black">total : {hotel.price * numberOfPeople}</p>
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
                <h1 className="text-black font-bold text-[40px]">{hotel.name}</h1>
                <div className="grid w-full p-2">
                    <p className="text-black text-justify">{hotel.detail}</p>
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default HotelDetails;




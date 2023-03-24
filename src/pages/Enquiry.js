import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Enquiry() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [progres, setProgress] = useState(false);

    const submitEnquiry= async (e)=>{
        e.preventDefault();
        
        const data={
            firstName:firstName,
            lastName:lastName,
            email:email,
            phoneNumber:phoneNumber,
            message:message
        }
    
        try {
          await axios.post(`http://localhost:8888/enquirt/add`,{data}).then(
            ()=>{
                setProgress(true)
                toast.success('Successfully Sent!', {
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
                toast.error('Sent Failed!', {
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

        } catch (err) {
          if (err.response.status === 500) {
            toast.error('Sent Failed!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          } else {
            // console.log(err.response.data.msg);
            toast.error('Sent Failed!', {
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
        }
      }

  return (
    <div className='grid content-center justify-center p-5 bg-gray-100'>
        <form className="w-[500px] bg-white p-5" onSubmit={(e)=>submitEnquiry(e)}>
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
            <div className="mb-6">
                <label for="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" name="firstName" placeholder="firstName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>   
            <div className="mb-6">
                <label for="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" name="lastName" placeholder="lastName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>   
            <div className="mb-6">
                <label for="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" name="phoneNumber" placeholder="Phone Number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>   
            <div className="mb-6">
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>   
            <div className="mb-6">
                <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} type="text" name="message" placeholder="message" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required></textarea>
            </div>   
            {
                !progres ?
                <button  className="bg-pink-700 rounded-md shadow-md p-2 font-bold text-white">Send</button>
                :
                <button className="bg-pink-400 rounded-md shadow-md p-2 font-bold text-white" disabled>Send</button>
            }
        </form>
    </div>
  )
}

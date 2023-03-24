import { useState , useEffect } from "react"
import bgimg from "../imgs/bg2.jpg"
import axios from 'axios';
import ListPlaces from "../components/ListPlaces"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [places,setPlaces] = useState([]);
  const [searchVal,setSearchVal] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
      axios.get("http://localhost:8888/packages/allFpackages",{}).then(res=>{
          setPlaces(res.data)
      }).catch(er=>{
          console.log(er)
      })
  }, [])

  const searchResult=(e)=>{
    e.preventDefault();
    navigate('/search',{state:searchVal})
  }

    return (
      <div className="w-full min-h-screen relative">
          <img src={bgimg} className="w-screen h-screen"/>
          <div className="w-full h-screen grid absolute top-0 left-0 content-start">
            <div className="grid w-full p-20">
              <h1 className="font-extrabold text-[40px] text-pink-800">Experience the Adventure of a Lifetime <br/> with Our Travel Packages!</h1>
              <div className="grid w-full pl-20 pr-20 content-start">
                <p className="text-gray-600 font-extrabold text-center">Are you ready to explore the world and create unforgettable memories?  Look no further than our travel agency!We offer a wide range of travel packages to suit every type of traveler, from thrill-seekers to those seeking a relaxing getaway.</p>
              </div>
            </div>
            <div className="grid w-full content-start justify-center">
              <form onSubmit={(e)=>searchResult(e)} className="rounded-md shadow-md grid grid-cols-8 gap-3 w-full p-5 bg-white">
                <div className="grid border-r-4 border-r-gray-500 p-2 col-span-6">
                  <input value={searchVal} onChange={(e) => setSearchVal(e.target.value)} name="destination" type="text" placeholder="search by destination" className="outline-pink-300 p-2" required/>
                </div>
                <button className="rounded-md shadow-md bg-blue-800 p-2 h-[50px] font-bold text-white mt-2">
                    Search
                </button>
              </form>
            </div>
          </div>
          {/* section one */}
          <div className="grid content-start w-full">
              <h1 className="p-5 font-extrabold text-[40px] text-black">Famouse Destination</h1>
              <div className="flex w-full flex-wrap pl-5">
                  {places.map((place) => <ListPlaces id={place.id} contentType={'allFpackages'} name={place.name} price={place.price} detail={place.detail} image={place.image} country={place.country} />)}
              </div>
          </div>
      </div>
    );
  };
  
  export default Home;
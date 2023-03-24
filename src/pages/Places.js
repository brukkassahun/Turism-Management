import { useState , useEffect } from "react"
import bgimg from "../imgs/bg1.jpg"
import axios from 'axios';
import ListPlaces from "../components/ListPlaces"

const Place = () => {
    const [places,setPlaces] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8888/packages/allPackages",{}).then(res=>{
            // console.log(res.data)
            setPlaces(res.data)
        }).catch(er=>{
            console.log(er)
        })
    }, [])
    
    return (
        <div className="w-full min-h-screen relative">
            <div className="overflow-hidden h-[300px]">
                <img src={bgimg} className="w-screen h-screen"/>
            </div>
            <div className="w-full h-[300px] grid absolute top-0 left-0 content-center justify-center">
                <h1 className="p-5 font-extrabold text-[40px] text-white">All Destinations</h1>
            </div>
            {/* section one */}
            <div className="grid content-start w-full">
                <div className="flex w-full flex-wrap pl-5">
                    {places.map((place) => <ListPlaces id={place.id} contentType={'allPackages'} name={place.name} price={place.price} detail={place.detail} image={place.image} country={place.country} />)}
                </div>
            </div>
      </div>
    );
  };
  
  export default Place;
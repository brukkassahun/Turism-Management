import { useState , useEffect } from "react"
import { useLocation } from "react-router-dom";
import axios from 'axios';
import ListPlaces from "../components/ListPlaces"

export default function SearchResult() {
    const location = useLocation(); 
    const [searchVal,setSearchVal] = useState('')
    const [resultOne,setResultOne] = useState([])
    const [resultTwo,setResultTwo] = useState([])
    
    const v = location?.state;
    const val = v.toLowerCase();

    useEffect(() => {
        axios.get(`http://localhost:8888/packages/allPackages/search/${val}`,{}).then(res=>{
            setResultOne(res.data)
        }).catch(er=>{
            console.log(er)
        })

        axios.get(`http://localhost:8888/packages/allFpackages/search/${val}`,{}).then(res=>{
            setResultTwo(res.data)
        }).catch(er=>{
            console.log(er)
        })
    }, [])

    const searchResult=(e)=>{
        e.preventDefault();
        axios.get(`http://localhost:8888/packages/allPackages/search/${searchVal}`,{}).then(res=>{
            setResultOne(res.data)
        }).catch(er=>{
            console.log(er)
        })

        axios.get(`http://localhost:8888/packages/allFpackages/search/${searchVal}`,{}).then(res=>{
            setResultTwo(res.data)
        }).catch(er=>{
            console.log(er)
        })
      }

  return (
    <div className='grid w-full min-h-screen bg-gray-100'>
        <div className="grid w-full content-start justify-center mt-5 mb-5">
            <form onSubmit={(e)=>searchResult(e)} className="rounded-md shadow-md grid grid-cols-8 gap-3 w-full p-1 bg-white">
              <div className="grid border-r-4 border-r-gray-500 p-2 col-span-6">
                <input value={searchVal} onChange={(e) => setSearchVal(e.target.value)} name="destination" type="text" placeholder="search by destination" className="outline-pink-300 p-2" required/>
              </div>
              <button className="rounded-md shadow-md bg-blue-800 p-2 h-[50px] font-bold text-white mt-2">
                  Search
              </button>
            </form>
         </div>
         <div className="flex w-full flex-wrap pl-5">
            {resultOne.map((place) => <ListPlaces id={place.id} contentType={'allPackages'} name={place.name} price={place.price} detail={place.detail} image={place.image} country={place.country} />)}
            {resultTwo.map((place) => <ListPlaces id={place.id} contentType={'allFpackages'} name={place.name} price={place.price} detail={place.detail} image={place.image} country={place.country} />)}
        </div>
    </div>
  )
}

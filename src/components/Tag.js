

import React, { use, useState }  from "react";
import axios from 'axios';
import { useEffect } from "react";
import Spinner from "./Spinner";
import events from "inquirer/lib/utils/events";
function TAg (){
    const[tag,settag]=useState('')
    
    const [randomgif,setrandomgif]=useState('');
    const[loding,setLoding]=useState(false);
    const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

   async function fetchData() {
  setLoding(true);
  try {
     const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${tag}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
     
    // const url = `https://api.giphy.com/v1/gifs/search?api_key=yv5rGQvxnUqJwkJlO6E1lwRqkpdQMV7S&q=${tag}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
    const { data } = await axios.get(url);

    // Check if data exists and has at least one result
    if (data && data.data && data.data.length > 0 && data.data[0].images && data.data[0].images.fixed_height_small) {
      const imgSource = data.data[0].images.fixed_height_small.url;
      settag(imgSource);
    } else {
      console.error("No valid GIF found for the given tag.");
    }
  } catch (error) {
    console.error("Error fetching GIF:", error);
  } finally {
    setLoding(false);
  }
}

     function Clickhandler(){
    fetchData();
     }

     function changeHandler(events){
        settag(events.target.value)
     }
    
     useEffect( ()=>{ // render only one time
      fetchData();
     },[]);
    
    return (
        <div className="random-inside-div" >
            
             <p>Search Gifs</p>
            {
                loding?(<Spinner/>):( <img src={tag}></img>)
            }
            <input type="text" onChange={changeHandler}></input>
            
            <button className="btn" onClick={Clickhandler}>Generate</button>
            </div>
            
        
    )

}
export default TAg;
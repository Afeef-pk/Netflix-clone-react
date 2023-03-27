import React, { useEffect, useState } from "react";
import axios from '../../axios'
import {API_KEY,imageUrl} from '../../constants/constants'
import './Banner.css'
function Banner() {
  
 const [movie, setMovie] = useState()
 
useEffect(()=>{
  axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
    const imgIndex = Math.floor(
      Math.random() * response.data.results.length
    );
      setMovie(response.data.results[imgIndex])
  })
},[])

const description = movie ? movie.overview : "";
const words = description.split(" ");
const truncatedWords = words.slice(0, 40);
const truncatedDescription = truncatedWords.join(" ");
const finalDescription = truncatedWords.length < words.length ? truncatedDescription + "..." : truncatedDescription;

  return (
    <div style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path : ''} ) `  } } className="banner">
      <div className="content"> 
        <h1 className="title">{movie ? (movie.name ? movie.name : movie.title) : ""}</h1>
        <h1 className="description">{finalDescription}</h1>
        <div className="banner_buttons">
          <button className="button">&#9654; Play</button>
          <button className="button">My List</button>
        </div>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;

import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';
import { Link } from 'react-router-dom';

const TitleCards = ({title,category}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
 
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTc3MzJkYTAxODRhYmFiYzMyZWI2ZTkxNjhlNzgxOSIsIm5iZiI6MTcyMTEyMDA1NC42OTIwNjUsInN1YiI6IjY2OTYzNDI5ZTNjODkzNWU5MjA0ZGQ0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hvv3aE3Qhx2dU7Wzbe_6KV3hPGHIVJBA7gVkcDVc6Dc'
    }
  };
  








  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));



    const cardList = cardsRef.current;
    cardList.addEventListener('wheel', handleWheel);
    return () => {
      cardList.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Waveform } from '@uiball/loaders'

<Waveform 
 size={40}
 lineWeight={3.5}
 speed={1} 
 color="black" 
/>

const MovieInfo = () => {
  const { imdbID } = useParams();
  const [movieInfo, setMovieInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  async function movieFetch() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=d90f3a14&i=${imdbID}`
    );
    setMovieInfo(data || []);
    setLoading(false);
  }

  useEffect(() => {
    setTimeout(() => {
      movieFetch();
    }, 1000);
  }, [imdbID]);

  return (
    <>
      {loading ? (
        <>
        <div className="movies__body">
          <div className="row">

         
        <div className="waveform">
  <div className="waveform__bar"></div>
  <div className="waveform__bar"></div>
  <div className="waveform__bar"></div>
  <div className="waveform__bar"></div>
</div>
</div>
        </div>
   
        </>
      ) : (
        <div className="movies__body">
          <div className="row">
            <div className="movieinfo__link">
              <Link to="/">
                <h2 className="movieinfo__link--home">Click to home</h2>
              </Link>
            </div>
            <div className="movieinfo__wrapper">
              <div className="movieinfo__img--wrapper">
                <img src={movieInfo.Poster} alt="" className="movieinfo__img " />
              </div>
              <div className="movieinfo__des--wrapper">
                <div className="movieinfo__title ">Name: {movieInfo.Title}</div>
                <div className="movieinfo__date ">Date: {movieInfo.Year}</div>
                <div className="movieinfo__summary ">
                  <h4 className="movieinfo__summary--title">Summary</h4>
                  {movieInfo.Plot}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </>
  );
};

export default MovieInfo;

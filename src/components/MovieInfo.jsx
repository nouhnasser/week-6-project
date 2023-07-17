import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const MovieInfo = () => {
  const {imdbID} = useParams()
  const [movieInfo, setMovieInfo] = useState(null)

  async function movieFetch() {
    const { data } = await axios.get(`http://www.omdbapi.com/?apikey=bdab0567&i=${imdbID}`)
    if (data) {
      setMovieInfo(data)
    }
    else {
      setMovieInfo(null)
    }
  }

  useEffect(() => { 
    movieFetch()
  },[imdbID])
  
  return (
    <>
      <div className="movies__body">
        <div className="row">
          <div className="movieinfo__link">
            <Link to="/">
             <h2 className="movieinfo__link--home">Click to home</h2>
            </Link>
          </div>
          <div className="movieinfo__wrapper">
            <div className="movieinfo__img--wrapper">
             <img src="" alt="" className="movieinfo__img" />
            </div>
            <div className="movieinfo__des--wrapper">
              <div className="movieinfo__title">{movieInfo.Title}</div>
              <div className="movieinfo__date">{movieInfo.Year}</div>
              <div className="movieinfo__summary">{movieInfo.Plot}</div>
            </div>
          </div>
          <div className="recommended">
            <h2 className="recommended__title">Recommended</h2>
            <div className="recommended__movies"></div>
            <div className="recommended__movie"></div>
            <div className="recommended__movie--title"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;

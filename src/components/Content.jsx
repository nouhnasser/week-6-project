import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Content = () => {
 
  const [showMovie, setShowMovie] = useState([]);
  const [search, setSearch] = useState("");

  function submit(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchMovies();
    }
  }

  async function fetchMovies() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=d90f3a14&s=${search}`
    );
    setShowMovie(data.Search || []);
  }

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <>
      <body>
        <section id="header">
        <div className="row">
          <nav>
            <h1 className="logo">Imovie</h1>
            <ul className="nav__list">
              <li className="nav__links">
                <Link to="/" className="nav__link">
                  Home
                </Link>
              </li>
              <li className="nav__links">
                <Link to="/" className="nav__link">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          
            <div className="search__box">
              <h3>Search for movies</h3>
              <div className="search__bar">
                <input
                  type="text"
                  placeholder="Search your movie"
                  className="search"
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={submit}
                />
                <div className="searchmovies" onClick={fetchMovies}>
                  <FontAwesomeIcon icon="magnifying-glass" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="content">
          <div className="row">
            <div className="container">
              <div className="section__description">
                <h2 className="section__title">Featured Movies</h2>
              </div>
              <div className="movies">
                {showMovie
                  .map((movie) => (
                    <div className="movie" key={movie.imdbID}>
                      <figure className="movie__img--wrapper">
                        <Link to={`/izk/${movie.imdbID}`}>
                          <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="movie__img"
                          />
                        </Link>
                      </figure>
                      <div className="movie__description">
                        <p className="movie__name">{movie.Title}</p>
                        <p className="movie__date">{movie.Year}</p>
                      </div>
                    </div>
                  ))
                  .slice(0, 6)}
              </div>
            </div>
          </div>
        </section>
      </body>
    </>
  );
};

export default Content;

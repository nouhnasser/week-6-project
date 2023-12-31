import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Ring } from "@uiball/loaders";

<Ring size={40} lineWeight={5} speed={2} color="black" />;

const Content = () => {
  const [showMovie, setShowMovie] = useState([]);
  const [search, setSearch] = useState("");
  const [load, setLoad] = useState(false);
  const [searchResult, setSearchResult] = useState("");

  function filterMovies(filter) {
    if (filter === "OLDEST") {
      setShowMovie(showMovie.slice().sort((a, b) => a.Year - b.Year));
    }
    if (filter === "NEWEST") {
      setShowMovie(showMovie.slice().sort((a, b) => b.Year - a.Year));
    }
  }

  function submit(event) {
    if (event.key === "Enter") {
      setTimeout(() => {
        fetchMovies();
      }, 1000);
      setLoad(true);
    document.querySelector(".section__description").style.display = "flex"
    }
  }

  async function fetchMovies() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=d90f3a14&s=${search}`
    );
    setShowMovie(data.Search || []);
    setSearchResult(search);
    setLoad(false);
  }

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <>
      <section id="header">
        <div className="row">
          <nav>
            <h1 className="logo">Imovies</h1>
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
                <h2 className="section__title ">
                  Search results : <span className="izk">{searchResult}</span>{" "}
                </h2>
                <select
                  id="filter"
                  defaultValue="DEFAULT"
                  onChange={(event) => filterMovies(event.target.value)}
                >
                  <option value="DEFAULT" disabled>
                    Sort
                  </option>
                  <option value="OLDEST">Date, Oldest</option>
                  <option value="NEWEST">Date, Newest</option>
                </select>
              </div>
            

            <div className="movies">
              {load ? (
                <>
                  <svg className="ring" viewBox="25 25 50 50" stroke-width="5">
                    <circle cx="50" cy="50" r="20" />
                  </svg>
                </>
              ) : (
                showMovie
                  .map((movie) => (
                    <div className="movie" key={movie.imdbID}>
                      <figure className="movie__img--wrapper">
                        <Link to={`/id/${movie.imdbID}`}>
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
                  .slice(0, 8)
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Content;
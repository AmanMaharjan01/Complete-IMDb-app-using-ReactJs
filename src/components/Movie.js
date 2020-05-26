import React, { useState, useEffect } from "react";
import "./component.css";
import { Link } from "react-router-dom";
export default function Movie() {
  const [films, setFlims] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("spiderman");

  useEffect(() => {
    getData();
  }, [query]);

  const getData = async () => {
    const url = await fetch(
      `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${query}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "imdb-internet-movie-database-unofficial.p.rapidapi.com",
          "x-rapidapi-key":
            "1a6d021204msh683e345d9b0fc0bp147813jsnfd31ae497b7f",
        },
      }
    );
    const tojson = await url.json();
    setFlims(tojson.titles);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div>
      <center>
        <h2 className="head"> Movie Finder</h2>
      </center>
      <form onSubmit={getSearch}>
        <input
          type="text"
          value={search}
          onChange={updateSearch}
          placeholder="Enter the name of movie"
        />
        <button>
          <i className="fas fa-search"></i>
        </button>
      </form>

      <div className="wrapper">
        {films.map((film) => (
          <Link to={`details/${film.id}`} key={film.title}>
            <div className="box">
              <div className="content">
                <h1>{film.title}</h1>
                <br />
                <hr />
                <br />
                <img src={film.image} alt="pics" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

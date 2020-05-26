import React, { useState, useEffect } from "react";
import "./component.css";
import { Link } from "react-router-dom";

export default function Details({ match }) {
  const [movie, setMovie] = useState("");
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    getDetail();
  }, []);
  const getDetail = async () => {
    const data = await fetch(
      `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${match.params.id}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "imdb-internet-movie-database-unofficial.p.rapidapi.com",
          "x-rapidapi-key":
            "1a6d021204msh683e345d9b0fc0bp147813jsnfd31ae497b7f",
          "Set-Cookie": "HttpOnly;Secure;SameSite=Strict",
        },
      }
    );
    const tojson = await data.json();
    setMovie({
      title: tojson.title,
      year: tojson.year,
      length: tojson.length,
      rating: tojson.rating,
      reviews: tojson.rating_votes,
      poster: tojson.poster,
      plot: tojson.plot,
      videoid: tojson.trailer.id,
      video: tojson.trailer.link,
    });

    setCasts(tojson.cast);
  };

  return (
    <>
      <Link to="/">
        <button className="btn">Go Back</button>
      </Link>
      <div className="Details">
        <div className="content">
          <h1 id="title">{movie.title}</h1>
          <p id="year">Year: {movie.year}</p>
          <center>
            <img src={movie.poster} alt="poster" id="poster" />
          </center>
          {/* <p id="lenght">Length of movie : {movie.length}</p> */}
          <p id="rating">
            <b>IMDb Rating : {movie.rating}</b>
          </p>
          <h4>Plot:</h4>
          <p id="plot">{movie.plot}</p>
          {/* <video
          controls
          autoplay
          loop
          id={movie.videoid}
          src={movie.video}
          width="620"
        ></video> */}
          <p id="cast">
            <b>Casts:</b>
          </p>
          <ul id="casts">
            {casts.map((cast) => (
              <li>
                {cast.actor} --<b>{cast.character}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

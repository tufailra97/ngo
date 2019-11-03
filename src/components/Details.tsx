import React from 'react';
import { IMovie, IMovieDetails, ICredits } from 'interfaces';

interface IDetails {
  movie: IMovieDetails;
  cast: ICredits;
}

const Details: React.FC<IDetails & ICredits> = ({ movie, cast }) => {
  return (
    <div className='details-wrapper'>
      <div className='image-container'>
        <img src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} />
      </div>
      <div className='details-container'>
        {/* title */}
        <h1>{movie.original_title}</h1>
        <div className='info'>
          {/* rating */}
          <div className='rating'>
            <h3>Vote:</h3>
            <span>{movie.vote_average}</span>
          </div>
          {/* release date */}
          <div>
            <h3>Release Date</h3>
            <p>{movie.release_date}</p>
          </div>
          <div>
            <h3>Runtime</h3>
            <p>{movie.runtime}min</p>
          </div>
          {/* description */}
          <div>
            <h3>Description</h3>
            <div className='description'>
              <p>{movie.overview}</p>
            </div>
          </div>
          {/* production company */}
          <div className='production-companies'>
            <h3>Production Companies</h3>
            <div>
              {movie.production_companies.map(company => {
                return <span key={company.id}>{company.name}</span>;
              })}
            </div>
          </div>
          {/* cast */}
          {/* <div className='cast-img'>{handleCast()}</div> */}
        </div>
      </div>
    </div>
  );
};

export default Details;

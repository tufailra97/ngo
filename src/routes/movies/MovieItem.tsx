import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMovieDetails,
  getRecommendations,
  getCredits
} from 'actions/_movies';
import { IMovieInistialState } from 'interfaces';
import { Loader, Card } from 'components';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

const MovieItemStyle = styled.div`
  padding: 1rem;
  /* details maing container */
  .details-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    /* image */
    .image-container {
      width: 25%;

      img {
        width: 100%;
      }
    }

    .details-container {
      margin-left: 3rem;
      width: 50%;

      h1 {
        font-size: 2.5rem;
        font-weight: 500;
        text-transform: uppercase;
      }

      .production-companies {
        img {
          width: 2.5rem;
          height: auto;
        }
      }

      .cast-img {
        display: flex;

        img {
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
          flex-shrink: 0;
        }
      }
    }

    /* details wrapper */
  }
`;

const MovieItem: React.FC<RouteComponentProps> = ({ history }) => {
  const { id } = useParams();
  const dispatchAction = useDispatch();
  const movieState: IMovieInistialState = useSelector(
    (state: any) => state.movies
  );
  const [castMember, setCastMember] = useState<number | null>(null);

  const { movie } = movieState;
  const loading = movieState.fetchRequested;
  const error = movieState.fetchFailed;
  const reccomondation = movieState.results;
  const cast = movieState.cast;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    dispatchAction(getMovieDetails(parseInt(id!)));
    dispatchAction(getRecommendations(parseInt(id!)));
    dispatchAction(getCredits(parseInt(id!)));
  }, [id]);

  const handleClickReccomondation = (id: number) => {
    history.replace({
      pathname: `/movies/details/${id}`
    });
  };

  useEffect(() => {
    if (castMember !== null) {
      history.push({
        pathname: `/people/${castMember}`
      });
    }
  }, [castMember]);

  const handleReccomondation = ():
    | Array<React.ReactElement>
    | React.ReactElement => {
    let reccomondationContent;
    if (reccomondation !== undefined) {
      reccomondationContent = reccomondation.map(movie => {
        return (
          <Card
            key={movie.id}
            id={movie.id}
            title={movie.title}
            imageURL={movie.poster_path!}
            callback={handleClickReccomondation}
          />
        );
      });

      return reccomondationContent;
    } else {
      return <Loader />;
    }
  };

  const handleCast = ():
    | Array<React.ReactElement>
    | React.ReactElement
    | null => {
    let casts = [];
    let crews = cast;
    if (Array.isArray(crews)) {
      if (crews.length > 20) {
        crews = crews.slice(0, 10);
      }
      casts = crews.map(cast => {
        return (
          <div
            key={cast.id}
            onClick={() => {
              setCastMember(cast.id);
            }}
          >
            <img src={`https://image.tmdb.org/t/p/w780/${cast.profile_path}`} />
          </div>
        );
      });
      return casts;
    }
    return null;
  };

  if (loading) {
    return <Loader />;
  }
  // TODO: exctract into small components
  return (
    <MovieItemStyle>
      {/* movie details */}
      {movie !== undefined ? (
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
              <div className='cast-img'>{handleCast()}</div>
            </div>
          </div>
        </div>
      ) : null}

      {/* show reccomondation */}
      {handleReccomondation()}
    </MovieItemStyle>
  );
};

export default MovieItem;

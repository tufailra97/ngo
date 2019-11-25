import React, { useEffect, useState, ReactElement } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getDetails, getMovieCredits, getSerieCredits } from 'actions/_people';
import { useSelector, useDispatch } from 'react-redux';
import { IPeopleInitialState } from 'interfaces/IPeopleProps';
import { Headline, Subline, Paragraph } from 'elements/Typography';
import ReadMore from 'components/ReadMore';
import { getSerieDetails } from 'actions/_series';
import { Card } from 'components';
import Recommendation from 'components/Recommendations';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const PeopleWrapper = styled.div`
  margin-top: 6rem;
  .main-container {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  .image-container {
    flex-shrink: 0;
    width: 20vw;
    height: auto;
    margin-right: 3rem;
    img {
      width: 100%;
      height: auto;
      box-shadow: 0px 0px 29px 4px rgba(0, 0, 0, 0.29);
    }
  }

  .details-container {
    width: 65rem;
    margin-left: 3rem;

    .name {
      h1 {
        text-transform: uppercase;
        font-size: 3.5rem;
        font-weight: 400;
        max-width: 40rem;
      }
      margin-bottom: 3rem;
    }

    .info {
      margin-bottom: 1.5rem;
      h2 {
        font-size: 1.4rem;
        text-transform: uppercase;
        margin-bottom: 0.5rem;
      }
      p {
        font-size: 1.3rem;
      }
    }

    .biography {
      .paragraph {
        line-height: 2.3rem;
      }
    }
  }
  .recommendation-container {
    padding: 0 2.5%;
    margin: 4rem 0;
    margin-bottom: 1rem;
    h2 {
      font-size: 2rem;
      font-weight: 500;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
    .recommendation {
      width: 90.5%;
      display: flex;
    }
  }
`;

const People: React.FC<RouteComponentProps> = ({ history }) => {
  const { id } = useParams();
  const dispatchAction = useDispatch();
  const peopleState: IPeopleInitialState = useSelector(
    (state: any) => state.people
  );

  const people = peopleState.people;
  const movieCredit = peopleState.movieCredits;
  const serieCredits = peopleState.serieCredits;

  let movies: Array<ReactElement> = [];
  let series: Array<ReactElement> = [];

  useEffect(() => {
    dispatchAction(getDetails(parseInt(id!)));
    dispatchAction(getMovieCredits(parseInt(id!)));
    dispatchAction(getSerieCredits(parseInt(id!)));
  }, [id]);

  const handleDate = (date: string): string => {
    let month: string = '';
    const fullDate = new Date(date);
    const tempMonth = fullDate.getMonth();
    const day = fullDate.getDay();
    const year = fullDate.getFullYear();

    for (var index = 0; index < months.length; index++) {
      if (index === tempMonth) {
        month = months[index];
      }
    }

    return `${day} ${month} ${year}`;
  };

  const handleClickMovie = (id: number) => {
    history.replace({
      pathname: `/movies/details/${id}`
    });
  };

  const handleClickSerie = (id: number) => {
    history.replace({
      pathname: `/series/details/${id}`
    });
  };

  if (movieCredit && movieCredit.length > 0) {
    movies = movieCredit.map(movie => {
      return (
        <Card
          style={{ margin: '2rem 1rem' }}
          key={movie.id}
          id={movie.id}
          title={movie.character}
          imageURL={movie.poster_path!}
          callback={handleClickMovie}
        />
      );
    });
  }

  if (serieCredits && serieCredits.length > 0) {
    series = serieCredits.map(serie => {
      return (
        <Card
          style={{ margin: '2rem 1rem' }}
          key={serie.id}
          id={serie.id}
          title={serie.character}
          imageURL={serie.poster_path!}
          callback={handleClickSerie}
        />
      );
    });
  }

  return (
    <PeopleWrapper>
      {people !== undefined ? (
        <div className='main-container'>
          <div className='image-container'>
            <img
              src={`https://image.tmdb.org/t/p/w780/${people.profile_path}`}
              alt={people.name}
            />
          </div>
          <div className='details-container'>
            <div className='name'>
              <Headline>{people.name}</Headline>
            </div>
            {people.birthday ? (
              <div className='birthday info'>
                <Subline>Born</Subline>
                <Paragraph>{handleDate(people.birthday)}</Paragraph>
              </div>
            ) : null}
            {people.deathday ? (
              <div className='death info'>
                <Subline>Death</Subline>
                <Paragraph>{handleDate(people.deathday)}</Paragraph>
              </div>
            ) : null}
            <div className='biography info'>
              <Subline>Biography</Subline>
              {people.biography !== null ? (
                <ReadMore
                  texts={people.biography}
                  maxLine={5}
                  lineHeight={23}
                  classNames='paragraph'
                />
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {movies.length > 0 || series.length > 0 ? (
        <div>
          {movies.length > 0 ? (
            <div className='recommendation-container'>
              <Subline>Related Movies</Subline>
              <div className='recommendation'>{movies}</div>
            </div>
          ) : (
            <>
              <div className='recommendation-container'>
                <Subline>Related Series</Subline>
                <div className='recommendation'>{series}</div>
              </div>
            </>
          )}
        </div>
      ) : null}
    </PeopleWrapper>
  );
};

export default People;

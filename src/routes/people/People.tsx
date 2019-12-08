import React, { useEffect } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getDetails, getMovieCredits, getSerieCredits } from 'actions/_people';
import { useSelector, useDispatch } from 'react-redux';
import { IPeopleInitialState } from 'interfaces/IPeopleProps';
import { H1, H2, Paragraph, H3 } from 'elements/Typography';
import { ReadMore, Recommendations } from 'components';

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
        font-weight: 400;
        max-width: 40rem;
      }
      margin-bottom: 3rem;
    }

    .info {
      margin-bottom: 1.5rem;
      h3 {
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
              <H1>{people.name}</H1>
            </div>
            {people.birthday ? (
              <div className='birthday info'>
                <H3>Born</H3>
                <Paragraph>{handleDate(people.birthday)}</Paragraph>
              </div>
            ) : null}
            {people.deathday ? (
              <div className='death info'>
                <H3>Death</H3>
                <Paragraph>{handleDate(people.deathday)}</Paragraph>
              </div>
            ) : null}
            <div className='biography info'>
              <H3>Biography</H3>
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

      {movieCredit || serieCredits ? (
        <div>
          {movieCredit.length > 0 ? (
            <div className='recommendation-container'>
              <H2>Related Movies</H2>
              <Recommendations type='movie' movies={movieCredit} />
            </div>
          ) : (
            <>
              <div className='recommendation-container'>
                <H2>Related Series</H2>
                <Recommendations type='serie' movies={serieCredits} />
              </div>
            </>
          )}
        </div>
      ) : null}
    </PeopleWrapper>
  );
};

export default People;

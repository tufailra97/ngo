import React, { useEffect, useState } from 'react';
import { useHistory, RouteComponentProps, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getDetails } from 'actions/_people';
import { useSelector, useDispatch } from 'react-redux';
import { IPeopleInitialState } from 'interfaces/IPeopleProps';
import { Headline, Subline, Paragraph } from 'elements/Typography';
import ReadMore from 'components/ReadMore';

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
`;

const People: React.FC<RouteComponentProps> = ({ history }) => {
  const { id } = useParams();
  const dispatchAction = useDispatch();
  const peopleState: IPeopleInitialState = useSelector(
    (state: any) => state.people
  );

  const people = peopleState.people;

  useEffect(() => {
    dispatchAction(getDetails(parseInt(id!)));
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
                <p>{handleDate(people.deathday)}</p>
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
    </PeopleWrapper>
  );
};

export default People;

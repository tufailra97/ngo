import React, { useEffect, useState } from 'react';
import {
  match,
  useHistory,
  RouteComponentProps,
  useParams
} from 'react-router-dom';
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

    .paragraph {
      font-size: 1.3rem;
      line-height: 1.4;
    }

    .info-container {
      margin-bottom: 2rem;
      h2 {
        margin-bottom: 1rem;
      }
    }

    .company-wrapper {
      display: flex;
      align-items: center;

      img {
        margin-right: 2rem;
        max-width: 6rem;
        height: auto;
        transition: transform 1s ease;
        &:hover {
          transform: scale(2);
        }
      }
    }

    .description {
      p {
        text-align: justify;
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
        <div className="main-container">
          <div className="image-container">
            <img
              src={`https://image.tmdb.org/t/p/w780/${people.profile_path}`}
              alt={people.name}
            />
          </div>
          <div className="details-container">
            <Headline>{people.name}</Headline>
            {people.birthday ? (
              <div>
                <Subline>Born</Subline>
                <Paragraph>{handleDate(people.birthday)}</Paragraph>
              </div>
            ) : null}
            {people.deathday ? (
              <div>
                <Subline>Death</Subline>
                <p>{handleDate(people.deathday)}</p>
              </div>
            ) : null}
            <div>
              <Subline>Biography</Subline>
              {people.biography !== null ? (
                <div>
                  <ReadMore
                    texts={people.biography}
                    maxLine={4}
                    lineHeight={10}
                    classNames="description paragraph"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </PeopleWrapper>
  );
};

export default People;

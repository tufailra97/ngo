import React from 'react';
import styled, { ThemeProps as StyledThemeProps } from 'styled-components';
import { ThemeProps } from 'interfaces';
import { Headline } from 'elements/Typography';
import { Email, Key, User } from 'icons';

const RegisterWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    h1 {
      text-transform: uppercase;
      margin-bottom: 2rem;
      text-align: center;
    }
    hr {
      margin-bottom: 2.5rem;
      height: 1px;
      border: none;
      background-color: ${(props: StyledThemeProps<ThemeProps>) =>
        props.theme.secondaryBackgroundColour};
    }
    form {
      width: 40rem;
      div {
        margin-bottom: 2rem;
        background-color: ${(props: StyledThemeProps<ThemeProps>) =>
          props.theme.secondaryBackgroundColour};
        border-radius: 0.2rem;
        display: flex;
        align-items: center;
        padding: 0.5rem;
      }

      svg {
        margin: 0 0.5rem;
      }

      input[type='text'],
      input[type='password'] {
        border: none;
        outline: none;
        padding: 0.5rem 1rem;
        width: 100%;
        background-color: transparent;
        font-weight: 500;
        font-size: 1.3rem;
      }

      input[type='submit'] {
        padding: 1rem 1rem;
        border: none;
        outline: none;
        width: 100%;
        text-transform: uppercase;
        font-weight: 600;
        border-radius: 0.2rem;
        color: ${(props: StyledThemeProps<ThemeProps>) =>
          props.theme.lightTextColour};
        background-color: ${(props: StyledThemeProps<ThemeProps>) =>
          props.theme.colour2};
        transition: background-color 0.5s ease, color 0.5s;
        cursor: pointer;
        &:hover {
          background-color: ${(props: StyledThemeProps<ThemeProps>) =>
            props.theme.secondaryBackgroundColour};
          color: ${(props: StyledThemeProps<ThemeProps>) =>
            props.theme.textColour};
        }
      }
    }
  }
`;

const Register: React.FC = () => {
  return (
    <RegisterWrapper>
      <div>
        <Headline>Create Account</Headline>
        <hr />
        <form>
          {/* username */}
          <div>
            <User width={25} height={25} color={'grey'} />
            <input
              type='text'
              name='username'
              id='username'
              placeholder='Username'
            />
          </div>

          {/* email */}
          <div>
            <Email width={25} height={25} color={'grey'} />
            <input
              type='text'
              name='email'
              id='email'
              placeholder='email@email.com'
            />
          </div>

          {/* password */}
          <div>
            <Key width={25} height={25} color={'grey'} />
            <input
              type='password'
              name='password'
              id='password'
              placeholder='*********'
            />
          </div>
          <input type='submit' />
        </form>
      </div>
    </RegisterWrapper>
  );
};

export default Register;

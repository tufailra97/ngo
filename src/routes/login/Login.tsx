import React, { useState } from 'react';
import styled, { ThemeProps as StyledThemeProps } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { H1, Paragraph } from 'elements/Typography';
import { RouteComponentProps } from 'react-router';
import { ThemeProps, AuthState } from 'interfaces';
import { login as _login } from 'actions/_auth';
import { Email, Key } from 'icons';
import axios from 'axios';

const LoginWrapper = styled.div`
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

      input[type='email'],
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

    .error-container {
      background-color: rgba();
      margin-bottom: 1.5rem;
      .error-item {
        text-align: center;
        margin-bottom: 0.5rem;
      }
    }

    .login-success {
      margin-top: 2rem;
      p {
        text-align: center;
      }
    }
  }
`;
// TODO: extract the logic in useReducer
const Login: React.FC<RouteComponentProps> = ({ history }) => {
  // state for login
  const [loginDetails, setLoginDetails] = useState<{
    email: string;
    password: string;
  }>({ email: '', password: '' });
  // state for errors
  const [errors, setErrors] = useState<{
    error: boolean;
    errorMessages: Array<string>;
  }>({ errorMessages: [], error: false });

  // state to check is form is submitted
  const [formSubmitted, setFormSubmitted] = useState(false);
  // action dispatcher
  const dispathActions = useDispatch();
  // auth state
  const authState: AuthState = useSelector((state: any) => state.auth);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setLoginDetails({
      ...loginDetails,
      [name]: value
    });
  };

  const validateEmailAddress = (email: string): boolean => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  const validateFormInput = () => {
    let errorMessages: Array<string> = [];

    if (
      !validateEmailAddress(loginDetails.email) ||
      loginDetails.email.length < 2
    ) {
      errorMessages.push('Email must be valid email address');
    }

    if (loginDetails.password.length < 8) {
      errorMessages.push('Password must be at least 8 characters');
    }

    if (errorMessages.length > 0) {
      setErrors({ error: true, errorMessages: errorMessages });
    } else {
      setErrors({ error: false, errorMessages: [] });
      handleUserLogin();
    }
  };

  const handleUserLogin = async () => {
    const baseURL = `${process.env.REACT_APP_ZEZEN_BACKEND_END_POINT}/user/login`;
    try {
      const response = await axios({
        method: 'POST',
        baseURL: baseURL,
        data: loginDetails
      });

      if (response.status === 200) {
        const userDetails = response.data;

        setFormSubmitted(true);
        setTimeout(() => {
          dispathActions(_login(userDetails.user_id, userDetails.token));
          history.push({
            pathname: '/'
          });
        }, 1000);
      }
    } catch (error) {
      setErrors({
        error: true,
        errorMessages: [error.response.data.message]
      });
    }
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement | HTMLInputElement>
  ) => {
    event.preventDefault();
    validateFormInput();
  };

  if (authState.isUserLoggedIn) {
    history.push({
      pathname: '/'
    });
  }

  return (
    <LoginWrapper>
      <div>
        <H1>Login</H1>
        <hr />
        <div className='error-container'>
          {errors.errorMessages.length > 0 &&
            errors.errorMessages.map((error, index) => {
              return (
                <Paragraph key={index} className='error-item'>
                  {error}
                </Paragraph>
              );
            })}
        </div>
        <form onSubmit={handleSubmit}>
          {/* email */}
          <div>
            <Email width={25} height={25} color={'grey'} />
            <input
              type='email'
              name='email'
              id='email'
              placeholder='email@email.com'
              autoComplete='user email'
              onChange={handleInputChange}
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
              autoComplete='new-password'
              onChange={handleInputChange}
            />
          </div>
          <input type='submit' onSubmit={handleSubmit} />
        </form>

        {formSubmitted && (
          <div className='login-success'>
            <Paragraph>
              You have successfully logged in
              <br />
              Redirecting to home page...
            </Paragraph>
          </div>
        )}
      </div>
    </LoginWrapper>
  );
};

export default Login;

import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Search as SearchComponent } from 'components';
import { Sidebar } from 'components';
import Home from './home/Home';
import Movies from './movies/Movies';
import MovieItem from './movies/MovieItem';
import Series from './series/Series';
import SeriesItem from './series/SeriesItem';
import Search from './search/Search';
import People from './people/People';
import styled from 'styled-components';
import PageNotFound from './404/404';
import Register from './register/Register';
import Login from './login/Login';
import Logout from './logout/Logout';
import Favourites from './favourite/Favourites';

const MainContainer = styled.div`
  display: flex;
`;

const RouteWrapper = styled.div`
  width: 80vw;
`;

const history = createBrowserHistory();

const RootRouter: React.FC = () => {
  return (
    <Router history={history}>
      <MainContainer>
        <Sidebar />
        <RouteWrapper>
          <SearchComponent />
          <Switch>
            <Route
              exact
              path={process.env.PUBLIC_URL + '/'}
              component={() => <Redirect to='/home' />}
            />
            <Route path={process.env.PUBLIC_URL + '/home'} component={Home} />
            <Route
              exact
              path={process.env.PUBLIC_URL + '/movies'}
              component={Movies}
            />
            <Route
              path={process.env.PUBLIC_URL + '/movies/details/:id'}
              component={MovieItem}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + '/series'}
              component={Series}
            />
            <Route
              path={process.env.PUBLIC_URL + '/series/details/:id'}
              component={SeriesItem}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + '/search'}
              component={Search}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + '/favourites'}
              component={Favourites}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + '/register'}
              component={Register}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + '/login'}
              component={Login}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + '/logout'}
              component={Logout}
            />
            <Route
              path={process.env.PUBLIC_URL + '/search/people/:id'}
              component={People}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + '*'}
              component={PageNotFound}
            />
          </Switch>
        </RouteWrapper>
      </MainContainer>
    </Router>
  );
};

export default RootRouter;

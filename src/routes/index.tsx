import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './home/Home';
import Movies from './movies/Movies';
import MovieItem from './movies/MovieItem';
import Series from './series/Series';
import { Search as SearchComponent } from 'components';
import Search from './search/Search';
import People from './people/People';
import styled from 'styled-components';
import { Sidebar } from 'components';

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
              path={process.env.PUBLIC_URL + '/people/:id'}
              component={People}
            />
            <Route
              path={process.env.PUBLIC_URL + '/series'}
              component={Series}
            />
            <Route
              path={process.env.PUBLIC_URL + '/search'}
              component={Search}
            />
          </Switch>
        </RouteWrapper>
      </MainContainer>
    </Router>
  );
};

export default RootRouter;

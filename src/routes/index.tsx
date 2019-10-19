import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Home from './home/Home';
import Movies from './movies/Movies';
import Series from './series/Series';
import { Sidebar } from 'components';
import Search from 'components/Search';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
`;

const RouteWrapper = styled.div`
  width: 80vw;
  height: 100vh;
`;

const RootRouter: React.FC = () => {
  return (
    <Router>
      <MainContainer>
        <Sidebar />
        <RouteWrapper>
          <Search />
          <Switch>
            <Route exact path={'/'} component={() => <Redirect to='/home' />} />
            <Route path={'/home'} component={Home} />
            <Route path={'/movies'} component={Movies} />
            <Route path={'/series'} component={Series} />
          </Switch>
        </RouteWrapper>
      </MainContainer>
    </Router>
  );
};

export default RootRouter;

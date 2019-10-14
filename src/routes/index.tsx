import React, { Fragment } from 'react';
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

const RootRouter: React.FC = () => {
  return (
    <Router>
      <Fragment>
        <Sidebar />
        <Switch>
          <Route exact path={'/'} component={() => <Redirect to='/home' />} />
          <Route path={'/home'} component={Home} />
          <Route path={'/movies'} component={Movies} />
          <Route path={'/series'} component={Series} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default RootRouter;

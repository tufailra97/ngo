import React from 'react';
import './App.scss';
import RootRouter from 'routes';
import Navbar from 'components/navbar/Navbar';

const App: React.FC = () => {
  return (
    <div className='app'>
      <RootRouter />
    </div>
  );
};

export default App;

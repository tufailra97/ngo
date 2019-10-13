import React, { useEffect, useState } from 'react';
import RootRouter from 'routes';

const App: React.FC = () => {
  return (
    <div className='app'>
      <RootRouter />
    </div>
  );
};

export default App;

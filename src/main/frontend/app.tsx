import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from './route'; // Import your router configuration

const App: React.FC = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
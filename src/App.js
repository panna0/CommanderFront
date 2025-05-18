import './App.scss';
import {createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home/Home';
import LandingPage from './pages/LandingPage/LandingPage';
import NotFound from './pages/NotFound/NotFound';
import BaseLayouts from './layouts/BaseLayouts/BaseLayouts';
import Login from './pages/Login/Login';
import LoginRegisterLayouts from './layouts/LoginRegisterLayouts/LoginRegisterLayouts';
import Register from './pages/Register/Register';



const router = createBrowserRouter([
  {
    path: "/", 
    element: <BaseLayouts />,
    children: [
      {
        index: true,  
        element: <LandingPage /> 
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "*",
        element: <NotFound />
      },
    ],

  },

  {
    path: "/auth", 
    element: <LoginRegisterLayouts />,
    children: [
      {
        path: "login" ,
        element: <Login /> 
      },
      {
        path: "register" ,
        element: <Register /> 
      },
    ],

  },
  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
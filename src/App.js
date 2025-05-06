import './App.scss';
import {createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home/Home';
import LandingPage from './pages/LandingPage/LandingPage';
import NotFound from './pages/NotFound/NotFound';
import BaseLayouts from './layouts/BaseLayouts/BaseLayouts';


const router = createBrowserRouter([
  {
    path: "/",  
    element: <LandingPage /> 
  },
  {
    path: "/app", 
    element: <BaseLayouts />,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
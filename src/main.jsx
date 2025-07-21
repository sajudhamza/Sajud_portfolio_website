import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import MembershipsPage from './components/MembershipsPage.jsx';
import TestimonialPage from './components/TestimonialPage.jsx'; // Import the new page
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/memberships",
    element: <MembershipsPage />,
  },
  {
    path: "/testimonial/:id", // Add the new dynamic route
    element: <TestimonialPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
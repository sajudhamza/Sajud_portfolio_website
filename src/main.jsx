import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import MembershipsPage from './components/MembershipsPage.jsx';
import TestimonialPage from './components/TestimonialPage.jsx';
import LoginPage from './components/LoginPage.jsx'; // Import Login page
import FilesPage from './components/FilesPage.jsx'; // Import Files page
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Import ProtectedRoute
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
    path: "/testimonial/:id",
    element: <TestimonialPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/files",
    element: (
      <ProtectedRoute>
        <FilesPage />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
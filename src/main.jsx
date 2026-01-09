import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import MembershipsPage from './components/MembershipsPage.jsx';
import TestimonialPage from './components/TestimonialPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import FilesPage from './components/FilesPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import QualificationsPage from './pages/QualificationsPage.jsx';
import PatentsPage from './pages/PatentsPage.jsx';
import PublicationsPage from './pages/PublicationsPage.jsx';
import ArticlesPage from './pages/ArticlesPage.jsx';
import JudgingPage from './pages/JudgingPage.jsx';
import MediaPage from './pages/MediaPage.jsx';
import PhotosPage from './pages/PhotosPage.jsx';
import TestimonialsPage from './pages/TestimonialsPage.jsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/qualifications",
    element: <QualificationsPage />,
  },
  {
    path: "/patents",
    element: <PatentsPage />,
  },
  {
    path: "/publications",
    element: <PublicationsPage />,
  },
  {
    path: "/articles",
    element: <ArticlesPage />,
  },
  {
    path: "/judging",
    element: <JudgingPage />,
  },
  {
    path: "/media",
    element: <MediaPage />,
  },
  {
    path: "/photos",
    element: <PhotosPage />,
  },
  {
    path: "/testimonials",
    element: <TestimonialsPage />,
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
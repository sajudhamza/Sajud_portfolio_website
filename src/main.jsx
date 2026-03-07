import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './index.css'

// Lazy-load pages for faster initial load and smoother navigation
const MembershipsPage = lazy(() => import('./components/MembershipsPage.jsx'));
const TestimonialPage = lazy(() => import('./components/TestimonialPage.jsx'));
const LoginPage = lazy(() => import('./components/LoginPage.jsx'));
const FilesPage = lazy(() => import('./components/FilesPage.jsx'));
const QualificationsPage = lazy(() => import('./pages/QualificationsPage.jsx'));
const PatentsPage = lazy(() => import('./pages/PatentsPage.jsx'));
const PublicationsPage = lazy(() => import('./pages/PublicationsPage.jsx'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage.jsx'));
const JudgingPage = lazy(() => import('./pages/JudgingPage.jsx'));
const MediaPage = lazy(() => import('./pages/MediaPage.jsx'));
const PhotosPage = lazy(() => import('./pages/PhotosPage.jsx'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage.jsx'));

const PageFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-gray-400">Loading…</div>
  </div>
);

const withSuspense = (Component) => (
  <Suspense fallback={<PageFallback />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/qualifications", element: withSuspense(QualificationsPage) },
  { path: "/patents", element: withSuspense(PatentsPage) },
  { path: "/publications", element: withSuspense(PublicationsPage) },
  { path: "/articles", element: withSuspense(ArticlesPage) },
  { path: "/judging", element: withSuspense(JudgingPage) },
  { path: "/media", element: withSuspense(MediaPage) },
  { path: "/photos", element: withSuspense(PhotosPage) },
  { path: "/testimonials", element: withSuspense(TestimonialsPage) },
  { path: "/memberships", element: withSuspense(MembershipsPage) },
  { path: "/testimonial/:id", element: withSuspense(TestimonialPage) },
  { path: "/login", element: withSuspense(LoginPage) },
  {
    path: "/files",
    element: (
      <Suspense fallback={<PageFallback />}>
        <ProtectedRoute>
          <FilesPage />
        </ProtectedRoute>
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
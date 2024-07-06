import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import ExplorePage from './Pages/ExplorePage';
import MessagesPage from './Pages/MessagesPage';
import NotificationsPage from './Pages/NotificationsPage';
import BookmarksPage from './Pages/BookmarksPage';
import CommunitiesPage from './Pages/CommunitiesPage';
import ListsPage from './Pages/ListsPage';
import PremiumPage from './Pages/PremiumPage';
import LoginRegisterPage from './Pages/LoginRegisterPage';
import ProfilePage from './Pages/ProfilePage';

import UserProfile from './Pages/UserProfile';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/home", element: <App /> },
  { path: "/explore", element: <ExplorePage /> },
  { path: "/login", element: <LoginRegisterPage /> },
  { path: "/messages", element: <MessagesPage /> },
  { path: "/notifications", element: <NotificationsPage /> },
  { path: "/bookmarks", element: <BookmarksPage /> },
  { path: "/communities", element: <CommunitiesPage /> },
  { path: "/lists", element: <ListsPage /> },
  { path: "/premium", element: <PremiumPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/userprofile/:friendId", element: <UserProfile /> },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

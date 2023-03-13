import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Spaces from "./pages/spaces/Spaces";
import Authenticate from "./pages/authenticate/Authenticate";
import Activate from "./pages/activate/Activate";
import { useLoadingRefresh } from "./hooks/useLoadingRefresh";
import Loader from "./components/loader/Loader";
import Space from "./pages/space/Space";

const App = () => {
  const { loading } = useLoadingRefresh();

  return loading ? (
    <Loader message="Loading, please wait..." />
  ) : (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/authenticate"
          exact
          element={
            <PublicRoute>
              <Authenticate />
            </PublicRoute>
          }
        />
        <Route
          path="/activate"
          exact
          element={
            <SemiRestrictedRoute>
              <Activate />
            </SemiRestrictedRoute>
          }
        />
        <Route
          path="/spaces"
          exact
          element={
            <RestrictedRoute>
              <Spaces />
            </RestrictedRoute>
          }
        />
        <Route
          path="/space/:id"
          exact
          element={
            <RestrictedRoute>
              <Space />
            </RestrictedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

const PublicRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  return isAuth ? <Navigate to="/spaces" replace /> : children;
};

const SemiRestrictedRoute = ({ children }) => {
  const { isAuth, user } = useSelector((state) => state.auth);

  return !isAuth ? (
    <Navigate to="/" replace />
  ) : isAuth && !user.activated ? (
    children
  ) : (
    <Navigate to="/spaces" replace />
  );
};

const RestrictedRoute = ({ children }) => {
  const { isAuth, user } = useSelector((state) => state.auth);

  return !isAuth ? (
    <Navigate to="/" replace />
  ) : isAuth && !user.activated ? (
    <Navigate to="/activate" replace />
  ) : (
    children
  );
};

export default App;

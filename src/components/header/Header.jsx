import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../utils/httpRequests";
import { setAuth } from "../../redux/authSlice";
import "./Header.css";

const Header = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="primary-header | container">
      <div>
        <Link to="/" className="logo | fw-black">
          Clique
        </Link>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {(!isAuth && !user) || !user.activated ? (
          <Link
            to="/authenticate"
            className="btn--login | fw-bold bg-neutral-900 text-neutral-100"
          >
            Sign In
          </Link>
        ) : (
          <div className="profile">
            <div className="user">
              <img className="user-avatar" src={user.avatar} alt={user.name} />
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <p
                  className="fw-medium fs-body-sm"
                  style={{
                    textAlign: "left",
                    lineHeight: "0.9",
                    textTransform: "capitalize",
                  }}
                >
                  {user.name}
                </p>
                <span
                  className="username | text-neutral-300"
                  style={{
                    textAlign: "left",
                    lineHeight: "0.9",
                    fontSize: "0.875rem",
                  }}
                >
                  @{user.username}
                </span>
              </div>
            </div>
            <button className="btn--logout | fw-bold" onClick={logoutUser}>
              {/* Logout */}
              <img src="../../../public/assets/logout.svg" draggable="false" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

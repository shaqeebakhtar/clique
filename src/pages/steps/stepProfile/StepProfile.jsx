import React, { useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { setName, setUsername, setAvatar } from "../../../redux/activateSlice";
import { setAuth } from "../../../redux/authSlice";
import { activateAccount } from "../../../utils/httpRequests";
import Loader from "../../../components/loader/Loader";

import "./StepProfile.css";

const StepProfile = () => {
  const { name, username, avatar } = useSelector((state) => state.activate);

  const [uname, setUname] = useState(username);
  const [fullName, setFullName] = useState(name);
  const [pic, setPic] = useState("../../../../public/assets/avatar.png");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setPic(reader.result);
      dispatch(setAvatar(reader.result));
    };
  };

  const submit = async () => {
    batch(() => {
      dispatch(setName(fullName));
      dispatch(setUsername(uname));
    });
    setLoading(true);
    try {
      await activateAccount({
        name: fullName,
        username: uname,
        avatar: pic,
      }).then((res) => {
        if (res.data.auth) {
          dispatch(setAuth(res.data));
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader message="Activation in progess..." />;

  return (
    <div className="step--profile">
      <h3 className="step--profile__text | fw-black fs-title">
        Create your profile
      </h3>
      <div className="avatar-wrapper">
        <div className="avatar">
          <img src={pic} alt="avatar" />
        </div>
        <input
          type="file"
          id="avatar-input"
          onChange={changeAvatar}
          style={{ display: "none" }}
        />
        <label htmlFor="avatar-input" className="avatar-input">
          <img
            src="../../../../public/assets/pencil.svg"
            alt="edit"
            draggable="false"
          />
        </label>
      </div>
      <label className="input-label | fs-body-sm" htmlFor="username">
        Choose your username
      </label>
      <input
        type="text"
        name="username"
        id="username"
        value={uname}
        onChange={(e) => setUname(e.target.value)}
        placeholder="@username"
      />
      <label className="input-label | fs-body-sm" htmlFor="full-name">
        Enter your full name
      </label>
      <input
        type="text"
        name="full-name"
        id="full-name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="John Doe"
      />
      <button className="btn--continue | fw-bold" onClick={submit}>
        Continue
      </button>
    </div>
  );
};

export default StepProfile;

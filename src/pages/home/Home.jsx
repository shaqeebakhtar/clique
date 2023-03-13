import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const register = () => {
    navigate("/authenticate");
  };

  return (
    <section className="hero | container gap-lg">
      <h1 className="hero__title | fw-black">
        Talk about topics that you like
      </h1>
      <p className="hero__body">
        Clique is a place where you can have live conversation on your favorite
        topics with like minded peoples. You can host these conversations or can
        join any live conversations on the platform.
      </p>
      <button
        className="btn--register | fw-bold bg-neutral-100 text-neutral-900"
        onClick={register}
      >
        Get Started
      </button>
    </section>
  );
};

export default Home;

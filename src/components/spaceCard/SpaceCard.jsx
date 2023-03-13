import React from "react";
import { Link } from "react-router-dom";
import "./SpaceCard.css";

const SpaceCard = ({ space }) => {
  const colors = {
    0: "#FFBD56",
    1: "#FFADAD",
    2: "#FFD6A5",
    3: "#FFC6FF",
    4: "#CAFFBF",
    5: "#9BF6FF",
    6: "#BDB2FF",
    7: "#A0C4FF",
  };

  const getRandomInt = () => {
    return Math.floor(Math.random() * (7 - 0 + 1)) + 0;
  };

  return (
    <div
      className="space | gap-lg"
      style={{ backgroundColor: colors[getRandomInt()] }}
    >
      <div className="host">
        <span className="host-label | fs-body-x-sm">Host</span>
        <p
          className="fw-bold fs-body-sm"
          style={{ textTransform: "capitalize" }}
        >
          {space.hostId.name}
        </p>
      </div>
      <h4 className="space-topic | fw-black fs-title-sm">{space.topic}</h4>
      <div className="space__footer">
        <div className="liteners">
          {space.speakers.map((speaker) => (
            <img
              key={speaker.id}
              className="listener__avatar"
              src={speaker.avatar}
              alt={speaker.name}
            />
          ))}
          <div className="listeners__count | fw-bold">
            <span>+99</span>
          </div>
        </div>
        <Link
          to={`/space/${space.id}`}
          className="btn--join | fw-bold fs-body-sm"
        >
          Join
        </Link>
      </div>
    </div>
  );
};

export default SpaceCard;

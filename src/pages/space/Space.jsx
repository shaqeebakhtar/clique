import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Space.css";
import { useWebRTC } from "../../hooks/useWebRTC";
import { getSpace } from "../../utils/httpRequests";

const Space = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [space, setSpace] = useState(null);
  const { id: spaceId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { clients, provideRef, handleMute } = useWebRTC(spaceId, user);

  const navigate = useNavigate();

  const leaveSpace = () => {
    navigate("/spaces");
  };

  const handleMuteClick = (clientId) => {
    if (clientId !== user.id) return;
    setIsMuted((isMuted) => !isMuted);
  };

  useEffect(() => {
    handleMute(isMuted, user.id);
  }, [isMuted]);

  useEffect(() => {
    const fetchSpace = async () => {
      const { data } = await getSpace(spaceId);
      setSpace((prev) => data);
    };

    fetchSpace();
  }, []);

  return (
    <section className="space-details | container">
      <header className="space-details__header">
        <h2 className="fw-black fs-title" style={{ maxWidth: "35ch" }}>
          {space?.topic}
        </h2>
        <button className="btn--leave | fw-bold" onClick={leaveSpace}>
          Leave Space
        </button>
      </header>
      <div className="clients">
        {clients.map((client) => {
          return (
            <div key={client.id} className="joined-user | gap-x-sm">
              <audio
                ref={(instance) => provideRef(instance, client.id)}
                autoPlay
              ></audio>
              <button
                className={client.muted ? "btn--mic muted" : "btn--mic"}
                onClick={() => handleMuteClick(client.id)}
              >
                {client.muted ? (
                  <img
                    src="/assets/microphone-slash.svg"
                    alt=""
                  />
                ) : (
                  <img src="/assets/microphone.svg" alt="" />
                )}
              </button>
              <div className="joined-user__avatar">
                <img src={client.avatar} alt={client.name} />
              </div>
              <p className="fw-medium fs-body-x-sm">
                {client.name.split(" ")[0]}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Space;

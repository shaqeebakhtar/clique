import React, { useState } from "react";
import "./CreateSpaceModal.css";
import { createSpace as create } from "../../utils/httpRequests";
import { useNavigate } from "react-router-dom";

const CreateSpaceModal = ({ onClose }) => {
  const [spaceType, setSpaceType] = useState("public");
  const [topic, setTopic] = useState("");

  const navigate = useNavigate();

  const createSpace = async () => {
    try {
      if (!topic) return;
      const { data } = await create({ topic, spaceType });
      navigate(`/space/${data.id}`);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="create-space__backdrop">
      <div className="create-space__modal">
        <div className="modal__header">
          <h3 className="fw-black fs-title-sm">Create your Space</h3>
          <button className="btn--close-modal" onClick={onClose}>
            <img src="/assets/close.svg" />
          </button>
        </div>
        <div className="modal__body">
          <input
            type="text"
            name="topic"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="What do you want to talk about?"
          />
          <div className="space__types">
            <div
              className={
                spaceType === "public" ? "space-type selected" : "space-type"
              }
              onClick={() => setSpaceType("public")}
            >
              <img src="/assets/globe.svg" alt="" />
              <p className="fw-medium fs-body-x-sm">Public</p>
            </div>
            <div
              className={
                spaceType === "private" ? "space-type selected" : "space-type"
              }
              onClick={() => setSpaceType("private")}
            >
              <img src="/assets/lock.svg" alt="" />
              <p className="fw-medium fs-body-x-sm">Private</p>
            </div>
            <div
              className={
                spaceType === "unlisted" ? "space-type selected" : "space-type"
              }
              onClick={() => setSpaceType("unlisted")}
            >
              <img src="/assets/link.svg" alt="" />
              <p className="fw-medium fs-body-x-sm">Unlisted</p>
            </div>
          </div>
        </div>
        <div className="modal__footer">
          <button onClick={createSpace} className="btn--start-space | fw-bold">
            Start your Space
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSpaceModal;

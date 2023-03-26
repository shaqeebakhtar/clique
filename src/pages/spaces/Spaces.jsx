import React, { useEffect, useState } from "react";
import CreateSpaceModal from "../../components/createSpaceModal/CreateSpaceModal";
import SpaceCard from "../../components/spaceCard/SpaceCard";
import { getAllSpaces } from "../../utils/httpRequests";
import "./Spaces.css";

// const spaces = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const Spaces = () => {
  const [showModal, setShowModal] = useState(false);
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      const { data } = await getAllSpaces();
      setSpaces(data);
    };
    fetchSpaces();
  }, []);

  return (
    <>
      <section className="spaces | container">
        <header className="spaces__header">
          <div className="spaces__header-left">
            <h3 className="fw-black fs-title-sm">Happening Now</h3>
            <p className="fs-body-sm text-neutral-300">
              Spaces live now, join and listen
            </p>
          </div>
          <div className="spaces__header-right">
            <div className="search-bar">
              <label htmlFor="search">
                <img
                  src="/assets/search.svg"
                  draggable="false"
                />
              </label>
              <input
                type="text"
                name="search"
                placeholder="Search spaces"
                id="search"
              />
            </div>
            <button
              className="btn--create-space | fw-bold"
              onClick={() => setShowModal(true)}
            >
              Create your space
            </button>
          </div>
        </header>
        <div className="spaces-list">
          {spaces?.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      </section>
      {showModal && <CreateSpaceModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Spaces;

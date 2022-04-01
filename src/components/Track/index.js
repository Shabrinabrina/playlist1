import React, { useState } from "react";

export default function Track({ url, title, artist, toggleSelect }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  };

  return (
    <div className="card-playlist">
      <img src={url} alt="Track Playlist" />
      <h3>{title}</h3>
      <p>{artist}</p>
      <button
        className={`btn btn-select ${
          isSelected ? "btn-primary" : "btn-secondary"
        }`}
        onClick={handleSelect}
      >
        {isSelected ? "Deselect" : "Select"}
      </button>
    </div>
  );
}
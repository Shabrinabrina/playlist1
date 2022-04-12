import React, { useState } from 'react';

export default function Track({ url, title, artist, select, toggle }) {
  const [isSelected, setIsSelected] = useState(select);

  const handleSelect = () => {
    setIsSelected(!isSelected);
    toggle();
  };

  return (
    <div className="card-playlist">
      <img src={url} alt="Track Playlist" />
      <div className="card-info">
        <h4>{title}</h4>
        <p>{artist}</p>
      </div>
      <button
        className={`btn btn-select ${
          isSelected ? 'btn-primary' : 'btn-secondary'
        }`}
        onClick={handleSelect}
      >
        {isSelected ? 'Deselect' : 'Select'}
      </button>
    </div>
  );
}
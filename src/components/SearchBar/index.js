import React, { useState } from "react";
import { useSelector } from "react-redux";
import config from "../../utils/config";
import { searchTrack } from "../../utils/fetchApi";

export default function SearchBar({ onSuccess, onClearSearch }) {
  const [text, setText] = useState("");
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseSearch = await searchTrack(text, accessToken);

      const tracks = responseSearch.tracks.items;
      onSuccess(tracks);
  } catch (e) {
      alert(e);
  }
};

const clearSearch = () => {
  setText("");
  onClearSearch();
};

  return (
    <div className="search-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="query"
            placeholder="Search..."
            onChange={handleInput}
            required
            value={text}
          />
          <button className="btn btn-primary">Search</button>
        </div>
      </form>
      <button className="btn btn-text" onClick={clearSearch}>
        Clear Search
      </button>
    </div>
  );
}
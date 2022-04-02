import React, { useState } from "react";
import { addTracksToPlaylist, createPlaylist } from "../../utils/fetchApi";

export default function FormPlaylist({ accessToken, userId, uris }) {
  const [playlist, setPlaylist] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPlaylist({ ...playlist, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (playlist.title.length > 10) {
      try {
        const responsePlaylist = await createPlaylist(accessToken, userId, {
          name: playlist.title,
          description: playlist.description,
        });

        await addTracksToPlaylist(accessToken, responsePlaylist.id, uris);

        setPlaylist({
          title: "",
          description: "",
        });

        alert("Playlist created successfully!");
      } catch (e) {
        alert(e);
      }
    } else {
      alert("Title must be at least 10 characters long.");
    }
  };

  return (
    <div className="form-playlist">
      <h3>Create Playlist</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={playlist.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            name="description"
            value={playlist.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
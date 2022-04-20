import React, { useState } from 'react';
import { RootState, useAppSelector } from '../../redux/store';
import { addTracksToPlaylist, createPlaylist } from '../../utils/fetchApi';

interface IProps {
  uris: string[];
}

interface IFormState {
  title: string;
  description: string;
}

const FormPlaylist: React.FC<IProps> = ({ uris }) => {
  const [playlist, setPlaylist] = useState<IFormState>({
    title: '',
    description: '',
  });
  const accessToken: string = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );
  const userId: string | undefined = useAppSelector(
    (state: RootState) => state.auth.user?.id
  );

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const { name, value } = target;

    setPlaylist({ ...playlist, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (playlist.title.length > 10) {
      try {
        const responsePlaylist = await createPlaylist(accessToken, userId, {
          name: playlist.title,
          description: playlist.description,
        });

        await addTracksToPlaylist(accessToken, responsePlaylist.id, uris);

        setPlaylist({
          title: '',
          description: '',
        });

        alert('Playlist created successfully!');
      } catch (e) {
        alert(e);
      }
    } else {
      alert('Title must be at least 10 characters long.');
    }
  };

  return (
    <div className="from-playlist">
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
            aria-label="input-title"
            placeholder="Your playlist title"
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
            placeholder="Playlist description"
            aria-label="input-description"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default FormPlaylist;
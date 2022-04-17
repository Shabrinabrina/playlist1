import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TRootState } from '../../store';
import { searchTrack } from '../../utils/fetchApi';

interface Props {
  onSuccess: (tracks: any[]) => void;
  onClearSearch: () => void;
}

const SearchBar: React.FC<Props> = ({ onSuccess, onClearSearch }) => {
  const [text, setText] = useState<string>('');
  const accessToken: string = useSelector(
    (state: TRootState) => state.auth.accessToken
  );

  const handleInput = (e: React.ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setText(target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const responseSearch = await searchTrack(text, accessToken);

      const tracks = responseSearch.tracks.items;
      onSuccess(tracks);
    } catch (e) {
      alert(e);
    }
  };

  const clearSearch: () => void = () => {
    setText('');
    onClearSearch();
  };

  return (
    <div className="search-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="query"
            placeholder="Search tracks..."
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
};

export default SearchBar;
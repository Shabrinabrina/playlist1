/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Track from "../../components/Track";
import SearchBar from "../../components/SearchBar";
import config from "../../utils/config";

export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedTrackURI, setSelectedTrackURI] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  // useEffect for getting access token from hash url with URLSearchParams
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash);
    const accessToken = params.get("#access_token");
    setAccessToken(accessToken);
    setIsAuthorized(accessToken !== null);
  }, []);

  // kalau lagi ga search (kondisi false), selectedTracknya dimasukin ke state Tracks
  useEffect(() => {
    if (!isSearch) {
      const selectedTracks = filterSelectedTracks();

      setTracks(selectedTracks);
    }
  }, [selectedTrackURI]);
  // trigger - jalan kalau selectedTrackURI berubah tapi di kondisi search is false

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${config.RESPONSE_TYPE}&redirect_uri=${config.REDIRECT_URI}&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  };

  // untuk memfilter data track berdasarkan URI yang ada
  const filterSelectedTracks = () => {
    return tracks.filter((track) => selectedTrackURI.includes(track.uri));
  };

  // result tracks from search
  const handleSuccessSearch = (searchTracks) => {
    setIsSearch(true);
    const selectedTracks = filterSelectedTracks();

    // distinct agar data ga double antara track yang udah deselected dengan tracks hasil search
    const searchDistinctTracks = searchTracks.filter(
      (track) => !selectedTrackURI.includes(track.uri)
    );

    // ... spread operator untuk memecah array
    setTracks([...selectedTracks, ...searchDistinctTracks]);
  };

  const clearSearch = () => {
    const selectedTracks = filterSelectedTracks();

    setTracks(selectedTracks);
    setIsSearch(false);
  };

  const toggleSelect = (track) => {
    const uri = track.uri;

    if (selectedTrackURI.includes(uri)) {
      setSelectedTrackURI(selectedTrackURI.filter((item) => item !== uri));
    } else {
      setSelectedTrackURI([...selectedTrackURI, uri]);
    }
  };

  return (
    <div className="container">
      {!isAuthorized && (
        <div className="login-app">
          <p>Before using the app, please login to Spotify here.</p>
          <a href={getSpotifyLinkAuthorize()} className="btn btn-primary">
            Login
          </a>
        </div>
      )}

      {isAuthorized && (
        <>
          <h1>Musify Playlist</h1>
          <SearchBar
            accessToken={accessToken}
            onSuccess={(tracks) => handleSuccessSearch(tracks)}
            onClearSearch={clearSearch}
          />

          {tracks.length === 0 && <p>No tracks</p>}

          <div className="track-list">
            {tracks.map((track) => (
              <Track
                key={track.id}
                url={track.album.images[0].url}
                title={track.name}
                artist={track.artists[0].name}
                toggleSelect={() => toggleSelect(track)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import config from '../../utils/config';
import { getUserProfile } from '../../utils/fetchApi';
import { login } from '../../utils/authSlice';
import { Anchor } from '@mantine/core';

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash);
    const accessTokenParams = params.get('#access_token');

    if (accessTokenParams !== null) {
      const setUserProfile = async () => {
        try {
          const response = await getUserProfile(accessTokenParams);
          dispatch(
            login({
              accessToken: accessTokenParams,
              user: response,
            })
          );
          history.push('/create-playlist');
        } catch (e) {
          alert(e);
        }
      };
      setUserProfile();
    }
  }, []);

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_CLIENT_ID;  
    
    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${config.RESPONSE_TYPE}&redirect_uri=${config.REDIRECT_URI}&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  };

  return (
    <div className="login-wrapper">
      <p>
        Before using <b>HW Playlist</b>, please login to Spotify here.
      </p>
      <Anchor href={getSpotifyLinkAuthorize()} color="green" radius="md" size="md" uppercase>
        Login
        </Anchor>
    </div>
  );
}
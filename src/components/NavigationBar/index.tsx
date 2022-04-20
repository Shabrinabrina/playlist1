import React from 'react';
import { useAppDispatch } from '../../redux/store';
import { logout } from '../../redux/authSlice';

const NavigationBar: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout: () => void = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>HW Playlist</h1>
      </div>
      <div className="navbar-login">
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
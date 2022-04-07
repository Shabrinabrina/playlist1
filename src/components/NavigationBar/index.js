import { useDispatch } from "react-redux";
import { logout } from "../../utils/authSlice";

export default function NavigationBar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Musify</h1>
      </div>
      <div className="navbar-login">
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
const Track = ({ url, title, artist }) => {
    return (
      <div className="card-playlist">
        <img src={url} alt="Track Playlist" />
        <h3>{title}</h3>
        <p>{artist}</p>
        <button className="btn-primary btn-select">Select</button>
      </div>
    );
  };
  
  export default Track;
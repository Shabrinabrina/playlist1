const Track = ({ url, title, artist }) => {
    return (
      <div className="cardPlaylist">
        <img src={url} alt="Track Playlist" />
        <h3>{title}</h3>
        <p>{artist}</p>
        <button className="btnSelect">Select</button>
      </div>
    );
  };
  
  export default Track;
import React, { useState, useEffect } from "react";
import Video from "./Video";
import db from "./firebase";
import "./App.css";
import axios from "./axios";

function App() {
  const [videos, setVideos] = useState([]);

  // firebase backend:
  // useEffect(() => {
  //   db.collection("videos").onSnapshot((snapshot) =>
  //     setVideos(snapshot.docs.map((doc) => doc.data()))
  //   );
  // }, []);

  //mongo backend:
  useEffect(() => {
    async function fetchPost() {
      const response = await axios.get("/v2/posts");
      setVideos(response.data);

      return response;
    }

    fetchPost();
  }, []);

  return (
    // BEM
    <div className="app">
      <div className="app__videos">
        {videos.map(
          ({ url, channel, description, song, likes, messages, shares }) => (
            <Video
              url={url}
              channel={channel}
              song={song}
              likes={likes}
              messages={messages}
              description={description}
              shares={shares}
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;

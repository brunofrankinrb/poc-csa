import { useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function App() {
  const ref = useRef<AudioPlayer>(null);
  return (
    <div>
      <AudioPlayer
        ref={ref}
        autoPlay={false}
        src="sample.mp3"
        onPlay={(e) => console.log("onPlay", e)}
        onListen={(e) => console.log("onListen", e, ref.current?.audio.current?.currentTime)}
        // other props here
      />
    </div>
  );
}

export default App;

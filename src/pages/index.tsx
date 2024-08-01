import { useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Timeline from '../components/Timeline';

function App() {
  const ref = useRef<AudioPlayer>(null);
  const [currentTime, setCurrentTime] = useState(0);
  return (
    <div>
      <AudioPlayer
        ref={ref}
        autoPlay={false}
        src="sample.mp3"
        onPlay={(e) => console.log("onPlay", e)}
        onListen={() => setCurrentTime(ref.current?.audio.current?.currentTime || 0)}
        listenInterval={100}
        // other props here
      />

      <Timeline currentTime={currentTime} />
    </div>
  );
}

export default App;

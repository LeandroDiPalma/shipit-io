import { Card } from "../components/Card";
import AudioPlayer from "../components/AudioPlayer";
import { useAudio } from "../utils/audioContext";

const Home = () => {
  const { episodes } = useAudio();

  return (
    <div className="px-4 flex flex-col items-center">
      <div>
        <div className="text-lg font-bold my-4">Shipit.io</div>
        {episodes.map(({ name, audio_preview_url, images }, i) => (
          <Card
            key={i}
            className="mb-4"
            name={name}
            preview_url={audio_preview_url}
            image={images[1].url}
          />
        ))}
        <AudioPlayer />
      </div>
    </div>
  );
};

export default Home;

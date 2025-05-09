import scapeMain from "../assets/audio/scapeMain.mp3";
import musicOff from "../assets/images/components/musicOff.png";
import musicOn from "../assets/images/components/musicOn.png";
import { ConfigContext, configType } from "./Configuration";
import { Button } from "@mui/material";
import { useContext, useEffect, useMemo } from "react";

const MusicButton = () => {
  const config: configType = useContext(ConfigContext) as configType;
  const audio = useMemo(() => {
    let audio = document.createElement("audio");
    audio.src = scapeMain;
    return audio;
  }, []);

  const handleClick = () => config.updateUnmuted(); // toggle mute

  const musicButtonStyle = {
    minWidth: 36,
    maxWidth: 36,
    height: 36,
    backgroundImage: `url(${config.unmuted ? musicOn : musicOff})`,
    display: "flex",
  };

  useEffect(() => {
    if (config.unmuted) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [config.unmuted, audio]);

  return <Button sx={musicButtonStyle} onClick={handleClick} />;
};

export default MusicButton;

import { Button } from "@mui/material";
import { useState } from "react";
import musicOn from "../assets/images/components/musicOn.png";
import musicOff from "../assets/images/components/musicOff.png";
import music from "../assets/audio/scapeMain.mp3";

const MusicButton = () => {
  const [unmuted, setUnmuted] = useState(false);
  const [audio] = useState(new Audio(music));
  const handleClick = () => {
    const command = !unmuted;
    if (command){
      audio.play();
    }
    else {
      audio.pause();
      audio.currentTime = 0;
    }
    setUnmuted(command);
  }
  const musicButtonStyle = {
    minWidth: 36,
    maxWidth: 36,
    height: 36,
    backgroundImage: `url(${unmuted ? musicOn : musicOff})`,
    display: "flex",
  }
  return(
    <Button 
      sx={musicButtonStyle}
      onClick={handleClick}
    />
  );
};

export default MusicButton;
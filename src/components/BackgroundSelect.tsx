import arrow from "../assets/images/components/arrow.png";
import { ConfigContext, configType } from "./Configuration";
import { Box, Button } from "@mui/material";
import { useContext } from "react";

const BackgroundSelect = (visibility: { visibility: string }) => {
  const config: configType = useContext(ConfigContext) as configType;

  const leftArrowStyle = {
    backgroundImage: `url(${arrow})`,
    maxWidth: 30,
    minWidth: 30,
    height: 23,
    mx: "0.2rem",
  };
  const rightArrowStyle = {
    ...leftArrowStyle,
    transform: "scaleX(-1)",
  };
  const clickLeftArrow = () => {
    config.updateBackground(true);
  };
  const clickRightArrow = () => {
    config.updateBackground(false);
  };
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      m="0.8rem"
      sx={{ visibility: visibility }}
    >
      <Button sx={leftArrowStyle} onClick={clickLeftArrow} />
      <Button sx={rightArrowStyle} onClick={clickRightArrow} />
    </Box>
  );
};

export default BackgroundSelect;

import largeButton from "../assets/images/components/largeButton.png";
import { Button, Typography } from "@mui/material";

const RefreshButton = () => {
  const largeButtonStyle = {
    width: 147,
    height: 41,
    fontFamily: "RuneScape07Bold",
    backgroundImage: `url(${largeButton})`,
    textTransform: "capitalize",
    color: "#FFFFFF",
    textShadow: "1px 1px #000000",
    display: "block",
    mt: "5rem",
  };

  return (
    <Button
      type="button"
      sx={largeButtonStyle}
      onClick={() => {
        window.location.reload();
      }}
    >
      <Typography
        mt="-0.3rem"
        overflow="hidden"
        sx={{
          fontFamily: "RuneScape07Bold",
          color: "#FFFFFF",
          textShadow: "1px 1px #000000",
        }}
      >
        Demo Complete!
      </Typography>
      <Typography
        mt="-0.4rem"
        fontSize="0.8rem"
        sx={{
          fontFamily: "RuneScape07",
          color: "#FFFFFF",
          textShadow: "1px 1px #000000",
        }}
      >
        Click to refresh
      </Typography>
    </Button>
  );
};

export default RefreshButton;

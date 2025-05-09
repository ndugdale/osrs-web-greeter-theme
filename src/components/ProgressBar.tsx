import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const ProgressBar = () => {
  const [completed, setCompleted] = useState(0);

  const containerStyle = {
    height: 40,
    width: 300,
    backgroundColor: "#000000",
    position: "relative" as const,
    borderStyle: "solid",
    borderWidth: "0.1rem",
    borderColor: "#802019",
  };

  const fillerStyle = {
    m: "0.1rem",
    height: "calc(100% - 0.2rem)",
    width: `calc(${completed}% - 0.2rem)`,
    backgroundColor: "#802019",
    borderRadius: "inherit",
    position: "absolute" as const,
    top: 0,
    left: 0,
  };

  const labelWrapperStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute" as const,
    top: 0,
    left: 0,
  };

  const labelStyle = {
    fontFamily: "RuneScape07Bold",
    color: "#FFFFFF",
    textShadow: "1px 1px #000000",
  };

  useEffect(() => {
    setInterval(() => {
      setCompleted((prev) => Math.min(prev + (100 / 5000) * 100, 100));
    }, 100);
  }, []);

  return (
    <Box sx={{ mt: "4rem" }}>
      <Box sx={containerStyle}>
        <Box sx={fillerStyle} />
        <Box sx={labelWrapperStyle}>
          <Typography
            sx={labelStyle}
          >{`Saving preferences - ${completed}%`}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProgressBar;

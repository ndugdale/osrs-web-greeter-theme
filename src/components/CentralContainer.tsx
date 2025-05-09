import background from "../assets/images/components/loginContainer.png";
import CentralContents from "./CentralContents";
import Box from "@mui/material/Box";

const CentralContainer = ({ error }: { error: boolean }) => {
  return (
    <Box
      sx={{
        width: 360,
        height: 200,
        backgroundImage: `url(${background})`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CentralContents error={error} />
    </Box>
  );
};

export default CentralContainer;

import Box from "@mui/material/Box";
import background from "../assets/images/components/loginContainer.png"
import CentralContents from "./CentralContents";

const CentralContainer = () => {
  
  return(
    <Box sx={{
        width: 360,
        height: 200,
        backgroundImage: `url(${background})`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CentralContents/>
    </Box>
  );
}

export default CentralContainer;
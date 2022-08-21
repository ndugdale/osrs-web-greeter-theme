import { Box } from "@mui/system";
import logo from "../assets/images/components/logo.png"

const Logo = () => {
  return(
    <Box
      sx={{
        width: 448,
        height: 147,
        backgroundImage: `url(${logo})`,
      }}
    />
  );
}

export default Logo;
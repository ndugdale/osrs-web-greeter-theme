import { Box, Stack } from "@mui/material";
import LoginFormContainer from "./LoginFormContainer";
import background from "../assets/images/backgrounds/default.jpg";
import Logo from "./Logo";

const LoginScreen = () => {

  return(
    <>
    <Box sx={{
      width: "100vw",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      }}>
      <Stack sx={{
        width: 765,
        height: 503,
        backgroundImage: `url(${background})`,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        }}
      >
        <Logo/>
        <LoginFormContainer/>
      </Stack>
    </Box>
    </>
  );
}

export default LoginScreen;
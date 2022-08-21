import Box from "@mui/material/Box";
import LoginFormContainer from "./LoginFormContainer";
import background from "../assets/images/backgrounds/default.jpg";

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
      <Box sx={{
        width: 765,
        height: 503,
        backgroundImage: `url(${background})`,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        }}
      >
        <LoginFormContainer/>
      </Box>
    </Box>
    </>
  );
}

export default LoginScreen;
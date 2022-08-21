import Box from "@mui/material/Box";
import background from "../assets/images/components/loginContainer.png"
import LoginForm from "./LoginForm";

const loginFormContainer = () => {
  
  return(
    <Box sx={{
        width: 360,
        height: 200,
        backgroundImage: `url(${background})`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginForm/>
    </Box>
  );
}

export default loginFormContainer;
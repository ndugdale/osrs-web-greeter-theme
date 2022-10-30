import { Form } from "react-final-form";
import { lightdm } from "nody-greeter-types";
import LoginScreen from "./LoginScreen";
import { ConfigContext, configType } from "./Configuration";
import { useContext } from "react";

type formType = {
  user: string;
  password: string;
  session: string;
  rememberUsername: boolean;
  hideUsername: boolean;
}

const FormWrapper = () => {
  const config: configType = useContext(ConfigContext) as configType;
  const wait = async (ms: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), ms);
    })
  }
  const onSubmit = async (values: formType) => {
    config.updateRememberUsername(values.rememberUsername);
    config.updateHideUsername(values.hideUsername);
    config.updateLastUsername(values.rememberUsername ? values.user : "");
    lightdm.cancel_authentication();
    lightdm.authenticate(values.user);
    await wait(100);
    lightdm.respond(values.password);
    await wait(100);
    lightdm.start_session(values.session);
  };
  return(
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => {
        return(
        <form onSubmit={handleSubmit}>
          <LoginScreen/>
        </form>
      )}}
    </Form>
  );
}

export default FormWrapper;
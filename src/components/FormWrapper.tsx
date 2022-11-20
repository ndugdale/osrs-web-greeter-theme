import { Form } from "react-final-form";
import { lightdm } from "nody-greeter-types";
import LoginScreen from "./LoginScreen";
import { ConfigContext, configType } from "./Configuration";
import { useContext, useState } from "react";

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
  };
  const [showProgessBar, setShowProgressBar] = useState(false);
  const [error, setError] = useState(false);
  const onSubmit = async (values: formType) => {
    config.updateRememberUsername(values.rememberUsername);
    config.updateHideUsername(values.hideUsername);
    config.updateLastUsername(values.rememberUsername ? values.user : "");
    if(config.valuesChanged(
        values.rememberUsername,
        values.hideUsername,
        values.user
      )){
      setShowProgressBar(true);
      await wait(5000);
    }else{
    }
    lightdm.cancel_authentication();
    lightdm.authenticate(values.user);
    await wait(100);
    lightdm.respond(values.password);
    await wait(100);
    if(lightdm.is_authenticated){
      lightdm.start_session(values.session);
    } else {
      setError(true);
    };
    
  };
  return(
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => {
        return(
        <form onSubmit={handleSubmit}>
          <LoginScreen showProgressBar={showProgessBar} error={error}/>
        </form>
      )}}
    </Form>
  );
}

export default FormWrapper;
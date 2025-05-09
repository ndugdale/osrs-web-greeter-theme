import { ConfigContext, configType } from "./Configuration";
import LoginScreen from "./LoginScreen";
import { lightdm } from "nody-greeter-types";
import { useContext, useState } from "react";
import { Form } from "react-final-form";

type formType = {
  user: string;
  password: string;
  sessionName: string;
  sessionKey: string;
  rememberUsername: boolean;
  hideUsername: boolean;
};

const FormWrapper = () => {
  const config: configType = useContext(ConfigContext) as configType;
  const wait = async (ms: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), ms);
    });
  };
  const [demoComplete, setDemoComplete] = useState(false);
  const [showProgessBar, setShowProgressBar] = useState(false);
  const [error, setError] = useState(false);
  const onSubmit = async (values: formType) => {
    config.updateRememberUsername(values.rememberUsername);
    config.updateHideUsername(values.hideUsername);
    config.updateLastUsername(values.rememberUsername ? values.user : "");
    if (
      config.valuesChanged(
        values.rememberUsername,
        values.hideUsername,
        values.user,
      )
    ) {
      setShowProgressBar(true);
      await wait(7500);
    }
    if (process.env.REACT_APP_ENV === "dm") {
      lightdm.cancel_authentication();
      if (lightdm.users.map((u) => u.username).includes(values.user)) {
        lightdm.authenticate(values.user);
        await wait(100);
        lightdm.respond(values.password);
        await wait(100);
      }
      if (lightdm.is_authenticated) {
        lightdm.start_session(values.sessionKey);
      } else {
        setShowProgressBar(false);
        setError(true);
      }
    } else {
      setDemoComplete(true);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <LoginScreen
              showProgressBar={showProgessBar}
              error={error}
              demoComplete={demoComplete}
            />
          </form>
        );
      }}
    </Form>
  );
};

export default FormWrapper;

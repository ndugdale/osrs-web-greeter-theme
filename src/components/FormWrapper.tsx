import { Form } from "react-final-form";
import { lightdm } from "nody-greeter-types";
import LoginScreen from "./LoginScreen";
import Configuration from "./Configuration";

type formType = {
  user: string;
  password: string;
  session: string;
}

const FormWrapper = () => {
  const wait = async (ms: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), ms);
    })
  }
  
  const onSubmit = async (values: formType) => {
    lightdm.cancel_authentication();
    lightdm.authenticate(values.user)
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
          <Configuration>
            <LoginScreen/>
          </Configuration>
        </form>
      )}}
    </Form>
  );
}

export default FormWrapper;
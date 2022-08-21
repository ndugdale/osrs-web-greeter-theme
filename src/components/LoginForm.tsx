import { lightdm } from "nody-greeter-types";
import { Field, Form } from "react-final-form"

type formType = {
  user: string;
  password: string;
}

const LoginForm = () => {

  const onSubmit = async (values: formType) => {
    lightdm.cancel_authentication();
    lightdm.authenticate(values.user)
    await wait(100);
    lightdm.respond(values.password);
    await wait(1000);
    lightdm.start_session("bspwm");
  };

  const wait = async (ms: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), ms);
    })
  }

  return(
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <label>Login:</label>
          <Field
            name="user"
            component="input"
            type="text"
          />
          <label>Password:</label>
          <Field
            name="password"
            component="input"
            type="password"
          />
          <button id="submit-button" type="submit">Submit</button>
        </form>
      )}
    />
  );
}

export default LoginForm;
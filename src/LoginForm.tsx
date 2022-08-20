import { lightdm } from "nody-greeter-types";
import { Field, Form } from "react-final-form"
import React from "react";

const LoginForm = () => {

  const onSubmit = (values: any[]) => {
    window.alert(JSON.stringify(values));
  };

  return(
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form action="POST" id="login" onSubmit={handleSubmit}>
          <label>Login:</label>
          <Field
            name="username"
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
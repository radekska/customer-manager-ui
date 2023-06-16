import React, { useState } from "react";
import { FormEvent, SyntheticEvent } from "react";
import { IconButton, Schema } from "rsuite";
import { Form } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";

interface MyFormValues {
  firstName: string;
  lastName: string;
  telephoneNumber: string;
}

const model = Schema.Model({
  firstName: Schema.Types.StringType().isRequired("To pole jest wymagane."),
  lastName: Schema.Types.StringType().isRequired("To pole jest wymagane."),
  telephoneNumber: Schema.Types.NumberType("To pole musi zawierać cyfry.").isRequired("To pole jest wymagane.")
});

const AddCustomer: React.FC = () => {
  const [formValue, setFormValue] = useState<object>({ firstName: "", lastName: "", telephoneNumber: "" });
  const [formError, setFormErrors] = useState<object>({});

  const handleChange = (formValue: object, _?: SyntheticEvent<Element, Event> | undefined) => {
    setFormValue(formValue);
  };

  const handleSubmit = (_: boolean, event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValuesEmpty = Object.values(formValue).filter((value) => value !== "").length === 0;
    const formErrorsFound = Object.keys(formError).length !== 0;
    if (!formValuesEmpty && !formErrorsFound) {
      console.log("wyślij dane");
    }
  };

  const handleFormError = (errors: any) => {
    setFormErrors(errors);
  };

  return (
    <Form
      fluid
      onChange={handleChange}
      onCheck={handleFormError}
      formValue={formValue}
      formError={formError}
      onSubmit={handleSubmit}
      model={model}
    >
      <Form.Group>
        <Form.ControlLabel>Imię</Form.ControlLabel>
        <Form.Control name="firstName" placeholder="Imię" />
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>Nazwisko</Form.ControlLabel>
        <Form.Control name="lastName" placeholder="Nazwisko" />
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>Numer telefonu</Form.ControlLabel>
        <Form.Control name="telephoneNumber" placeholder="Numer telefonu" />
      </Form.Group>
      <Form.Group>
        <IconButton type="submit" appearance="primary" color="green" icon={<PlusIcon />}>
          Dodaj klienta
        </IconButton>
      </Form.Group>
    </Form>
  );
};
export default AddCustomer;

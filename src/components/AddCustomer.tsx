import { SyntheticEvent, useState } from "react";
import { Schema } from "rsuite";
import { Form, Button } from "rsuite";
import { object } from "schema-types";

interface MyFormValues {
  firstName: string;
  lastName: string;
  telephoneNumber: string;
}

const model = Schema.Model({
  firstName: Schema.Types.StringType().isRequired("To pole jest wymagane."),
  lastName: Schema.Types.StringType().isRequired("To pole jest wymagane."),
  telephoneNumber: Schema.Types.StringType().isRequired("To pole jest wymagane."),
});

const AddCustomer: React.FC = () => {
  const [formValue, setFormValue] = useState<object>({ firstName: "", lastName: "", telephoneNumber: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormErrors] = useState<object>({});

  const handleChange = (formValue: object, event?: SyntheticEvent<Element, Event> | undefined) => {
    console.log(formValue, "handleChange");
    setFormValue(formValue);
  };

  const handleSubmit = () => {
    setFormValue(formValue);
    console.log(formValue, "handleSubmit");
    console.log(formError, "hadnleSubmit");
    if (Object.keys(formError).length === 0) {
      return;
    }
  };
  return (
    <Form
      fluid
      onChange={handleChange}
      onError={(data) => setFormErrors(data)}
      formValue={formValue}
      onSubmit={handleSubmit}
      model={model}
    >
      <Form.Group>
        <Form.ControlLabel>Imię</Form.ControlLabel>
        <Form.Control name="firstName" placeholder="Imię" />
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>Nazwisko</Form.ControlLabel>
        <Form.Control name="lastName" errorMessage={errors.lastName} placeholder="Nazwisko" />
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>Numer telefonu</Form.ControlLabel>
        <Form.Control name="telephoneNumber" errorMessage={errors.telephoneNumber} placeholder="Numer telefonu" />
      </Form.Group>
      <Form.Group>
        <Button type="submit" appearance="primary">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};
export default AddCustomer;

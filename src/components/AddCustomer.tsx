import React, { FormEvent, SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "rsuite/Container";
import Content from "rsuite/Content";
import Form from "rsuite/Form";
import Header from "rsuite/Header";
import { addCustomer } from "../redux/reducers/customers";
import { selectAddCustomerStatus } from "../redux/selectors";
import { addCustomerModelForm } from "../validation/schemas";
import { AddButton } from "./AddButton";
import { AddMessageStatus } from "./AddMessageStatus";

const addCustomerTextMessageStatus = {
  success: "Klient został dodany poprawnie.",
  failed: "Wystąpił błąd w dodawaniu klienta.",
  adding: "Trwa dodawanie klienta.",
};

const AddCustomer: React.FC = () => {
  const [formValue, setFormValue] = useState<any>({ firstName: "", lastName: "", telephoneNumber: "" });
  const [formError, setFormErrors] = useState<object>({});
  const dispatch = useDispatch();

  const handleChange = (formValue: object, _?: SyntheticEvent<Element, Event> | undefined) => {
    setFormValue(formValue);
  };
  const handleFormError = (errors: any) => {
    setFormErrors(errors);
  };

  const handleSubmit = (_: boolean, event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValuesEmpty = Object.values(formValue).filter((value) => value !== "").length === 0;
    const formErrorsFound = Object.keys(formError).length !== 0;
    if (!formValuesEmpty && !formErrorsFound) {
      const addCustomerThunk = addCustomer(formValue.firstName, formValue.lastName, formValue.telephoneNumber);

      // @ts-ignore
      dispatch(addCustomerThunk);
      setFormValue({ firstName: "", lastName: "", telephoneNumber: "" });
    }
  };

  return (
    <Container>
      <Header>
        <AddMessageStatus addStatus={useSelector(selectAddCustomerStatus)} message={addCustomerTextMessageStatus} />
      </Header>
      <Content>
        <Form
          fluid
          onChange={handleChange}
          onCheck={handleFormError}
          formValue={formValue}
          formError={formError}
          onSubmit={handleSubmit}
          model={addCustomerModelForm}
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
            <AddButton text="Dodaj klienta" />
          </Form.Group>
        </Form>
      </Content>
    </Container>
  );
};
export default AddCustomer;

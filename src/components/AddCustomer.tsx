import React, { useState } from "react";
import { FormEvent, SyntheticEvent } from "react";
import { IconButton, Schema, Message } from "rsuite";
import { Form } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";
import { addCustomer } from "../redux/reducers/customers";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../redux/reducers/root";
import Container from "rsuite/Container";
import Header from "rsuite/Header";
import Content from "rsuite/Content";
import { AddStatus } from "../enums";

const model = Schema.Model({
  firstName: Schema.Types.StringType().isRequired("To pole jest wymagane."),
  lastName: Schema.Types.StringType().isRequired("To pole jest wymagane."),
  telephoneNumber: Schema.Types.StringType()
    .pattern(/[0-9]+/, "To pole musi zawierać same cyfry.")
    .isRequired("To pole jest wymagane."),
});

const selectAddStatus = (state: State) => state.customers.customerAddStatus;

const AddCustomerStatusMessage = ({ customerAddStatus }: { customerAddStatus: AddStatus }) => {
  if (customerAddStatus === AddStatus.FAILED) {
    return (
      <Message showIcon type="error">
        Wystąpił błąd w dodawaniu klienta.
      </Message>
    );
  }
  if (customerAddStatus === AddStatus.SUCCESS) {
    return (
      <Message showIcon type="success">
        Klient został dodany poprawnie.
      </Message>
    );
  }
  if (customerAddStatus === AddStatus.ADDING) {
    return (
      <Message showIcon type="info">
        Trwa dodawanie klienta.
      </Message>
    );
  }
  return <div></div>;
};

const AddCustomer: React.FC = () => {
  const [formValue, setFormValue] = useState<any>({ firstName: "", lastName: "", telephoneNumber: "" });
  const [formError, setFormErrors] = useState<object>({});
  const dispatch = useDispatch();

  const handleChange = (formValue: object, _?: SyntheticEvent<Element, Event> | undefined) => {
    setFormValue(formValue);
  };

  const handleSubmit = (_: boolean, event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValuesEmpty = Object.values(formValue).filter((value) => value !== "").length === 0;
    const formErrorsFound = Object.keys(formError).length !== 0;
    if (!formValuesEmpty && !formErrorsFound) {
      console.log("wyślij dane");
      console.log(formValue);
      const addCustomerThunk = addCustomer(formValue.firstName, formValue.lastName, formValue.telephoneNumber);

      // @ts-ignore
      dispatch(addCustomerThunk);
      setFormValue({ firstName: "", lastName: "", telephoneNumber: "" });
    }
  };

  const handleFormError = (errors: any) => {
    setFormErrors(errors);
  };

  return (
    <Container>
      <Header>
        <AddCustomerStatusMessage customerAddStatus={useSelector(selectAddStatus)} />
      </Header>
      <Content>
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
      </Content>
    </Container>
  );
};
export default AddCustomer;

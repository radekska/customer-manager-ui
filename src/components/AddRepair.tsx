import React, { FormEvent, SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "rsuite/Container";
import Content from "rsuite/Content";
import Form from "rsuite/Form";
import Header from "rsuite/Header";
import { addRepair } from "../redux/reducers/repairs";
import { selectAddRepairStatus } from "../redux/selectors";
import { addRepairModelForm } from "../validation/schemas";
import { AddButton } from "./AddButton";
import { AddMessageStatus } from "./AddMessageStatus";

const addRepairTextMessageStatus = {
  success: "Wpis został dodany poprawnie.",
  failed: "Wystąpił błąd w dodawaniu wpisu.",
  adding: "Trwa dodawanie wpisu.",
};

const AddRepair: React.FC = () => {
  const customerId = useParams().id!;
  const defaultFormValues = {
    description: "",
    cost: 0.0,
    reportedAt: "",
  };
  const [formValue, setFormValue] = useState<any>(defaultFormValues);
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
    const formValuesNotEmpty = Object.values(formValue).filter((value) => value === "").length === 0;
    const formErrorsFound = Object.keys(formError).length !== 0;
    if (formValuesNotEmpty && !formErrorsFound) {
      const addRepairThunk = addRepair(customerId, formValue.description, formValue.cost, formValue.reportedAt);

      // @ts-ignore
      dispatch(addRepairThunk);
      setFormValue(defaultFormValues);
    }
  };

  return (
    <Container>
      <Header>
        <AddMessageStatus addStatus={useSelector(selectAddRepairStatus)} message={addRepairTextMessageStatus} />
      </Header>
      <Content>
        <Form
          fluid
          onChange={handleChange}
          onCheck={handleFormError}
          formValue={formValue}
          formError={formError}
          onSubmit={handleSubmit}
          model={addRepairModelForm}
        >
          <Form.Group>
            <Form.ControlLabel>Opis</Form.ControlLabel>
            <Form.Control name="description" placeholder="Opis" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Koszt</Form.ControlLabel>
            <Form.Control name="cost" placeholder="Koszt" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Data zgłoszenia</Form.ControlLabel>
            <Form.Control type="date" name="reportedAt" placeholder="Data zgłoszenia" />
          </Form.Group>
          <Form.Group>
            <AddButton text="Dodaj wpis" />
          </Form.Group>
        </Form>
      </Content>
    </Container>
  );
};
export default AddRepair;

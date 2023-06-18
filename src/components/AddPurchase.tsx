import React, { FormEvent, SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "rsuite/Container";
import Content from "rsuite/Content";
import Form from "rsuite/Form";
import Header from "rsuite/Header";
import { addPurchase } from "../redux/reducers/purchases";
import { selectAddPurchaseStatus } from "../redux/selectors";
import { addPurchaseModelForm } from "../validation/schemas";
import { AddButton } from "./AddButton";
import { AddMessageStatus } from "./AddMessageStatus";

const addPurchaseTextMessageStatus = {
  success: "Zakup został dodany poprawnie.",
  failed: "Wystąpił błąd w dodawaniu zakupu.",
  adding: "Trwa dodawanie zakupu.",
};

const AddPurchase: React.FC = () => {
  const customerId = useParams().id!;
  const defaultFormValues = {
    frameModel: "",
    lensPower: "",
    pd: "",
    lensType: "",
    purchaseType: "",
    purchasedAt: "",
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
      const addPurchaseThunk = addPurchase(
        customerId,
        formValue.frameModel,
        formValue.lensPower,
        formValue.lensType,
        formValue.pd,
        formValue.purchaseType,
        formValue.purchasedAt
      );

      // @ts-ignore
      dispatch(addPurchaseThunk);
      setFormValue(defaultFormValues);
    }
  };

  return (
    <Container>
      <Header>
        <AddMessageStatus addStatus={useSelector(selectAddPurchaseStatus)} message={addPurchaseTextMessageStatus} />
      </Header>
      <Content>
        <Form
          fluid
          onChange={handleChange}
          onCheck={handleFormError}
          formValue={formValue}
          formError={formError}
          onSubmit={handleSubmit}
          model={addPurchaseModelForm}
        >
          <Form.Group className="mb-3">
            <Form.ControlLabel>Model oprawki</Form.ControlLabel>
            <Form.Control name="frameModel" placeholder="Model oprawki" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.ControlLabel>Moce soczewek</Form.ControlLabel>
            <Form.Control name="lensPower" placeholder="Moce soczewek" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.ControlLabel>PD</Form.ControlLabel>
            <Form.Control name="pd" placeholder="PD" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.ControlLabel>Typ soczewek</Form.ControlLabel>
            <Form.Control name="lensType" placeholder="Typ soczewek" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.ControlLabel>Rodzaj zakupu</Form.ControlLabel>
            <Form.Control name="purchaseType" placeholder="Rodzaj zakupu" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.ControlLabel>Data zakupu</Form.ControlLabel>
            <Form.Control name="purchasedAt" type="date" placeholder="Data zakupu" />
          </Form.Group>
          <Form.Group>
            <AddButton text="Dodaj zakup" />
          </Form.Group>
        </Form>
      </Content>
    </Container>
  );
};

export default AddPurchase;

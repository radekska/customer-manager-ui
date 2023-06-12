import { State } from "../redux/reducers/root";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRepair } from "../redux/reducers/repairs";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { Card, Container, Form } from "react-bootstrap";
import { AddStatus } from "../enums";

const selectAddStatus = (state: State) => state.repairs.repairAddStatus;

const AddRepair: React.FC = () => {
  const customerId = useParams().id!;

  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const costInputRef = useRef<HTMLInputElement>(null);
  const reportedAtInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const clearInputFields = () => {
    descriptionInputRef.current!.value = "";
    costInputRef.current!.value = "";
    reportedAtInputRef.current!.value = "";
  };

  const addRepairHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO - input validation
    const description = descriptionInputRef.current!.value;
    const cost = Number(costInputRef.current!.value);
    const reportedAt = reportedAtInputRef.current!.value;

    const addRepairThunk = addRepair(customerId, description, cost, reportedAt);

    // @ts-ignore
    dispatch(addRepairThunk);
    clearInputFields();
  };

  const addStatus = useSelector(selectAddStatus);
  const showErrorLabel = () => {
    if (addStatus === AddStatus.FAILED) {
      return (
        <Alert key="danger" severity="error">
          Wystąpił błąd w dodawaniu wpisu
        </Alert>
      );
    }
  };
  const showSuccessfulLabel = () => {
    if (addStatus === AddStatus.SUCCESS) {
      return (
        <Alert key="success" severity="success">
          Wpis został dodany poprawnie
        </Alert>
      );
    }
  };
  return (
    <Container>
      <Card>
        {showErrorLabel()}
        {showSuccessfulLabel()}
        <Card.Header>Dodaj nowy zakup</Card.Header>
        <Form onSubmit={addRepairHandler}>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Opis</Form.Label>
              <Form.Control type="text" placeholder="Opis" ref={descriptionInputRef} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Koszt</Form.Label>
              <Form.Control type="text" placeholder="Koszt" ref={costInputRef} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data zakupu</Form.Label>
              <Form.Control type="date" placeholder="Data zakupu" ref={reportedAtInputRef} />
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <button type="submit" className="btn btn-primary">
              Dodaj wpis
            </button>
          </Card.Footer>
        </Form>
      </Card>
    </Container>
  );
};

export default AddRepair;

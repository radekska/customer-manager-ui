import React from "react";
import { Card, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DeleteCustomer from "./DeleteCustomer";
import { useSelector } from "react-redux";
import { State } from "../redux/reducers/root";
import PurchasesTable from "./PurchasesTable";
import Alert from "@mui/material/Alert";
import RepairsTable from "./RepairsTable";

function selectCustomerById(customerId: string) {
  return (state: State) =>
    state.customers.entities.find((customer) => customer.id === customerId);
}

const CustomerDetails: React.FC = () => {
  const customerId = useParams().id!;
  const customer = useSelector(selectCustomerById(customerId));

  if (typeof customer === "undefined") {
    return (
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>
              <Alert severity="warning">Klient nieznaleziony</Alert>
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>Dane Klienta</Card.Title>
          <Card.Text>Imię: {customer.first_name}</Card.Text>
          <Card.Text>Nazwisko: {customer.last_name}</Card.Text>
          <Card.Text>Numer telefonu: {customer.telephone_number}</Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Title>Zakupy</Card.Title>
          <PurchasesTable />
          <Card.Title>Reklamacje i Naprawy</Card.Title>
          <RepairsTable />
        </Card.Body>
        <Card.Footer>
          <DeleteCustomer />
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CustomerDetails;

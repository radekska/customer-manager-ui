import Alert from "@mui/material/Alert";
import React from "react";
import { Card, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { State } from "../redux/reducers/root";
import AddPurchaseButton from "./AddPurchaseButton";
import AddRepairButton from "./AddRepairButton";
import DeleteCustomer from "./DeleteCustomer";
import PurchasesTable from "./PurchasesTable";
import RepairsTable from "./RepairsTable";

function selectCustomerById(customerId: string) {
  return (state: State) => state.customers.entities.find((customer) => customer.id === customerId);
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
        <Card>
          <Card.Header>Dane Klienta</Card.Header>
          <Card.Body>
            <Card.Text>Imię: {customer.first_name}</Card.Text>
            <Card.Text>Nazwisko: {customer.last_name}</Card.Text>
            <Card.Text>Numer telefonu: {customer.telephone_number}</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Zakupy</Card.Header>
          <Card.Body>
            <PurchasesTable />
          </Card.Body>
          <Card.Footer>
            <AddPurchaseButton customerId={customerId} />
          </Card.Footer>
        </Card>
        <Card>
          <Card.Header>Reklamacje i Naprawy</Card.Header>
          <Card.Body>
            <RepairsTable />
          </Card.Body>
          <Card.Footer>
            <AddRepairButton customerId={customerId} />
          </Card.Footer>
        </Card>

        <Card.Footer>
          <DeleteCustomer />
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CustomerDetails;

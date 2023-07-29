import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Card, Container, Navbar, Row } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import AddCustomer from "./components/AddCustomer";
import AddPurchase from "./components/AddPurchase";
import AddRepair from "./components/AddRepair";
import CustomerDetails from "./components/CustomerDetails";
import CustomersList from "./components/CustomersList";

const App: React.FC = () => {
  return (
    <Container fluid={true}>
      <Card>
        <Card.Header>
          <Row>
            <Navbar>
              <Link to="/">
                <Navbar.Brand>Panel Klientów</Navbar.Brand>
              </Link>
            </Navbar>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            <Routes>
              <Route
                path="/"
                element={
                  <Container>
                    <Row>
                      <CustomersList />
                    </Row>
                  </Container>
                }
              ></Route>
              <Route
                path="/customers/:id"
                element={
                  <Container>
                    <Row>
                      <CustomersList />
                      <CustomerDetails />
                    </Row>
                  </Container>
                }
              ></Route>
              <Route path="/customer/add" element={<AddCustomer />}></Route>
              <Route path="/customers/:id/purchase/add" element={<AddPurchase />}></Route>
              <Route path="/customers/:id/repair/add" element={<AddRepair />}></Route>
            </Routes>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite.min.css';
import React from "react";
import {Link, Route, Routes} from "react-router-dom";
import {Card, Container, Navbar, Row} from "react-bootstrap";
import CustomersList from "./components/CustomersList";
import CustomerDetails from "./components/CustomerDetails";
import AddCustomer from "./components/AddCustomer";
import AddPurchase from "./components/AddPurchase";

const App: React.FC = () => {
    return (
        <Container>
            <Row>
                <Navbar>
                    <Link to="/"><Navbar.Brand>Panel Klientów</Navbar.Brand></Link>
                </Navbar>
            </Row>
            <Card>
                <Card.Body>
                    <Row>
                        <Routes>
                            <Route path="/"
                                   element={<Container><Row><CustomersList/></Row></Container>}></Route>
                            <Route path="/customers/:id"
                                   element={
                                       <Container><Row><CustomersList/><CustomerDetails/></Row></Container>}></Route>
                            <Route path="/customer/add" element={<AddCustomer/>}></Route>
                            <Route path="/customers/:id/purchase/add" element={<AddPurchase/>}></Route>
                        </Routes>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}


export default App;

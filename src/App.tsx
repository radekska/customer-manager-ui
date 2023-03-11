import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {Link, Route, Routes} from "react-router-dom";
import {Button, Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import CustomersList from "./components/CustomersList";
import CustomerDetails from "./components/CustomerDetails";
import AddCustomer from "./components/AddCustomer";

const App: React.FC = () => {

    return (
        <Container>
            <Row>
                <Navbar>
                    <Link to="/"><Navbar.Brand>Menadżer Klientów</Navbar.Brand></Link>
                </Navbar>
            </Row>
            <Row>
                <Routes>
                    <Route path="/"
                           element={<Container><Row><CustomersList/></Row></Container>}></Route>
                    <Route path="/customers/:id"
                           element={<Container><Row><CustomersList/><CustomerDetails/></Row></Container>}></Route>
                    <Route path="/customer/add" element={<AddCustomer/>}></Route>
                </Routes>
            </Row>
        </Container>
    );
}


export default App;
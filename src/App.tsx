import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {Container, Navbar, Row} from "react-bootstrap";
import CustomersList from "./components/CustomersList";
import CustomerDetails from "./components/CustomerDetails";
import AddCustomer from "./components/AddCustomer";

const App: React.FC = () => {
    const [customerDeleted, setCustomerDeleted] = useState(false)

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
                           element={<Container><Row><CustomersList setCustomerDeleted={setCustomerDeleted}
                                                                   customerDeleted={customerDeleted}/></Row></Container>}></Route>
                    <Route path="/customers/:id"
                           element={<Container><Row><CustomersList setCustomerDeleted={setCustomerDeleted}
                                                                   customerDeleted={customerDeleted}/><CustomerDetails
                               setCustomerDeleted={setCustomerDeleted}/></Row></Container>}></Route>
                    <Route path="/customer/add" element={<AddCustomer/>}></Route>
                </Routes>
            </Row>
        </Container>
    );
}


export default App;
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "react-bootstrap";
import CustomersList from "./components/CustomersList";
import CustomerDetails from "./components/CustomerDetails";

const customers = [
    {
        "id": "d59c5c30-4e57-4f72-90fc-c73d6f85191a",
        "first_name": "John",
        "last_name": "Doe",
        "telephone_number": "1234567"
    },
    {
        "id": "d59c5c90-4e57-4f72-90fc-c73d6f85191a",
        "first_name": "Toe",
        "last_name": "Bob",
        "telephone_number": "636354636"
    },
    {
        "id": "d59c5c91-4e57-4f72-90fc-c73d6f85191a",
        "first_name": "Jane",
        "last_name": "Doe",
        "telephone_number": "34141341"
    }
]

const App: React.FC = () => {

    return (
        <div>
            <h1 className="text-center">Menadżer Klientów</h1>
            <Routes>
                <Route path="/"
                       element={<Container><Row><CustomersList customers={customers}/></Row></Container>}></Route>
                <Route path="/customers/:id"
                       element={<Container><Row><CustomersList customers={customers}/><CustomerDetails
                           customers={customers}/></Row></Container>}></Route>
            </Routes>
        </div>
    );
}


export default App;
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "react-bootstrap";
import CustomersList from "./components/CustomersList";
import CustomerDetails from "./components/CustomerDetails";

const App: React.FC = () => {

    return (
        <div>
            <h1 className="text-center">Menadżer Klientów</h1>
            <Routes>
                <Route path="/"
                       element={<Container><Row><CustomersList/></Row></Container>}></Route>
                <Route path="/customers/:id"
                       element={<Container><Row><CustomersList/><CustomerDetails/></Row></Container>}></Route>
            </Routes>
        </div>
    );
}


export default App;
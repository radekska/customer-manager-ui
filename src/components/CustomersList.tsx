import React, {useEffect, useState} from "react";
import {Col, Form, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Customer} from "../models/customer";
import axios from "axios";


const CustomersList: React.FC = () => {
    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
    }

    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/customers').then(
            response => setCustomers(response.data)
        )
    },[true]);


    return (
        <Col md="auto">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Znajdź Klienta</Form.Label>
                    <Form.Control type="attributes" placeholder="imię, nazwisko"/>
                </Form.Group>
            </Form>
            <ListGroup>
                {customers.map(customer =>
                    <Link to={`/customers/${customer.id}`} key={customer.id}>
                        <ListGroup.Item action>{customer.first_name} {customer.last_name}
                        </ListGroup.Item>
                    </Link>
                )}
            </ListGroup>
        </Col>
    );
}

export default CustomersList;
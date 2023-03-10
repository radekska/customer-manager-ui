import React from "react";
import {Col, Form, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Customer} from "../models/customer";

interface CustomerListProps {
    customers: Customer[]
}

const CustomersList: React.FC<CustomerListProps> = (props) => {
    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
    }


    return (
        <Col md="auto">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Znajdź Klienta</Form.Label>
                    <Form.Control type="attributes" placeholder="imię, nazwisko"/>
                </Form.Group>
            </Form>
            <ListGroup>
                {props.customers.map(customer =>
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
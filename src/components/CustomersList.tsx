import React from "react";
import {Form, ListGroup} from "react-bootstrap";

interface Customer {
    id: string,
    first_name: string,
    last_name: string,
    telephone_number: string
}

interface CustomerListProps {
    customers: Customer[]
}

const CustomersList: React.FC<CustomerListProps> = (props) => {
    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
    }


    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Znajdź Klienta</Form.Label>
                    <Form.Control type="attributes" placeholder="imię, nazwisko"/>
                </Form.Group>
            </Form>
            <ListGroup>
                {props.customers.map(customer =>
                    <ListGroup.Item action key={customer.id}>{customer.first_name} {customer.last_name}</ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
}

export default CustomersList;
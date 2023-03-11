import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Button, Col, Form, ListGroup, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Customer} from "../models/customer";
import axios from "axios";

interface CustomersListProps {
    customerDeleted: boolean
    setCustomerDeleted: Dispatch<SetStateAction<boolean>>

}


const CustomersList: React.FC<CustomersListProps> = (props) => {
    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
    }

    const [customers, setCustomers] = useState<Customer[]>([]);
    const setCustomerDeleted = props.setCustomerDeleted
    let customerDeleted = props.customerDeleted

    useEffect(() => {
        axios.get('http://localhost:8080/api/customers').then(
            response => setCustomers(response.data)
        )
        setCustomerDeleted(false)
    }, [setCustomerDeleted, customerDeleted]);


    return (
        <Col md="auto">
            <Stack gap={3}>
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

                <Link to="/customer/add"><Button variant="success">Dodaj klienta</Button></Link>
            </Stack>
        </Col>
    );
}

export default CustomersList;
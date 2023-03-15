import React from "react";
import {Button, Col, Form, ListGroup, Spinner, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {CustomerListStatus, State} from "../reducers/root";


const selectCustomers = (state: State) => state.customers.entities
const selectListStatus = (state: State) => state.customers.customerListStatus


const CustomersList: React.FC = () => {
    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
    }


    const customers = useSelector(selectCustomers)
    const listStatus = useSelector(selectListStatus)


    function renderLoader() {
        if (listStatus === CustomerListStatus.LOADING) {
            return <Spinner animation="border" className="list-customers-loading-spinner"/>
        }
    }


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
                    {renderLoader()}
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
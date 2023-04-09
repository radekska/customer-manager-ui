import React from "react";
import {Card, Col, Form, ListGroup, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button";
import {State} from "../redux/reducers/root";
import {CustomerListStatus, listCustomers} from "../redux/reducers/customers";
import {CircularProgress} from "@mui/material";


const selectCustomers = (state: State) => state.customers.entities
const selectListStatus = (state: State) => state.customers.customerListStatus


const CustomersList: React.FC = () => {
    const dispatch = useDispatch()

    const getCustomersListHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const customerQuery = event.target.value!.split(" ")
        const firstName = customerQuery[0] !== undefined ? customerQuery[0] : ""
        const lastName = customerQuery[1] !== undefined ? customerQuery[1] : ""
        const listCustomersThunk = listCustomers(firstName, lastName)

        // @ts-ignore
        dispatch(listCustomersThunk)
    }


    const customers = useSelector(selectCustomers)
    const listStatus = useSelector(selectListStatus)


    function renderLoader() {
        if (listStatus === CustomerListStatus.LOADING) {
            return <CircularProgress className="list-customers-loading-spinner"/>
        }
    }


    return (
        <Col md="auto">
            <Card>
                <Card.Body>
                    <Stack gap={3}>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Znajdź Klienta</Form.Label>
                                <Form.Control onChange={getCustomersListHandler} type="attributes" placeholder="imię, nazwisko"/>
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
                    </Stack>
                </Card.Body>
                <Card.Footer>
                    <Link to="/customer/add"><Button variant="contained" color="success">Dodaj
                        klienta</Button></Link>
                </Card.Footer>
            </Card>
        </Col>
    );
}

export default CustomersList;
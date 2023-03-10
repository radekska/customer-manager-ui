import React from "react";
import {Button, Card} from "react-bootstrap";
import {Customer} from "../models/customer";
import {useDispatch} from "react-redux";

interface CustomerDetailsProps {
    customer: Customer
}

const CustomerDetails: React.FC<CustomerDetailsProps> = (props) => {

    return (
        <Card>
            <Card.Body>
                <Card.Title>{props.customer.first_name} {props.customer.last_name}</Card.Title>
                <Card.Text>
                    Telephone number: {props.customer.telephone_number}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>

    )
}

export default CustomerDetails
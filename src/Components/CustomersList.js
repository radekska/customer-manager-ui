import Stack from 'react-bootstrap/Stack';
import {Form} from "react-bootstrap";
import {Link} from "react-router-dom";

function CustomersList(props) {
    function handleSubmit(event) {
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
            <Stack gap={0}>
                {props.customers.map(customer => <Link to={`/customers/${customer.id}`}>
                    <div key={customer.id} className="bg-light border">{customer.first_name}</div>
                </Link>)}
            </Stack>
        </div>
    );
}

export default CustomersList;
import {Col, Container, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomersList from "./CustomersList";
import CustomerDetails from "./CustomerDetails";

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
        "telephone_number": "1234567"
    },
    {
        "id": "d59c5c91-4e57-4f72-90fc-c73d6f85191a",
        "first_name": "Jane",
        "last_name": "Doe",
        "telephone_number": "1234567"
    }
]

function App() {
    return (
        <div>
            <h1 className="text-center">Menadżer Klientów</h1>
            <Container>
                <Row >
                    <Col md="auto"><CustomersList customers={customers}/></Col>
                    <Col><CustomerDetails customers={customers}/></Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;

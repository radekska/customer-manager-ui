import React, {useRef, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import {Alert, Container} from "react-bootstrap";

const AddCustomer: React.FC = () => {
    const [showSuccessfulLabel, setShowSuccessfulLabel] = useState(false)
    const [showErrorLabel, setShowErrorLabel] = useState(false)

    const firstNameInputRef = useRef<HTMLInputElement>(null)
    const lastNameInputRef = useRef<HTMLInputElement>(null)
    const telephoneNumberInputRef = useRef<HTMLInputElement>(null)

    const clearInputFields = () => {
        firstNameInputRef.current!.value = ""
        lastNameInputRef.current!.value = ""
        telephoneNumberInputRef.current!.value = ""
    }

    const addCustomerHandler = (event: React.FormEvent) => {
        event.preventDefault()
        // TODO - input validation
        const firstName = firstNameInputRef.current!.value
        const lastName = lastNameInputRef.current!.value
        const telephoneNumber = telephoneNumberInputRef.current!.value

        axios.post("http://localhost:8080/api/customers", {
            first_name: firstName,
            last_name: lastName,
            telephone_number: telephoneNumber
        }).then(() => {
            setShowSuccessfulLabel(true);
            setShowErrorLabel(false);
            clearInputFields();

        }).catch(err => {
            setShowErrorLabel(true);
            setShowSuccessfulLabel(false)
        })
        // TODO - error handling

    }


    return (
        <Container>
            {showSuccessfulLabel && <Alert key="success" variant="success">Klient został dodany poprawnie</Alert>}
            {showErrorLabel && <Alert key="danger" variant="danger">Wystąpił błąd w dodawaniu klienta</Alert>}
            <Form onSubmit={addCustomerHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Imię</Form.Label>
                    <Form.Control type="text" placeholder="Imię" id="firstName" ref={firstNameInputRef}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Nazwisko</Form.Label>
                    <Form.Control type="text" placeholder="Nazwisko" id="lastName" ref={lastNameInputRef}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Numer telefonu</Form.Label>
                    <Form.Control type="text" placeholder="Numer telefonu" id="telephoneNumer"
                                  ref={telephoneNumberInputRef}/>
                </Form.Group>
                <Button variant="success" type="submit">
                    Dodaj
                </Button>
            </Form>
        </Container>
    );
}

export default AddCustomer
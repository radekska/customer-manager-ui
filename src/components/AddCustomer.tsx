import React, {useRef} from "react";
import Form from 'react-bootstrap/Form';
import {Container} from "react-bootstrap";
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button';
import {addCustomer, CustomerAddStatus, State} from "../reducers/root";
import {useDispatch, useSelector} from "react-redux";
import Card from "@mui/material/Card";
import {CardContent} from "@mui/material";

const selectAddStatus = (state: State) => state.customers.customerAddStatus

const AddCustomer: React.FC = () => {

    const firstNameInputRef = useRef<HTMLInputElement>(null)
    const lastNameInputRef = useRef<HTMLInputElement>(null)
    const telephoneNumberInputRef = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch()
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

        const addCustomerThunk = addCustomer(firstName, lastName, telephoneNumber)
        // @ts-ignore
        dispatch(addCustomerThunk)
        clearInputFields()
    }

    const addStatus = useSelector(selectAddStatus)
    const showErrorLabel = () => {
        if (addStatus === CustomerAddStatus.FAILED) {
            return <Alert key="danger" severity="error">Wystąpił błąd w dodawaniu klienta</Alert>
        }
    }
    const showSuccessfulLabel = () => {
        if (addStatus === CustomerAddStatus.SUCCESS) {
            return <Alert key="success" severity="success">Klient został dodany poprawnie</Alert>
        }
    }


    return (
        <Container>
            {showErrorLabel()}
            {showSuccessfulLabel()}
            <Card>
                <CardContent>
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
                        <Button variant="contained" color="success" size="medium" type="submit">
                            Dodaj
                        </Button>
                    </Form>
                </CardContent>
            </Card>
        </Container>
    );
}

export default AddCustomer
import {State} from "../redux/reducers/root";
import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addPurchase} from "../redux/reducers/purchases";
import {useParams} from "react-router-dom";
import {AddStatus} from "../redux/reducers/customers";
import Alert from "@mui/material/Alert";
import {Card, Container, Form } from "react-bootstrap";

const selectAddStatus = (state: State) => state.purchases.purchaseAddStatus

const AddPurchase: React.FC = () => {
    const customerId = useParams().id!

    const frameModelInputRef = useRef<HTMLInputElement>(null)
    const lensPowerInputRef = useRef<HTMLInputElement>(null)
    const pdInputRef = useRef<HTMLInputElement>(null)
    const lensTypeInputRef = useRef<HTMLInputElement>(null)
    const purchaseTypeInputRef = useRef<HTMLInputElement>(null)
    const purchasedAtInputRef = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch()

    const clearInputFields = () => {
        frameModelInputRef.current!.value = ""
        lensPowerInputRef.current!.value = ""
        pdInputRef.current!.value = ""
        lensTypeInputRef.current!.value = ""
        purchaseTypeInputRef.current!.value = ""
        purchasedAtInputRef.current!.value = ""
    }


    const addPurchaseHandler = (event: React.FormEvent) => {
        event.preventDefault()
        // TODO - input validation
        const frameModel = frameModelInputRef.current!.value
        const lensPower = lensPowerInputRef.current!.value
        const pd = pdInputRef.current!.value
        const lensType = lensTypeInputRef.current!.value
        const purchaseType = purchaseTypeInputRef.current!.value
        const purchasedAt = purchasedAtInputRef.current!.value


        const addPurchaseThunk = addPurchase(customerId, frameModel, lensPower, pd, lensType, purchaseType, purchasedAt)

        // @ts-ignore
        dispatch(addPurchaseThunk)
        // clearInputFields()

    }

    const addStatus = useSelector(selectAddStatus)
    const showErrorLabel = () => {
        if (addStatus === AddStatus.FAILED) {
            return <Alert key="danger" severity="error">Wystąpił błąd w dodawaniu zakupu</Alert>
        }
    }
    const showSuccessfulLabel = () => {
        if (addStatus === AddStatus.SUCCESS) {
            return <Alert key="success" severity="success">Zakup został dodany poprawnie</Alert>
        }
    }
    return (
        <Container>
            <Card>
                {showErrorLabel()}
                {showSuccessfulLabel()}
                <Card.Header>Dodaj nowy zakup</Card.Header>
                <Form onSubmit={addPurchaseHandler}>
                    <Card.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Model oprawki</Form.Label>
                            <Form.Control type="text" placeholder="Model oprawki" ref={frameModelInputRef}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Moce soczewek</Form.Label>
                            <Form.Control type="text" placeholder="Moce soczewek" ref={lensPowerInputRef}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>PD</Form.Label>
                            <Form.Control type="text" placeholder="PD" ref={pdInputRef}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Typ soczewek</Form.Label>
                            <Form.Control type="text" placeholder="Typ soczewek" ref={lensTypeInputRef}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Rodzaj zakupu</Form.Label>
                            <Form.Control type="text" placeholder="Rodzaj zakupu" ref={purchaseTypeInputRef}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Data zakupu</Form.Label>
                            <Form.Control type="date" placeholder="Data zakupu" ref={purchasedAtInputRef}/>
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                        <button type="submit" className="btn btn-primary">Dodaj zakup</button>
                    </Card.Footer>
                </Form>
            </Card>
        </Container>
    )
}


export default AddPurchase
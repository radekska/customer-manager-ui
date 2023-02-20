import {useParams} from "react-router-dom";

function CustomerDetails(props) {
    const customerID = useParams().id
    const customer = props.customers.find(customer => customer.id === customerID)

    return <div>
        <p>Informacje o Kliencie: {customerID}</p>
        <p>Imię i Nazwisko: {customer.first_name} {customer.last_name}</p>
        <p>Numer Telefonu: {customer.telephone_number}</p>
    </div>
}

export default CustomerDetails
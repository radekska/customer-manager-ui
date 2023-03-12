import axios from "axios";

interface Customer {
    id: string
    first_name: string
    last_name: string
    telephone_number: string
    created_at: string
    updated_at: string
}

const initialState = {
    customers: []
}

export async function listCustomers(dispatch: any, getState: any) {
    // FIXME what if request go wrong?
    const response = await axios.get<Customer[]>('http://localhost:8080/api/customers')
    dispatch({type: "customers/customersLoaded", payload: response.data})
}

export function addCustomer(firstName: string, lastName: string, telephoneNumber: string) {
    return async function addCustomerThunk(dispatch: any, getState: any) {
        // FIXME what if request go wrong?
        const response = await axios.post<Customer>("http://localhost:8080/api/customers", {
            first_name: firstName,
            last_name: lastName,
            telephone_number: telephoneNumber
        })
        dispatch({
            type: "customers/customerAdded",
            payload: response.data
        })
    }
}

export function deleteCustomer(customerId: string) {
    return async function deleteCustomerThunk(dispatch: any, getState: any) {
        // FIXME what if request go wrong?
        await axios.delete(`http://localhost:8080/api/customers/${customerId}`)
        dispatch({
            type: "customers/customerDeleted",
            payload: customerId
        })
    }
}


export default function rootReducer(state = initialState, action: any) {
    switch (action.type) {
        case "customers/customersLoaded":
            console.log(state, action)
            return {
                ...state,
                customers: action.payload
            }
        case "customers/customerAdded":
            console.log(state, action)
            return {
                ...state,
                customers: [
                    ...state.customers,
                    {
                        id: action.payload.id,
                        first_name: action.payload.first_name,
                        last_name: action.payload.last_name,
                        telephone_number: action.payload.telephone_number
                    }
                ]
            }
        case "customers/customerDeleted":
            console.log(state, action)
            return state
        default:
            return state
    }
}
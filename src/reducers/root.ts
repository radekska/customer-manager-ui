import axios from "axios";

const initialState = {
    customers: []
}

export async function listCustomers(dispatch: any, getState: any) {
    const response = await axios.get('http://localhost:8080/api/customers')
    dispatch({type: "customers/customersLoaded", payload: response.data})
}

export function addCustomer(firstName: string, lastName: string, telephoneNumber: string) {
    return async function addCustomerThunk(dispatch: any, getState: any) {
        await axios.post("http://localhost:8080/api/customers", {
            // FIXME right now I'm not getting back new customer ID which is really important
            first_name: firstName,
            last_name: lastName,
            telephone_number: telephoneNumber
        })
        dispatch({
            type: "customers/customerAdded",
            payload: {firstName: firstName, lastName: lastName, telephoneNumber: telephoneNumber}
        })
    }
}

export default function rootReducer(state = initialState, action: any) {
    // The reducer normally looks at the action type field to decide what happens
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
                        id: "12313", // FIXME
                        first_name: action.payload.firstName,
                        last_name: action.payload.lastName,
                        telephone_number: action.payload.telephoneNumber
                    }
                ]
            }
        default:
            return state
    }
}
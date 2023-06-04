import axios from "axios";
import {Customer} from "../../models/customer";

// const domain = window.location.origin
const domain = "http://localhost"

export function listCustomers(firstName: string = "", lastName: string = "") {
    return async function listCustomersThunk(dispatch: any, getState: any) {
        dispatch({type: "customers/customersLoading"})
        axios.get<Customer[]>(`${domain}/api/customers?firstName=${firstName}&lastName=${lastName}`).then(response => dispatch({
            type: "customers/customersLoaded",
            payload: response.data
        })).catch((error) => dispatch({
            type: "customers/customersLoadingFailed",
            payload: error
        }))
    }
}

export function addCustomer(firstName: string, lastName: string, telephoneNumber: string) {
    return async function addCustomerThunk(dispatch: any, getState: any) {
        dispatch({type: "customers/customerAdding"})
        axios.post<Customer>(`${domain}/api/customers`, {
            first_name: firstName,
            last_name: lastName,
            telephone_number: telephoneNumber
        }).then(response => {
            dispatch({
                type: "customers/customerAddingSuccess",
                payload: response.data
            })
            setTimeout(() => dispatch({
                type: "customers/customerAddIdle",
            }), 5000)
        }).catch(() => {
            dispatch({
                type: "customers/customerAddingFailed"
            })
            setTimeout(() => dispatch({
                type: "customers/customerAddIdle",
            }), 5000)
        })

    }
}

export function deleteCustomer(customerId: string) {
    return async function deleteCustomerThunk(dispatch: any, getState: any) {
        // FIXME what if request go wrong?
        await axios.delete(`${domain}/api/customers/${customerId}`)
        dispatch({
            type: "customers/customerDeleted",
            payload: customerId
        })
    }
}

export enum AddStatus {
    IDLE = "idle",
    ADDING = "adding",
    SUCCESS = "success",
    FAILED = "failed",
}

export enum DeleteStatus {
    IDLE = "idle",
    DELETING = "deleting",
    SUCCESS = "success",
    FAILED = "failed",
}

export enum CustomerListStatus {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed",
}

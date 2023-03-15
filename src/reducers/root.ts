import axios from "axios";

interface Customer {
    id: string
    first_name: string
    last_name: string
    telephone_number: string
    created_at: string
    updated_at: string
}

export enum CustomerAddStatus {
    IDLE = "idle",
    ADDING = "adding",
    SUCCESS = "success",
    FAILED = "failed",
}

export enum CustomerListStatus {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed",
}

export type State = { customers: { entities: Customer[], customerListStatus: CustomerListStatus, customerAddStatus: CustomerAddStatus } }


const initialState: State = {
    customers: {
        entities: [],
        customerListStatus: CustomerListStatus.IDLE,
        customerAddStatus: CustomerAddStatus.IDLE,
    }
}

export async function listCustomers(dispatch: any, getState: any) {
    dispatch({type: "customers/customersLoading"})
    axios.get<Customer[]>('http://localhost:8080/api/customers').then(response => dispatch({
        type: "customers/customersLoaded",
        payload: response.data
    })).catch((error) => dispatch({
        type: "customers/customersLoadingFailed",
        payload: error
    }))

}

export function addCustomer(firstName: string, lastName: string, telephoneNumber: string) {
    return async function addCustomerThunk(dispatch: any, getState: any) {
        dispatch({type: "customers/customerAdding"})
        axios.post<Customer>("http://localhost:8080/api/customers", {
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
        await axios.delete(`http://localhost:8080/api/customers/${customerId}`)
        dispatch({
            type: "customers/customerDeleted",
            payload: customerId
        })
    }
}


export default function rootReducer(state = initialState, action: any) {
    switch (action.type) {
        case "customers/customersLoading":
            console.log(state, action)
            return {
                ...state,
                customers: {
                    entities: state.customers.entities,
                    customerAddStatus: state.customers.customerAddStatus,
                    customerListStatus: CustomerListStatus.LOADING
                }
            }
        case "customers/customersLoadingFailed":
            console.log(state, action.payload)
            return {
                ...state,
                customers: {
                    entities: state.customers.entities,
                    customerAddStatus: state.customers.customerAddStatus,
                    customerListStatus: CustomerListStatus.FAILED
                }
            }
        case "customers/customersLoaded":
            console.log(state, action)
            return {
                ...state,
                customers: {
                    entities: action.payload,
                    customerAddStatus: state.customers.customerAddStatus,
                    customerListStatus: CustomerListStatus.IDLE
                }
            }
        case "customers/customerAddIdle":
            console.log(state, action)
            return {
                customers: {
                    entities: [...state.customers.entities],
                    customerAddStatus: CustomerAddStatus.IDLE,
                    customerListStatus: state.customers.customerListStatus
                }
            }
        case "customers/customerAdding":
            console.log(state, action)
            return {
                customers: {
                    entities: [...state.customers.entities],
                    customerAddStatus: CustomerAddStatus.ADDING,
                    customerListStatus: state.customers.customerListStatus
                }
            }
        case "customers/customerAddingFailed":
            console.log(state, action)
            return {
                customers: {
                    entities: [...state.customers.entities],
                    customerAddStatus: CustomerAddStatus.FAILED,
                    customerListStatus: state.customers.customerListStatus
                }
            }
        case "customers/customerAddingSuccess":
            console.log(state, action)
            return {
                customers: {
                    entities: [
                        ...state.customers.entities,
                        {
                            id: action.payload.id,
                            first_name: action.payload.first_name,
                            last_name: action.payload.last_name,
                            telephone_number: action.payload.telephone_number
                        }
                    ],
                    customerAddStatus: CustomerAddStatus.SUCCESS,
                    customerListStatus: state.customers.customerListStatus
                }
            }
        case "customers/customerDeleted":
            console.log(state, action)
            return {
                customers: {
                    entities: state.customers.entities.filter(customer => customer.id !== action.payload),
                    customerAddStatus: state.customers.customerAddStatus,
                    customerListStatus: state.customers.customerListStatus
                }
            }
        default:
            return state
    }
}
import {Customer} from "../../models/customer";
import {Purchase} from "../../models/purchase";
import {CustomerAddStatus, CustomerListStatus} from "./customers";
import {PurchasesListStatus} from "./purchases";

type CustomersState = { entities: Customer[], customerListStatus: CustomerListStatus, customerAddStatus: CustomerAddStatus }
type PurchasesState = { entities: Purchase[], purchasesListStatus: PurchasesListStatus }
export type State = { customers: CustomersState, purchases: PurchasesState }


const initialState: State = {
    customers: {
        entities: [],
        customerListStatus: CustomerListStatus.IDLE,
        customerAddStatus: CustomerAddStatus.IDLE,
    },
    purchases: {
        entities: [],
        purchasesListStatus: PurchasesListStatus.IDLE
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
                ...state,
                customers: {
                    entities: [...state.customers.entities],
                    customerAddStatus: CustomerAddStatus.IDLE,
                    customerListStatus: state.customers.customerListStatus
                }
            }
        case "customers/customerAdding":
            console.log(state, action)
            return {
                ...state,
                customers: {
                    entities: [...state.customers.entities],
                    customerAddStatus: CustomerAddStatus.ADDING,
                    customerListStatus: state.customers.customerListStatus
                }
            }
        case "customers/customerAddingFailed":
            console.log(state, action)
            return {
                ...state,
                customers: {
                    entities: [...state.customers.entities],
                    customerAddStatus: CustomerAddStatus.FAILED,
                    customerListStatus: state.customers.customerListStatus
                }
            }
        case "customers/customerAddingSuccess":
            console.log(state, action)
            return {
                ...state,
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
                ...state,
                customers: {
                    entities: state.customers.entities.filter(customer => customer.id !== action.payload),
                    customerAddStatus: state.customers.customerAddStatus,
                    customerListStatus: state.customers.customerListStatus
                }
            }
        case "purchases/purchasesLoading":
            console.log(state, action)
            return {
                ...state,
                purchases: {entities: state.purchases.entities, purchasesListStatus: PurchasesListStatus.LOADING}
            }
        case "purchases/purchasesLoaded":
            console.log(state, action)
            return {
                ...state,
                purchases: {entities: action.payload, purchasesListStatus: PurchasesListStatus.IDLE}
            }
        default:
            return state
    }
}
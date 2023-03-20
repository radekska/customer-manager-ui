import axios from "axios";
import {Purchase} from "../../models/purchase";

export function listPurchases(customerId: string) {
    return async function listPurchasesThunk(dispatch: any, getState: any) {
        dispatch({type: "purchases/purchasesLoading"})
        axios.get<Purchase[]>(`http://localhost:8080/api/customers/${customerId}/purchases`).then(response => {
            dispatch({
                type: "purchases/purchasesLoaded",
                payload: response.data
            })
        })
    }
}

export enum PurchasesListStatus {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed",
}
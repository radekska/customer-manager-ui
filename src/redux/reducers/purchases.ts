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

export function addPurchase(customerId: string, frameModel: string, lensPower: string, lensType: string, pd: string, purchaseType: string, purchasedAt: string) {
    return async function addPurchaseThunk(dispatch: any, getState: any) {
        dispatch({type: "purchases/purchaseAdding"})
        axios.post<Purchase>(`http://localhost:8080/api/customers/${customerId}/purchases`, {
            frame_model: frameModel,
            lens_power: lensPower,
            lens_type: lensType,
            pd: pd,
            purchase_type: purchaseType,
            purchased_at: purchasedAt,
        }).then(response => {
            dispatch({
                type: "purchases/purchaseAddingSuccess",
                payload: response.data
            })
            setTimeout(() => dispatch({
                type: "purchases/purchaseAddIdle",
            }), 5000)
        }).catch(() => {
            dispatch({
                type: "purchases/purchaseAddingFailed"
            })
            setTimeout(() => dispatch({
                type: "purchases/purchaseAddIdle",
            }), 5000)
        })

    }
}

export enum PurchasesListStatus {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed",
}
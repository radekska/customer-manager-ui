import axios from "axios";
import {Purchase} from "../../models/purchase";

// const origin = window.location.origin
const origin = "http://localhost"


export function listPurchases(customerId: string) {
    return async function listPurchasesThunk(dispatch: any, getState: any) {
        dispatch({type: "purchases/purchasesLoading"})
        axios.get<Purchase[]>(`${origin}/api/customers/${customerId}/purchases`).then(response => {
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
        axios.post<Purchase>(`${origin}/api/customers/${customerId}/purchases`, {
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


export function deletePurchase(customerId: string, purchaseId: string) {
    return async function deletePurchaseThunk(dispatch: any, getState: any) {
        dispatch({type: "purchases/purchaseDeleting"})
        axios.delete<Purchase>(`${origin}/api/customers/${customerId}/purchases/${purchaseId}`).then(response => {
            dispatch({
                type: "purchases/purchaseDeletingSuccess",
                payload: purchaseId
            })
            setTimeout(() => dispatch({
                type: "purchases/purchaseDeleteIdle",
            }), 5000)
        }).catch(() => {
            dispatch({
                type: "purchases/purchaseDeletingFailed"
            })
            setTimeout(() => dispatch({
                type: "purchases/purchaseDeleteIdle",
            }), 5000)
        })

    }
}
export enum PurchasesListStatus {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed",
}

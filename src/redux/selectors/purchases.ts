import { State } from "../reducers/root";

export const selectAddPurchaseStatus = (state: State) => state.purchases.purchaseAddStatus;

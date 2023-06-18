import { State } from "./reducers/root";

export const selectAddCustomerStatus = (state: State) => state.customers.customerAddStatus;
export const selectAddPurchaseStatus = (state: State) => state.purchases.purchaseAddStatus;
export const selectAddRepairStatus = (state: State) => state.repairs.repairAddStatus;

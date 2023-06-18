import { State } from "../reducers/root";

export const selectAddCustomerStatus = (state: State) => state.customers.customerAddStatus;


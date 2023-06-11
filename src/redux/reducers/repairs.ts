import axios from "axios";
import { Repair } from "../../models/repair";

// const origin = window.location.origin
const origin = "http://localhost";

export function listRepairs(customerId: string) {
  return async function listRepairsThunk(dispatch: any, getState: any) {
    dispatch({ type: "repairs/repairsLoading" });
    axios.get<Repair[]>(`${origin}/api/customers/${customerId}/repairs`).then((response) => {
      dispatch({
        type: "repairs/repairsLoaded",
        payload: response.data,
      });
    });
  };
}

export function deleteRepair(customerId: string, repairId: string) {
  return async function deleteRepairThunk(dispatch: any, getState: any) {
    dispatch({ type: "repairs/repairsDeleting" });
    axios
      .delete<Repair>(`${origin}/api/customers/${customerId}/repairs/${repairId}`)
      .then((response) => {
        dispatch({
          type: "repairs/repairDeletingSuccess",
          payload: repairId,
        });
        setTimeout(
          () =>
            dispatch({
              type: "repairs/repairDeleteIdle",
            }),
          5000
        );
      })
      .catch(() => {
        dispatch({
          type: "repairs/repairDeletingFailed",
        });
        setTimeout(
          () =>
            dispatch({
              type: "repairs/repairDeleteIdle",
            }),
          5000
        );
      });
  };
}

export function addRepair(customerId: string, description: string, cost: Number, reportedAt: string) {
  return async function addRepairThunk(dispatch: any, getState: any) {
    dispatch({ type: "repairs/repairAdding" });
    axios
      .post<Repair>(`${origin}/api/customers/${customerId}/repairs`, {
        description: description,
        cost: cost,
        reported_at: reportedAt,
      })
      .then((response) => {
        dispatch({
          type: "repairs/repairAddingSuccess",
          payload: response.data,
        });
        setTimeout(
          () =>
            dispatch({
              type: "repairs/repairAddIdle",
            }),
          5000
        );
      })
      .catch(() => {
        dispatch({
          type: "repairs/repairAddingFailed",
        });
        setTimeout(
          () =>
            dispatch({
              type: "repairs/repairAddIdle",
            }),
          5000
        );
      });
  };
}

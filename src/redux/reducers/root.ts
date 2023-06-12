import { AddStatus, DeleteStatus, ListStatus } from "../../enums";
import { Customer } from "../../models/customer";
import { Purchase } from "../../models/purchase";
import { Repair } from "../../models/repair";

type CustomersState = {
  entities: Customer[];
  customerListStatus: ListStatus;
  customerAddStatus: AddStatus;
};
type PurchasesState = {
  entities: Purchase[];
  purchasesListStatus: ListStatus;
  purchaseAddStatus: AddStatus;
  purchaseDeleteStatus: DeleteStatus;
};

type RepairsState = {
  entities: Repair[];
  repairsListStatus: ListStatus;
  repairAddStatus: AddStatus;
  repairDeleteStatus: DeleteStatus;
};
export type State = {
  customers: CustomersState;
  purchases: PurchasesState;
  repairs: RepairsState;
};

const initialState: State = {
  customers: {
    entities: [],
    customerListStatus: ListStatus.IDLE,
    customerAddStatus: AddStatus.IDLE,
  },
  purchases: {
    entities: [],
    purchasesListStatus: ListStatus.IDLE,
    purchaseAddStatus: AddStatus.IDLE,
    purchaseDeleteStatus: DeleteStatus.IDLE,
  },
  repairs: {
    entities: [],
    repairsListStatus: ListStatus.IDLE,
    repairAddStatus: AddStatus.IDLE,
    repairDeleteStatus: DeleteStatus.IDLE,
  },
};

export default function rootReducer(state = initialState, action: any) {
  switch (action.type) {
    case "customers/customersLoading":
      return {
        ...state,
        customers: {
          entities: state.customers.entities,
          customerAddStatus: state.customers.customerAddStatus,
          customerListStatus: ListStatus.LOADING,
        },
      };
    case "customers/customersLoadingFailed":
      console.log(state, action.payload);
      return {
        ...state,
        customers: {
          entities: state.customers.entities,
          customerAddStatus: state.customers.customerAddStatus,
          customerListStatus: ListStatus.FAILED,
        },
      };
    case "customers/customersLoaded":
      return {
        ...state,
        customers: {
          entities: action.payload,
          customerAddStatus: state.customers.customerAddStatus,
          customerListStatus: ListStatus.IDLE,
        },
      };
    case "customers/customerAddIdle":
      return {
        ...state,
        customers: {
          entities: state.customers.entities,
          customerAddStatus: AddStatus.IDLE,
          customerListStatus: state.customers.customerListStatus,
        },
      };
    case "customers/customerAdding":
      return {
        ...state,
        customers: {
          entities: [...state.customers.entities],
          customerAddStatus: AddStatus.ADDING,
          customerListStatus: state.customers.customerListStatus,
        },
      };
    case "customers/customerAddingFailed":
      return {
        ...state,
        customers: {
          entities: [...state.customers.entities],
          customerAddStatus: AddStatus.FAILED,
          customerListStatus: state.customers.customerListStatus,
        },
      };
    case "customers/customerAddingSuccess":
      return {
        ...state,
        customers: {
          entities: [
            ...state.customers.entities,
            {
              id: action.payload.id,
              first_name: action.payload.first_name,
              last_name: action.payload.last_name,
              telephone_number: action.payload.telephone_number,
            },
          ],
          customerAddStatus: AddStatus.SUCCESS,
          customerListStatus: state.customers.customerListStatus,
        },
      };
    case "customers/customerDeleted":
      return {
        ...state,
        customers: {
          entities: state.customers.entities.filter((customer) => customer.id !== action.payload),
          customerAddStatus: state.customers.customerAddStatus,
          customerListStatus: state.customers.customerListStatus,
        },
      };
    case "purchases/purchaseAddIdle":
      return {
        ...state,
        purchases: {
          entities: state.purchases.entities,
          purchasesListStatus: state.purchases.purchasesListStatus,
          purchaseAddStatus: AddStatus.IDLE,
          purchaseDeleteStatus: DeleteStatus.IDLE,
        },
      };
    case "purchases/purchaseAdding":
      return {
        ...state,
        purchases: {
          entities: state.purchases.entities,
          purchasesListStatus: state.purchases.purchasesListStatus,
          purchaseAddStatus: AddStatus.ADDING,
          purchaseDeleteStatus: DeleteStatus.IDLE,
        },
      };
    case "purchases/purchaseAddingFailed":
      return {
        ...state,
        purchases: {
          entities: state.purchases.entities,
          purchasesListStatus: state.purchases.purchasesListStatus,
          purchaseAddStatus: AddStatus.FAILED,
          purchaseDeleteStatus: DeleteStatus.IDLE,
        },
      };
    case "purchases/purchaseAddingSuccess":
      return {
        ...state,
        purchases: {
          entities: [
            ...state.purchases.entities,
            {
              id: action.payload.id,
              frame_model: action.payload.frame_model,
              lens_type: action.payload.lens_type,
              lens_power: action.payload.lens_power,
              pd: action.payload.pd,
              purchase_type: action.payload.purchase_type,
              customer_id: action.payload.customer_id,
              purchased_at: action.payload.purchased_at,
              created_at: action.payload.created_at,
              updated_at: action.payload.updated_at,
            },
          ],
          purchasesListStatus: state.purchases.purchasesListStatus,
          purchaseAddStatus: AddStatus.SUCCESS,
          purchaseDeleteStatus: DeleteStatus.IDLE,
        },
      };
    case "purchases/purchaseDeleting":
      return {
        ...state,
        purchases: {
          entities: state.purchases.entities,
          purchasesListStatus: state.purchases.purchasesListStatus,
          purchaseAddStatus: state.purchases.purchaseAddStatus,
          purchaseDeleteStatus: DeleteStatus.DELETING,
        },
      };
    case "purchases/purchaseDeletingFailed":
      return {
        ...state,
        purchases: {
          entities: state.purchases.entities,
          purchasesListStatus: state.purchases.purchasesListStatus,
          purchaseAddStatus: state.purchases.purchaseAddStatus,
          purchaseDeleteStatus: DeleteStatus.FAILED,
        },
      };
    case "purchases/purchaseDeletingSuccess":
      return {
        ...state,
        purchases: {
          entities: state.purchases.entities.filter((purchase) => purchase.id !== action.payload),
          purchasesListStatus: state.purchases.purchasesListStatus,
          purchaseAddStatus: state.purchases.purchaseAddStatus,
          purchaseDeleteStatus: DeleteStatus.SUCCESS,
        },
      };
    case "purchases/purchaseDeleteIdle":
      return {
        ...state,
        purchases: {
          entities: state.purchases.entities,
          purchasesListStatus: state.purchases.purchasesListStatus,
          purchaseAddStatus: state.purchases.purchaseAddStatus,
          purchaseDeleteStatus: DeleteStatus.IDLE,
        },
      };
    case "purchases/purchasesLoading":
      return {
        ...state,
        purchases: {
          entities: state.purchases.entities,
          purchasesListStatus: ListStatus.LOADING,
          purchaseAddStatus: AddStatus.IDLE,
          purchaseDeleteStatus: DeleteStatus.IDLE,
        },
      };
    case "purchases/purchasesLoaded":
      return {
        ...state,
        purchases: {
          entities: action.payload,
          purchasesListStatus: ListStatus.IDLE,
          purchaseAddStatus: AddStatus.IDLE,
          purchaseDeleteStatus: DeleteStatus.IDLE,
        },
      };
    case "repairs/repairsLoading":
      return {
        ...state,
        repairs: {
          entities: state.repairs.entities,
          repairsListStatus: ListStatus.LOADING,
          repairAddStatus: AddStatus.IDLE,
          repairDeleteStatus: DeleteStatus.IDLE,
        },
      };
    case "repairs/repairsLoaded":
      return {
        ...state,
        repairs: {
          entities: action.payload,
          repairsListStatus: ListStatus.IDLE,
          repairAddStatus: AddStatus.IDLE,
          repairDeleteStatus: DeleteStatus.IDLE,
        },
      };
    case "repairs/repairAddIdle":
      return {
        ...state,
        repairs: {
          entities: state.repairs.entities,
          repairsListStatus: state.repairs.repairsListStatus,
          repairAddStatus: AddStatus.IDLE,
          repairDeleteStatus: state.repairs.repairDeleteStatus,
        },
      };
    case "repairs/repairAdding":
      return {
        ...state,
        repairs: {
          entities: state.repairs.entities,
          repairsListStatus: state.repairs.repairsListStatus,
          repairAddStatus: AddStatus.ADDING,
          repairDeleteStatus: state.repairs.repairDeleteStatus,
        },
      };
    case "repairs/repairAddingFailed":
      return {
        ...state,
        repairs: {
          entities: state.repairs.entities,
          repairsListStatus: state.repairs.repairsListStatus,
          repairAddStatus: AddStatus.FAILED,
          repairDeleteStatus: state.repairs.repairDeleteStatus,
        },
      };
    case "repairs/repairAddingSuccess":
      return {
        ...state,
        repairs: {
          entities: [
            ...state.repairs.entities,
            {
              id: action.payload.id,
              description: action.payload.description,
              cost: action.payload.cost,
              created_at: action.payload.created_at,
              reported_at: action.payload.reported_at,
              customer_id: action.payload.customer_id,
            },
          ],
          repairsListStatus: state.repairs.repairsListStatus,
          repairAddStatus: AddStatus.SUCCESS,
          repairDeleteStatus: state.repairs.repairDeleteStatus,
        },
      };
    case "repairs/repairDeleting":
      return {
        ...state,
        repairs: {
          entities: state.repairs.entities,
          repairsListStatus: state.repairs.repairsListStatus,
          repairAddStatus: state.repairs.repairAddStatus,
          repairDeleteStatus: DeleteStatus.DELETING,
        },
      };
    case "repairs/repairDeletingFailed":
      return {
        ...state,
        repairs: {
          entities: state.repairs.entities,
          repairsListStatus: state.repairs.repairsListStatus,
          repairAddStatus: state.repairs.repairAddStatus,
          repairDeleteStatus: DeleteStatus.FAILED,
        },
      };
    case "repairs/repairDeletingSuccess":
      return {
        ...state,
        repairs: {
          entities: state.repairs.entities.filter((repair) => repair.id !== action.payload),
          repairsListStatus: state.repairs.repairsListStatus,
          repairAddStatus: state.repairs.repairAddStatus,
          repairDeleteStatus: DeleteStatus.SUCCESS,
        },
      };
    case "repairs/repairDeleteIdle":
      return {
        ...state,
        repairs: {
          entities: state.repairs.entities,
          repairsListStatus: state.repairs.repairsListStatus,
          repairAddStatus: state.repairs.repairAddStatus,
          repairDeleteStatus: DeleteStatus.IDLE,
        },
      };
    default:
      return state;
  }
}

import { Schema } from "rsuite";

const RequiredString = Schema.Types.StringType().isRequired("To pole jest wymagane.");

export const addCustomerModelForm = Schema.Model({
  firstName: RequiredString,
  lastName: RequiredString,
  telephoneNumber: Schema.Types.StringType().pattern(/[0-9]+/, "To pole musi zawierać same cyfry."),
});

export const addPurchaseModelForm = Schema.Model({
  frameModel: RequiredString,
  lensPower: RequiredString,
  pd: RequiredString,
  lensType: RequiredString,
  purchaseType: RequiredString,
  purchasedAt: Schema.Types.DateType(),
});

export const addRepairModelForm = Schema.Model({
  description: RequiredString,
  cost: Schema.Types.NumberType("To pole musi być liczbą."),
  purchasedAt: Schema.Types.DateType(),
});

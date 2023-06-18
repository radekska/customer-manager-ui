import { Schema } from "rsuite";

export const addCustomerModelForm = Schema.Model({
  firstName: Schema.Types.StringType().isRequired("To pole jest wymagane."),
  lastName: Schema.Types.StringType().isRequired("To pole jest wymagane."),
  telephoneNumber: Schema.Types.StringType()
    .pattern(/[0-9]+/, "To pole musi zawierać same cyfry.")
    .isRequired("To pole jest wymagane."),
});

export const addPurchaseModelForm = Schema.Model({
  frameModel: Schema.Types.StringType().isRequired("To pole jest wymagane.")
})

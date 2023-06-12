import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCustomer } from "../redux/reducers/customers";
import { IconButton } from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";

const DeleteCustomer: React.FC = () => {
  const customerId = useParams().id!;
  const dispatch = useDispatch();

  const deleteCustomerHandler = (
    event: React.MouseEvent<HTMLElement>,
    customerId: string
  ) => {
    event.preventDefault();
    const deleteCustomerThunk = deleteCustomer(customerId);
    // @ts-ignore
    dispatch(deleteCustomerThunk);
  };

  return (
    <IconButton
      color="red"
      appearance="primary"
      icon={<TrashIcon />}
      onClick={(event) => {
        deleteCustomerHandler(event, customerId);
      }}
    >
      Usuń klienta
    </IconButton>
  );
};

export default DeleteCustomer;

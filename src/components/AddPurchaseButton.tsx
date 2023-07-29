import { Link } from "react-router-dom";
import { AddButton } from "./AddButton";

const AddPurchaseButton: React.FC<{ customerId: string }> = ({ customerId }) => {
  const path = `/customers/${customerId}/purchase/add`;
  return (
    <Link to={path}>
      <AddButton text="Dodaj zakup" />
    </Link>
  );
};

export default AddPurchaseButton;

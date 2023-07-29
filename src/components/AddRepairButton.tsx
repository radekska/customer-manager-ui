import { Link } from "react-router-dom";
import { AddButton } from "./AddButton";

const AddRepairButton: React.FC<{ customerId: string }> = ({ customerId }) => {
  const path = `/customers/${customerId}/repair/add`;
  return (
    <Link to={path}>
      <AddButton text="Dodaj reklamacje" />
    </Link>
  );
};

export default AddRepairButton;

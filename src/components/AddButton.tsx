import PlusIcon from "@rsuite/icons/Plus";
import { IconButton } from "rsuite";

export const AddButton = ({ text }: { text: string }) => {
  return (
    <IconButton type="submit" appearance="primary" color="green" icon={<PlusIcon />}>
      {text}
    </IconButton>
  );
};

import Message from "rsuite/Message";
import { AddStatus } from "../enums";

interface TextMessageStatus {
  success: string;
  adding: string;
  failed: string;
}

export const AddMessageStatus = ({ addStatus, message }: { addStatus: AddStatus; message: TextMessageStatus }) => {
  if (addStatus === AddStatus.FAILED) {
    return (
      <Message showIcon type="error">
        {message.failed}
      </Message>
    );
  }
  if (addStatus === AddStatus.SUCCESS) {
    return (
      <Message showIcon type="success">
        {message.success}
      </Message>
    );
  }
  if (addStatus === AddStatus.ADDING) {
    return (
      <Message showIcon type="info">
        {message.adding}
      </Message>
    );
  }
  return <div></div>;
};

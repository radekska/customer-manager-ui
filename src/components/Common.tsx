import Message from "rsuite/Message";
import { AddStatus, DeleteStatus } from "../enums";

export const showErrorLabel = (deleteStatus: DeleteStatus) => {
  if (deleteStatus === DeleteStatus.FAILED) {
    return <Message showIcon type="error" header="Wystąpił błąd w usuwaniu wpisu." />;
  }
};
export const showSuccessfulLabel = (deleteStatus: DeleteStatus) => {
  if (deleteStatus === DeleteStatus.SUCCESS) {
    return <Message showIcon type="success" header="Wpis usunięty poprawnie." />;
  }
};


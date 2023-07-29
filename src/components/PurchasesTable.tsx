import Alert from "@mui/material/Alert";
import TrashIcon from "@rsuite/icons/Trash";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IconButton, Table } from "rsuite";
import { HeaderCell } from "rsuite-table";
import { DeleteStatus, ListStatus } from "../enums";
import { deletePurchase, listPurchases } from "../redux/reducers/purchases";
import { State } from "../redux/reducers/root";

const selectPurchases = (state: State) => state.purchases.entities;
const selectListStatus = (state: State) => state.purchases.purchasesListStatus;
const selectDeleteStatus = (state: State) => state.purchases.purchaseDeleteStatus;

const showErrorLabel = (deleteStatus: DeleteStatus) => {
  if (deleteStatus === DeleteStatus.FAILED) {
    return (
      <Alert key="danger" severity="error">
        Wystąpił błąd w usuwaniu zakupu
      </Alert>
    );
  }
};
const showSuccessfulLabel = (deleteStatus: DeleteStatus) => {
  if (deleteStatus === DeleteStatus.SUCCESS) {
    return (
      <Alert key="success" severity="success">
        Zakup usunięty poprawnie
      </Alert>
    );
  }
};

const PurchasesTable: React.FC = () => {
  const customerId = useParams().id!;
  const dispatch = useDispatch();

  const editPurchaseHandler = (event: any) => {
    console.log(event); // TODO - implement
  };
  const deletePurchaseHandler = (purchaseId: any) => {
    console.log(purchaseId);
    const deletePurchaseThunk = deletePurchase(customerId, purchaseId.toString());
    // @ts-ignore
    dispatch(deletePurchaseThunk);
  };

  useEffect(() => {
    const listPurchasesThunk = listPurchases(customerId);
    // @ts-ignore
    dispatch(listPurchasesThunk);
  }, [customerId, dispatch]);

  const purchases = useSelector(selectPurchases);
  const listStatus = useSelector(selectListStatus);
  const deleteStatus = useSelector(selectDeleteStatus);

  return (
    <Card>
      <Table
        bordered
        loading={(() => {
          return listStatus === ListStatus.LOADING;
        })()}
        data={purchases}
        locale={{ emptyMessage: "Brak danych" }}
        wordWrap={true}
      >
        <Table.Column align="center" fixed resizable fullText={true} width={200}>
          <Table.HeaderCell>Moce szkieł</Table.HeaderCell>
          <Table.Cell dataKey="lens_power" />
        </Table.Column>

        <Table.Column align="center" fixed resizable fullText={true} width={200}>
          <Table.HeaderCell>Rodzaj szkieł</Table.HeaderCell>
          <Table.Cell dataKey="lens_type" />
        </Table.Column>

        <Table.Column align="center" fixed resizable fullText={true} width={200}>
          <Table.HeaderCell>Model oprawki</Table.HeaderCell>
          <Table.Cell dataKey="frame_model" />
        </Table.Column>

        <Table.Column align="center" fixed resizable fullText={true} width={200}>
          <Table.HeaderCell>PD</Table.HeaderCell>
          <Table.Cell dataKey="pd" />
        </Table.Column>

        <Table.Column align="center" fixed resizable fullText={true} width={200}>
          <Table.HeaderCell>Rodzaj zakupu</Table.HeaderCell>
          <Table.Cell dataKey="purchase_type" />
        </Table.Column>

        <Table.Column align="center" fixed resizable fullText={true} width={200}>
          <Table.HeaderCell>Data zakupu</Table.HeaderCell>
          <Table.Cell dataKey="purchased_at" />
        </Table.Column>

        <Table.Column align="center" fixed>
          <HeaderCell> </HeaderCell>
          <Table.Cell style={{ padding: "6px" }}>
            {(rowData) => (
              <IconButton
                color="red"
                appearance="subtle"
                onClick={() => deletePurchaseHandler(rowData.id)}
                icon={<TrashIcon />}
              ></IconButton>
            )}
          </Table.Cell>
        </Table.Column>
      </Table>

      {showErrorLabel(deleteStatus)}
      {showSuccessfulLabel(deleteStatus)}
    </Card>
  );
};

export default PurchasesTable;

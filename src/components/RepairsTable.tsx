import TrashIcon from "@rsuite/icons/Trash";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IconButton, Table } from "rsuite";
import { HeaderCell } from "rsuite-table";
import { ListStatus } from "../enums";
import { deleteRepair, listRepairs } from "../redux/reducers/repairs";
import { State } from "../redux/reducers/root";
import { showErrorLabel, showSuccessfulLabel } from "./Common";

const selectRepairs = (state: State) => state.repairs.entities;
const selectListStatus = (state: State) => state.repairs.repairsListStatus;
const selectDeleteStatus = (state: State) => state.repairs.repairDeleteStatus;

const RepairsTable: React.FC = () => {
  const customerId = useParams().id!;
  const dispatch = useDispatch();

  const deleteRepairHandler = (repairId: any) => {
    const deleteRepairThunk = deleteRepair(customerId, repairId.toString());
    // @ts-ignore
    dispatch(deleteRepairThunk);
  };

  useEffect(() => {
    const listRepairsThunk = listRepairs(customerId);
    // @ts-ignore
    dispatch(listRepairsThunk);
  }, [customerId, dispatch]);

  const repairs = useSelector(selectRepairs);
  const listStatus = useSelector(selectListStatus);
  const deleteStatus = useSelector(selectDeleteStatus);

  return (
    <Card>
      <Table
        bordered
        loading={(() => {
          return listStatus === ListStatus.LOADING;
        })()}
        data={repairs}
        locale={{ emptyMessage: "Brak danych" }}
        wordWrap={true}
      >
        <Table.Column align="center" fixed resizable fullText={true} width={200}>
          <Table.HeaderCell>Opis</Table.HeaderCell>
          <Table.Cell dataKey="description" />
        </Table.Column>

        <Table.Column align="center" fixed resizable fullText={true} width={200}>
          <Table.HeaderCell>Koszt</Table.HeaderCell>
          <Table.Cell dataKey="cost" />
        </Table.Column>

        <Table.Column align="center" fixed resizable fullText={true} width={200}>
          <Table.HeaderCell>Data zgłoszenia</Table.HeaderCell>
          <Table.Cell dataKey="reported_at" />
        </Table.Column>

        <Table.Column align="center" fixed>
          <HeaderCell> </HeaderCell>
          <Table.Cell style={{ padding: "6px" }}>
            {(rowData) => (
              <IconButton
                color="red"
                appearance="subtle"
                onClick={() => deleteRepairHandler(rowData.id)}
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

export default RepairsTable;

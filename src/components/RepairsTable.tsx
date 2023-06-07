import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";
import { IconButton } from "rsuite";
import HeaderCell from "rsuite/Table";
import PlusIcon from "@rsuite/icons/Plus";
import Table from "rsuite/Table";
import { State } from "../redux/reducers/root";
import { useDispatch, useSelector } from "react-redux";
import { ListStatus } from "../enums";
import TrashIcon from "@rsuite/icons/Trash";
import { showErrorLabel, showSuccessfulLabel } from "./Common";
import { deleteRepair, listRepairs } from "../redux/reducers/repairs";

const selectRepairs = (state: State) => state.repairs.entities;
const selectListStatus = (state: State) => state.repairs.repairsListStatus;
const selectDeleteStatus = (state: State) => state.repairs.repairsDeleteStatus;

const AddRepairsButton: React.FC<{ customerId: string }> = ({ customerId }) => {
  const path = `/customers/${customerId}/repair/add`;
  return (
    <Link to={path}>
      <IconButton
        appearance="primary"
        icon={<PlusIcon />}
        color="green"
      ></IconButton>
    </Link>
  );
};

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
      <AddRepairsButton customerId={customerId} />
      <Table
        bordered
        loading={(() => {
          return listStatus === ListStatus.LOADING;
        })()}
        data={repairs}
        locale={{ emptyMessage: "Brak danych" }}
      >
        <Table.Column align="center" fixed resizable>
          <Table.HeaderCell>Koszt</Table.HeaderCell>
          <Table.Cell dataKey="cost" />
        </Table.Column>

        <Table.Column align="center" fixed resizable>
          <Table.HeaderCell>Opis</Table.HeaderCell>
          <Table.Cell dataKey="description" />
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

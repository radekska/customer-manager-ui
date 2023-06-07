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

const selectRepairs = (state: State) => state.repairs.entities;
const selectListStatus = (state: State) => state.repairs.purchasesListStatus;
const selectDeleteStatus = (state: State) => state.repairs.purchaseDeleteStatus;

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

  const purchases = useSelector(selectRepairs);
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
        data={purchases}
      >
        <Table.Column align="center" fixed resizable>
          <Table.HeaderCell>Moce szkieł</Table.HeaderCell>
          <Table.Cell dataKey="lens_power" />
        </Table.Column>

        <Table.Column align="center" fixed resizable>
          <Table.HeaderCell>Rodzaj szkieł</Table.HeaderCell>
          <Table.Cell dataKey="lens_type" />
        </Table.Column>

        <Table.Column align="center" fixed resizable>
          <Table.HeaderCell>Model oprawki</Table.HeaderCell>
          <Table.Cell dataKey="frame_model" />
        </Table.Column>

        <Table.Column align="center" fixed resizable>
          <Table.HeaderCell>PD</Table.HeaderCell>
          <Table.Cell dataKey="pd" />
        </Table.Column>

        <Table.Column align="center" fixed resizable>
          <Table.HeaderCell>Rodzaj zakupu</Table.HeaderCell>
          <Table.Cell dataKey="purchase_type" />
        </Table.Column>

        <Table.Column align="center" fixed resizable>
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

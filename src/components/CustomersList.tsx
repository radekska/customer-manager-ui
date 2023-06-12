import { Card, Col, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, List, Message } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";
import { State } from "../redux/reducers/root";
import { listCustomers } from "../redux/reducers/customers";
import { CircularProgress } from "@mui/material";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { ListStatus } from "../enums";

const selectCustomers = (state: State) => state.customers.entities;
const selectListStatus = (state: State) => state.customers.customerListStatus;

const CustomersList: React.FC = () => {
  const dispatch = useDispatch();

  const getCustomersListHandler = (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const customerQuery = value.split(" ");
    const firstName = customerQuery[0] !== undefined ? customerQuery[0] : "";
    const lastName = customerQuery[1] !== undefined ? customerQuery[1] : "";
    const listCustomersThunk = listCustomers(firstName, lastName);

    // @ts-ignore
    dispatch(listCustomersThunk);
  };

  const customers = useSelector(selectCustomers);
  const listStatus = useSelector(selectListStatus);

  function renderLoader() {
    if (listStatus === ListStatus.LOADING) {
      return <CircularProgress className="list-customers-loading-spinner" />;
    }
  }

  function renderCustomersList() {
    if (customers.length > 0) {
      return customers.map((customer) => (
        <Link
          to={`/customers/${customer.id}`}
          key={customer.id}
          style={{ textDecoration: "none", color: "black" }}
        >
          <List.Item>
            {customer.first_name} {customer.last_name}
          </List.Item>
        </Link>
      ));
    }
    return (
      <Message showIcon type="info" header="Informacja">
        Brak klientów w bazie danych.
      </Message>
    );
  }

  return (
    <Col md="auto">
      <Card>
        <Card.Body>
          <Stack gap={3}>
            <InputGroup>
              <Input
                onChange={getCustomersListHandler}
                placeholder="Wyszukaj klientów"
              />
              <InputGroup.Addon>
                <SearchIcon />
              </InputGroup.Addon>
            </InputGroup>

            <List bordered hover>
              {renderLoader()}
              {renderCustomersList()}
            </List>
          </Stack>
        </Card.Body>
        <Card.Footer>
          <Link to="/customer/add">
            <IconButton appearance="primary" color="green" icon={<PlusIcon />}>
              Dodaj klienta
            </IconButton>
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CustomersList;

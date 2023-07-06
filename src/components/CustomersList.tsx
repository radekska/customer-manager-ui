import { CircularProgress } from "@mui/material";
import PlusIcon from "@rsuite/icons/Plus";
import SearchIcon from "@rsuite/icons/Search";
import { useState } from "react";
import { Card, Col, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IconButton, Input, InputGroup, List, Message } from "rsuite";
import Container from "rsuite/Container";
import Pagination from "rsuite/Pagination";
import { ListStatus } from "../enums";
import { listCustomers } from "../redux/reducers/customers";
import { State } from "../redux/reducers/root";

const selectCustomers = (state: State) => state.customers.entities;
const selectListStatus = (state: State) => state.customers.customerListStatus;

const CustomersList: React.FC = () => {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const getCustomersListHandler = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const customerQuery = value.split(" ");
    const firstName = customerQuery[0] !== undefined ? customerQuery[0] : "";
    const lastName = customerQuery[1] !== undefined ? customerQuery[1] : "";
    const listCustomersThunk = listCustomers(firstName, lastName);

    // @ts-ignore
    dispatch(listCustomersThunk);
    setActivePage(1);
  };

  const getPaginatedCustomersListHandler = (page: number) => {
    const limit = 15;
    const offset = (page - 1) * limit;
    const listCustomersThunk = listCustomers("", "", offset, limit);
    // @ts-ignore
    dispatch(listCustomersThunk);
    setActivePage(page);
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
        <Container>
          {" "}
          <Link to={`/customers/${customer.id}`} key={customer.id} style={{ textDecoration: "none", color: "black" }}>
            <List.Item>
              {customer.first_name} {customer.last_name}
            </List.Item>
          </Link>
        </Container>
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
              <Input onChange={getCustomersListHandler} placeholder="Wyszukaj klientów" />
              <InputGroup.Addon>
                <SearchIcon />
              </InputGroup.Addon>
            </InputGroup>
            <List bordered hover>
              {renderLoader()}
              {renderCustomersList()}
            </List>
            <Pagination
              prev
              last
              next
              first
              // size="lg"
              total={100}
              limit={10}
              activePage={activePage}
              onChangePage={getPaginatedCustomersListHandler}
            />
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

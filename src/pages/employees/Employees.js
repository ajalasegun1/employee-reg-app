import React, { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import * as employeeService from "../../services/employeeServices";

const useStyles = makeStyles((theme) => ({
  pageContents: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));
function Employees() {
  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const classes = useStyles();
  return (
    <>
      <PageHeader
        title="New Eployee"
        subtitle="Form design with validation"
        icon={<PeopleOutlineIcon fontSize="large" />}
      />
      <Paper className={classes.pageContents}>
        {/*<EmployeeForm />*/}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>FULL NAME</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>MOBILE</TableCell>
              <TableCell>DEPARTMENT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((data) => (
              <TableRow key={data.email}>
                <TableCell>{data.fullname}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.mobile}</TableCell>
                <TableCell>{data.departmentId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default Employees;

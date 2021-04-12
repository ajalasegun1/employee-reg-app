import React from "react";
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageContents: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));
function Employees() {
  const classes = useStyles();
  return (
    <>
      <PageHeader
        title="New Eployee"
        subtitle="Form design with validation"
        icon={<PeopleOutlineIcon fontSize="large" />}
      />
      <Paper className={classes.pageContents}>
        <EmployeeForm />
      </Paper>
    </>
  );
}

export default Employees;

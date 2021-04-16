import React, { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import SearchIcon from "@material-ui/icons/Search";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import * as employeeService from "../../services/employeeServices";

const useStyles = makeStyles((theme) => ({
  pageContents: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },

  table: {
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },

  searchInputItself: {
    width: "50%",
    marginBottom: theme.spacing(2),
  },
}));
function Employees() {
  const [records] = useState(employeeService.getAllEmployees());
  const pages = [5, 10, 15];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState();
  const [filterFn, setFilterFn] = useState({fn:items => items});
  const classes = useStyles();

  const handleSearchInput = (e) => {
    const target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((item) => item.fullname.toLowerCase().includes(target.value));
      },
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    console.log(property);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const recordsAfterPagingAndSorting = () => {
    return stableSort(filterFn.fn(records), getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  return (
    <>
      <PageHeader
        title="New Eployee"
        subtitle="Form design with validation"
        icon={<PeopleOutlineIcon fontSize="large" />}
      />
      <Paper className={classes.pageContents}>
        <Toolbar>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            className={classes.searchInputItself}
            onChange = {handleSearchInput}
          />
        </Toolbar>
        {/*<EmployeeForm />*/}
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {employeeService.tableHeadCells.map((tblcells) => (
                <TableCell key={tblcells.id}>
                  {/*Conditionally render sorting table head*/}
                  {tblcells.disableSorting ? (
                    tblcells.label
                  ) : (
                    <TableSortLabel
                      active={orderBy === tblcells.id}
                      direction={orderBy === tblcells.id ? order : "asc"}
                      onClick={() => handleRequestSort(tblcells.id)}
                    >
                      {tblcells.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {recordsAfterPagingAndSorting().map((data) => (
              <TableRow key={data.email}>
                <TableCell>{data.fullname}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.mobile}</TableCell>
                <TableCell>{data.departmentId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          page={page}
          rowsPerPageOptions={pages}
          rowsPerPage={rowsPerPage}
          count={records.length}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default Employees;

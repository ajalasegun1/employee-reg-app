import {
  Grid,
  makeStyles,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  InputLabel,
  Select,
  Checkbox,
  Button,
  FormHelperText,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import * as employeeService from "../../services/employeeServices"
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
  btns: {
    "& .MuiButtonBase-root": {
      marginRight: theme.spacing(1),
      textTransform: "none",
    },
  },
}));
const initialValues = {
  id: 0,
  fullname: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
};

function EmployeeForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const classes = useStyles();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCheckChange = (e) => {
    const { name, checked } = e.target;
    setValues({
      ...values,
      [name]: checked,
    });
  };

  const handleDateChange = (date) => {
    setValues({
      ...values,
      hireDate: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) employeeService.insertEmployee(values);
    reset()
  };

  //[{"id":1,"fullname":"Granit Xhaka","email":"granit@xhaka.com","mobile":"0987654321","city":"Swiss","gender":"male","departmentId":"Development","hireDate":"2021-04-01T18:23:00.000Z","isPermanent":true}]

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  //Validate form input then apply errors if needed
  const validate = () => {
    //check for state then apply error message if condition isn't met
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const temp = {};
    temp.fullname = values.fullname ? "" : "This field is required";
    temp.email =
      re.test(values.email) || values.email.length === 0
        ? ""
        : "Email is not valid";
    temp.mobile =
      values.mobile.length > 9 ? "" : "Minimum of 10 numbers required";
    temp.departmentId =
      values.departmentId.length !== 0 ? "" : "This field is required";

    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === ""); // This checks if every value returns an empty string. Boolean result
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
      <Grid container>
        <Grid item xs={6}>
          {/*Input Fields*/}
          <TextField
            label="Full Name"
            variant="outlined"
            value={values.fullname}
            name="fullname"
            onChange={handleChange}
            {...(errors.fullname && {
              error: true,
              helperText: errors.fullname,
            })}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={values.email}
            name="email"
            onChange={handleChange}
            {...(errors.email && { error: true, helperText: errors.email })}
          />
          <TextField
            label="Mobile"
            variant="outlined"
            value={values.mobile}
            name="mobile"
            onChange={handleChange}
            {...(errors.mobile && { error: true, helperText: errors.mobile })}
          />
          <TextField
            label="City"
            variant="outlined"
            value={values.city}
            name="city"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          {/*Gender Radio Buttons*/}
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={values.gender}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>

          {/*Department Dropdown List*/}
          <FormControl
            variant="outlined"
            {...(errors.departmentId && { error: true })}
          >
            <InputLabel htmlFor="outlined-age-native-simple">
              Department
            </InputLabel>
            <Select
              native
              value={values.departmentId}
              onChange={handleChange}
              label="Department"
              inputProps={{
                name: "departmentId",
                id: "outlined-age-native-simple",
              }}
            >
              <option aria-label="None" value="" />
              <option value={"Development"}>Development</option>
              <option value={"Marketing"}>Marketing</option>
              <option value={"Accounting"}>Accounting</option>
              <option value={"HR"}>HR</option>
            </Select>
            {errors.departmentId && (
              <FormHelperText>{errors.departmentId}</FormHelperText>
            )}
          </FormControl>

          {/*Date Picker*/}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              value={values.hireDate}
              onChange={handleDateChange}
              label="Hire Date"
            ></KeyboardDatePicker>
          </MuiPickersUtilsProvider>

          {/*Is permanent checkbox*/}
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.isPermanent}
                  onChange={handleCheckChange}
                  name="isPermanent"
                />
              }
              label="Is Permanent"
            />
          </FormControl>
          <div className={classes.btns}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="default"
              size="large"
              onClick={() => reset()}
            >
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}

export default EmployeeForm;

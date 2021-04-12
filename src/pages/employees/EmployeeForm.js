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
} from "@material-ui/core";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
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

  return (
    <form className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
            {/*Input Fields*/}
          <TextField
            label="Full Name"
            variant="outlined"
            value={values.fullname}
            name="fullname"
            onChange={handleChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={values.email}
            name="email"
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
          <FormControl variant="outlined">
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
          </FormControl>
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
        </Grid>
      </Grid>
    </form>
  );
}

export default EmployeeForm;

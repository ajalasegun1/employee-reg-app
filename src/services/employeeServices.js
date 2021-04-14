const KEYS = {
  employees: "employees",
  employeeID: "employeeID",
};
export const insertEmployee = (data) => {
  let employees = getAllEmployees();
  data["id"] = generateEmployeeID();
  employees.push(data);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
};
export const generateEmployeeID = () => {
  if (localStorage.getItem(KEYS.employeeID) === null)
    localStorage.setItem(KEYS.employeeID, "0");
  let id = parseInt(localStorage.getItem(KEYS.employeeID));
  localStorage.setItem(KEYS.employeeID, (++id).toString());
  return id;
};
export const getAllEmployees = () => {
  if (localStorage.getItem(KEYS.employees) === null)
    localStorage.setItem(KEYS.employees, JSON.stringify([]));
  return JSON.parse(localStorage.getItem(KEYS.employees));
};

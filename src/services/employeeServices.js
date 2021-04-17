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

export const updateEmployee = (data) => {
  let employees = getAllEmployees();
  let recordIndex = employees.findIndex((x) => x.id === data.id);
  employees[recordIndex] = { ...data };
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
};

export const deleteEmployee = (id) => {
  let employees = getAllEmployees();
  employees = employees.filter((employee) => employee.id !== id);
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

export const tableHeadCells = [
  { id: "fullname", label: "Full Name" },
  { id: "email", label: "Email" },
  { id: "mobile", label: "Mobile" },
  { id: "department", label: "Department", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

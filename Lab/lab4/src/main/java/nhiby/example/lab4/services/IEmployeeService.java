package nhiby.example.lab4.services;

import nhiby.example.lab4.pojos.Employee;

import java.util.List;

public interface IEmployeeService {
    public Employee getEmployeeById(String emId);
    public boolean deleteEmployee(String emId);
    public Employee createEmployee(Employee employee);
    public Employee updateEmployee(Employee employee);
    public List<Employee> getAllEmployees();
}

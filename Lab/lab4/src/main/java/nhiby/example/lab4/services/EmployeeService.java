package nhiby.example.lab4.services;

import nhiby.example.lab4.pojos.Employee;
import nhiby.example.lab4.repositories.IEmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService implements IEmployeeService {
    private final IEmployeeRepository employeeRepository;

    public EmployeeService(IEmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    @Override
    public Employee getEmployeeById(String emId) {
        return employeeRepository.getEmployeeById(emId);
    }

    @Override
    public boolean deleteEmployee(String emId) {
        return employeeRepository.deleteEmployee(emId);
    }

    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.createEmployee(employee);
    }

    @Override
    public Employee updateEmployee(Employee employee) {
        return employeeRepository.updateEmployee(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.getAllEmployees();
    }
}

package nhiby.example.lab4.repositories;

import nhiby.example.lab4.pojos.Employee;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface IEmployeeRepository extends PagingAndSortingRepository<Employee, String> {
    public Employee getEmployeeById(String emId);
    public boolean deleteEmployee(String emId);
    public Employee createEmployee(Employee employee);
    public Employee updateEmployee(Employee employee);
    public List<Employee> getAllEmployees();

}

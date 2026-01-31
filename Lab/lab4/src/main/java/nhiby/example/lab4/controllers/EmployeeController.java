package nhiby.example.lab4.controllers;

import nhiby.example.lab4.pojos.Employee;
import nhiby.example.lab4.services.IEmployeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/api/employees")
public class EmployeeController {
    private final IEmployeeService employeeService;

    public EmployeeController(IEmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeService.createEmployee(employee);
    }

    @PutMapping
    public Employee updateEmployee(@RequestBody Employee employee) {
        return employeeService.updateEmployee(employee);
    }

    @DeleteMapping("/{emId}")
    public boolean deleteEmployee(@PathVariable String emId) {
        return employeeService.deleteEmployee(emId);
    }

    @GetMapping("/{emId}")
    public Employee getEmployeeById(@PathVariable String emId) {
        return employeeService.getEmployeeById(emId);
    }



}

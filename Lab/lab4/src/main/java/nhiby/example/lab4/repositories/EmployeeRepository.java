package nhiby.example.lab4.repositories;

import nhiby.example.lab4.pojos.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class EmployeeRepository implements IEmployeeRepository {
    private List<Employee> employees = createList();

    private List<Employee> createList() {
        List<Employee> list = new ArrayList<>();
        list.add(new Employee("E001", "Alice Johnson", "Software Engineer", 75000));
        list.add(new Employee("E002", "Bob Smith", "Project Manager", 90000));
        list.add(new Employee("E003", "Charlie Brown", "QA Engineer", 60000));
        return list;
    }

    //sort + trả danh sách ban đầu
    @Override
    public List<Employee> findAll(Sort sort) {
        return employees;
    }

    //phân trang
    @Override
    public Page<Employee> findAll(Pageable pageable) {
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), employees.size());

        if (start >= employees.size()) {
            return Page.empty(pageable);
        }

        List<Employee> pageContent = employees.subList(start, end);
        return new PageImpl<>(pageContent, pageable, employees.size());
    }


    @Override
    public Employee getEmployeeById(String emId) {
        for (Employee e : employees) {
            if (e.getEmId().equals(emId)) {
                return e;
            }
        }
        return null;
    }

    @Override
    public boolean deleteEmployee(String emId) {
        return employees.removeIf(e -> e.getEmId().equals(emId));
    }

    public Employee createEmployee(Employee employee) {
        Employee newEmployee = new Employee(
                employee.getEmId(),
                employee.getName(),
                employee.getDesignation(),
                employee.getSalary()
        );
        employees.add(newEmployee);
        return employee;
    }

    public Employee updateEmployee(Employee employee) {
        for (Employee e : employees) {
            if (e.getEmId().equals(employee.getEmId())) {
                e.setName(employee.getName());
                e.setDesignation(employee.getDesignation());
                e.setSalary(employee.getSalary());
                return e;
            }
        }
        return null;
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employees;
    }





}

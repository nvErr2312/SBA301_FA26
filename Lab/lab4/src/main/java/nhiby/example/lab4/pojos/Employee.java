package nhiby.example.lab4.pojos;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    private String emId;
    private String name;
    private String designation;
    private double salary;

    @Override
    public String toString() {
        return "Employee{" +
                "emId='" + emId + '\'' +
                ", name='" + name + '\'' +
                ", designation='" + designation + '\'' +
                ", salary=" + salary +
                '}';
    }
}

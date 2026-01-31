package nhiby.example.lab4New.repositories;

import nhiby.example.lab4New.pojos.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<Category, Integer> {
}

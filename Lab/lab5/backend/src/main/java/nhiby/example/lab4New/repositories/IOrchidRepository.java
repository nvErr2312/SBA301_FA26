package nhiby.example.lab4New.repositories;

import nhiby.example.lab4New.pojos.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrchidRepository extends JpaRepository<Orchid, Integer> {
}

package nhiby.example.lab4New.services;

import nhiby.example.lab4New.pojos.Orchid;

import java.util.List;
import java.util.Optional;

public interface IOrchidService {
    public List<Orchid> getAllOrchids();
    public Orchid addOrchid(Orchid orchid);
    public Orchid updateOrchid(int orchidID, Orchid orchid);
    public boolean deleteOrchid(int orchidID);
    public Optional<Orchid> getOrchidByID(int orchidID);

}

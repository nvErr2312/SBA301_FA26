package nhiby.example.lab4New.services;

import nhiby.example.lab4New.pojos.Orchid;
import nhiby.example.lab4New.repositories.IOrchidRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService{

    private final IOrchidRepository orchidRepository;

    public OrchidService(IOrchidRepository orchidRepository) {
        this.orchidRepository = orchidRepository;
    }

    public List<Orchid> getAllOrchids() {
        return orchidRepository.findAll();
    }

    public Orchid addOrchid(Orchid orchid) {
        return orchidRepository.save(orchid);
    }

    public Orchid updateOrchid(int orchidID, Orchid orchid) {
        Orchid o = orchidRepository.getById(orchidID);
        if (o != null) {
            o.setOrchidName(orchid.getOrchidName());
            o.setIsNatural(orchid.isNatural());
            o.setOrchidDescription(orchid.getOrchidDescription());
            o.setOrchidCategory(orchid.getOrchidCategory());
            o.setIsAttractive(orchid.isAttractive());
            o.setOrchidUrl(orchid.getOrchidUrl());
            return orchidRepository.save(o);
        }
        return null;
    }

    public boolean deleteOrchid(int orchidID) {
        Optional<Orchid> o = orchidRepository.findById(orchidID);
        if (o.isPresent()) {
            orchidRepository.deleteById(orchidID);
            return true;
        }
        return false;
    }

    public Optional<Orchid> getOrchidByID(int orchidID) {
        return orchidRepository.findById(orchidID);
    }


}

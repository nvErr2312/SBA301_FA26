package nhiby.example.lab4New.services;

import nhiby.example.lab4New.pojos.Category;
import nhiby.example.lab4New.pojos.Orchid;
import nhiby.example.lab4New.repositories.ICategoryRepository;
import nhiby.example.lab4New.repositories.IOrchidRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService{

    private final IOrchidRepository orchidRepository;
    private final ICategoryRepository categoryRepository;

    public OrchidService(IOrchidRepository orchidRepository, ICategoryRepository categoryRepository) {
        this.orchidRepository = orchidRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Orchid> getAllOrchids() {
        return orchidRepository.findAll();
    }

    public Orchid addOrchid(Orchid orchid) {
        resolveCategory(orchid);
        return orchidRepository.save(orchid);
    }

    public Orchid updateOrchid(int orchidID, Orchid orchid) {
        Optional<Orchid> opt = orchidRepository.findById(orchidID);
        if (opt.isPresent()) {
            Orchid o = opt.get();
            o.setOrchidName(orchid.getOrchidName());
            o.setIsNatural(orchid.isNatural());
            o.setOrchidDescription(orchid.getOrchidDescription());
            o.setIsAttractive(orchid.isAttractive());
            o.setOrchidUrl(orchid.getOrchidUrl());
            resolveCategory(orchid);
            o.setCategory(orchid.getCategory());
            return orchidRepository.save(o);
        }
        return null;
    }

    private void resolveCategory(Orchid orchid) {
        if (orchid.getCategory() != null && orchid.getCategory().getCategoryID() > 0) {
            Category c = categoryRepository.findById(orchid.getCategory().getCategoryID()).orElse(null);
            orchid.setCategory(c);
        }
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

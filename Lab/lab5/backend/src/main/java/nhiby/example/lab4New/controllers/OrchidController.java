package nhiby.example.lab4New.controllers;

import nhiby.example.lab4New.exception.ResourceNotFoundException;
import nhiby.example.lab4New.pojos.Orchid;
import nhiby.example.lab4New.services.OrchidService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orchids")
@CrossOrigin
public class OrchidController {

    private final OrchidService orchidService;

    public OrchidController(OrchidService orchidService) {
        this.orchidService = orchidService;
    }

    @GetMapping
    public ResponseEntity<List<Orchid>> getAllOrchids() {
        return ResponseEntity.ok(orchidService.getAllOrchids());
    }

    @PostMapping
    public ResponseEntity<Orchid> addOrchid(@RequestBody Orchid orchid) {
        Orchid created = orchidService.addOrchid(orchid);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{orchidID}")
    public ResponseEntity<Orchid> updateOrchid(
            @PathVariable int orchidID,
            @RequestBody Orchid orchid
    ) {
        Orchid updated = orchidService.updateOrchid(orchidID, orchid);
        if (updated == null) {
            throw new ResourceNotFoundException("Orchid", orchidID);
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{orchidID}")
    public ResponseEntity<Void> deleteOrchid(@PathVariable int orchidID) {
        boolean deleted = orchidService.deleteOrchid(orchidID);
        if (!deleted) {
            throw new ResourceNotFoundException("Orchid", orchidID);
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{orchidID}")
    public ResponseEntity<Orchid> getOrchidByID(@PathVariable int orchidID) {
        Orchid orchid = orchidService.getOrchidByID(orchidID)
                .orElseThrow(() -> new ResourceNotFoundException("Orchid", orchidID));
        return ResponseEntity.ok(orchid);
    }
}

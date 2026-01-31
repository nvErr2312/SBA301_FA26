package nhiby.example.lab4New.controllers;

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

    // GET /orchids
    @GetMapping
    public ResponseEntity<List<Orchid>> getAllOrchids() {
        return ResponseEntity.ok(orchidService.getAllOrchids());
    }

    // POST /orchids
    @PostMapping
    public ResponseEntity<Orchid> addOrchid(@RequestBody Orchid orchid) {
        Orchid created = orchidService.addOrchid(orchid);
        return ResponseEntity.status(HttpStatus.CREATED).body(created); // 201
    }

    // PUT /orchids/{orchidID}
    @PutMapping("/{orchidID}")
    public ResponseEntity<Orchid> updateOrchid(
            @PathVariable int orchidID,
            @RequestBody Orchid orchid
    ) {
        // Nếu service của bạn trả null khi không tìm thấy
        Orchid updated = orchidService.updateOrchid(orchidID, orchid);
        if (updated == null) {
            return ResponseEntity.notFound().build(); // 404
        }
        return ResponseEntity.ok(updated); // 200
    }

    // DELETE /orchids/{orchidID}
    @DeleteMapping("/{orchidID}")
    public ResponseEntity<Void> deleteOrchid(@PathVariable int orchidID) {
        boolean deleted = orchidService.deleteOrchid(orchidID); // sửa service trả boolean
        if (!deleted) {
            return ResponseEntity.notFound().build(); // 404
        }
        return ResponseEntity.noContent().build(); // 204
    }

    // GET /orchids/{orchidID}
    @GetMapping("/{orchidID}")
    public ResponseEntity<Orchid> getOrchidByID(@PathVariable int orchidID) {
        return orchidService.getOrchidByID(orchidID)
                .map(ResponseEntity::ok)          // 200
                .orElse(ResponseEntity.notFound().build()); // 404
    }
}

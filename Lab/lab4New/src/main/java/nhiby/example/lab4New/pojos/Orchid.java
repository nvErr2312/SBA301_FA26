package nhiby.example.lab4New.pojos;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;

@Getter
@Setter
@Data
@Entity
@ToString
@Table(name="orchid")
public class Orchid implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="orchid_id")
    private int orchidID;

    @Column(name="name", nullable = false)
    private String orchidName;

    @Column(name="is_natural", columnDefinition = "bit default 0")
    private boolean isNatural;

    @Column(name="orchid_description")
    private String orchidDescription;

    @Column(name="orchid_category")
    private String orchidCategory;

    @Column(name="is_attractive", columnDefinition = "bit default 0")
    private boolean isAttractive;

    @Column(name = "orchid_url")
    private String orchidUrl;

    public void setIsNatural(boolean natural) {
    }


    public void setIsAttractive(boolean attractive) {
    }

}

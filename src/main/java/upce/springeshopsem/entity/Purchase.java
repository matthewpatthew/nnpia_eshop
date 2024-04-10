package upce.springeshopsem.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime creationDate;

    private LocalDateTime expirationDate;

    private int totalPrice;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;

    @ManyToMany(mappedBy = "purchases")
    private List<Product> products = new ArrayList<>();


}

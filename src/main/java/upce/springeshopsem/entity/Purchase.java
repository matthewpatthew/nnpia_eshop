package upce.springeshopsem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    private double totalPrice;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;

    @JsonIgnore
    @OneToMany(mappedBy = "purchase")
    private List<ProductPurchase> products = new ArrayList<>();
}

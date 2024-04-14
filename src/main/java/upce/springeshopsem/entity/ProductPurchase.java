package upce.springeshopsem.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ProductPurchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int count;

    @ManyToOne
    private Product product;

    @ManyToOne
    private Purchase purchase;
}

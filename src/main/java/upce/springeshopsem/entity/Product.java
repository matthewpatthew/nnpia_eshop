package upce.springeshopsem.entity;

import jakarta.persistence.*;
import lombok.Data;
import upce.springeshopsem.dto.ProductResponseDto;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private byte[] image;

    private String price;

    private String description;

    @OneToMany(mappedBy = "id")
    private List<ProductPurchase> purchases = new ArrayList<>();

    public Product() {

    }

    public ProductResponseDto toDto() {

        return new ProductResponseDto(
                id,
                name,
                image,
                price,
                description
        );
    }
}

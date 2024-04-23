package upce.springeshopsem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import upce.springeshopsem.dto.ProductResponseDto;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Entity
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private byte[] image;

    private Double price;

    private String description;

    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<ProductPurchase> purchases = new ArrayList<>();

    public Product() {

    }

    public ProductResponseDto toDto() {
            String base64Image = Base64.getEncoder().encodeToString(image);
        return new ProductResponseDto(
                id,
                name,
                base64Image,
                price,
                description
        );
    }
}

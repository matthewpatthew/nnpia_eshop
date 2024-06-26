package upce.springeshopsem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductRequestDto {

    private String name;
    private String image;
    private Double price;
    private String description;
}

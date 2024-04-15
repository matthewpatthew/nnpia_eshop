package upce.springeshopsem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductResponseDto {
    private Long id;
    private String name;
    private String image;
    private String price;
    private String description;
}

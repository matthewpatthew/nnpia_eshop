package upce.springeshopsem.mapper;

import upce.springeshopsem.dto.ProductRequestDto;
import upce.springeshopsem.entity.Product;

import java.util.Base64;

public class ProductMapper {

    public static Product toEntity(ProductRequestDto dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        String encodedImage = dto.getImage();
        byte[] image = Base64.getDecoder().decode(encodedImage);
        product.setImage(image);
        return product;
    }

    public static Product toEntity(Long id, ProductRequestDto dto) {
        Product product = new Product();
        product.setId(id);
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        String encodedImage = dto.getImage();
        byte[] image = Base64.getDecoder().decode(encodedImage);
        product.setImage(image);
        return product;
    }
}
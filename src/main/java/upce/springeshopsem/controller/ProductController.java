package upce.springeshopsem.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import upce.springeshopsem.dto.ProductResponseDto;
import upce.springeshopsem.dto.ProductResponseInputDto;
import upce.springeshopsem.entity.Product;
import upce.springeshopsem.exception.ResourceNotFoundException;
import upce.springeshopsem.service.ProductService;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @GetMapping("")
    public ResponseEntity<List<ProductResponseDto>> findAll() {
        List<Product> products = productService.findAll();
        List<ProductResponseDto> productResponseDto = new ArrayList<>();
        for (Product product : products) {
            productResponseDto.add(product.toDto());
        }
        return ResponseEntity.ok(productResponseDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDto> findById(@PathVariable Long id) throws ResourceNotFoundException {
        Product product = productService.findById(id);
        return ResponseEntity.ok(product.toDto());
    }

    @PostMapping("")
    public ResponseEntity<ProductResponseDto> create(@RequestBody @Validated ProductResponseInputDto productResponseInputDto) {
        Product product = productService.create(toEntity(productResponseInputDto));
        return new ResponseEntity<>(product.toDto(), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDto> update(@PathVariable Long id, @RequestBody @Validated ProductResponseInputDto productResponseInputDto) {
        Product product = productService.update(toEntity(id, productResponseInputDto));
        return ResponseEntity.ok(product.toDto());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws ResourceNotFoundException {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private Product toEntity(ProductResponseInputDto dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setImage(dto.getImage());
        return product;
    }

    private Product toEntity(Long id, ProductResponseInputDto dto) {
        Product product = new Product();
        product.setId(id);
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setImage(dto.getImage());
        return product;
    }
}

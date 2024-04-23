package upce.springeshopsem.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import upce.springeshopsem.dto.ProductResponseDto;
import upce.springeshopsem.dto.ProductResponseInputDto;
import upce.springeshopsem.entity.Product;
import upce.springeshopsem.exception.ResourceNotFoundException;
import upce.springeshopsem.mapper.ProductMapper;
import upce.springeshopsem.service.ProductService;

import java.util.ArrayList;
import java.util.Base64;
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

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("")
    public ResponseEntity<ProductResponseDto> create(@RequestBody @Validated ProductResponseInputDto productResponseInputDto) {
        Product product = productService.create(ProductMapper.toEntity(productResponseInputDto));
        return new ResponseEntity<>(product.toDto(), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDto> update(@PathVariable Long id, @RequestBody @Validated ProductResponseInputDto productResponseInputDto) {
        Product product = productService.update(ProductMapper.toEntity(id, productResponseInputDto));
        return ResponseEntity.ok(product.toDto());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws ResourceNotFoundException {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}



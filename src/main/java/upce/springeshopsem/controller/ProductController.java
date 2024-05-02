package upce.springeshopsem.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import upce.springeshopsem.dto.ProductResponseDto;
import upce.springeshopsem.dto.ProductRequestDto;
import upce.springeshopsem.entity.Product;
import upce.springeshopsem.exception.ResourceNotFoundException;
import upce.springeshopsem.mapper.ProductMapper;
import upce.springeshopsem.service.ProductService;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @GetMapping("")
    public ResponseEntity<List<ProductResponseDto>> findAll(Pageable pageable) {
        Page<Product> products = productService.findAll(pageable);
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
    public ResponseEntity<ProductResponseDto> create(@RequestBody @Validated ProductRequestDto productRequestDto) {
        Product product = productService.create(ProductMapper.toEntity(productRequestDto));
        return new ResponseEntity<>(product.toDto(), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDto> update(@PathVariable Long id, @RequestBody @Validated ProductRequestDto productRequestDto) {
        Product product = productService.update(ProductMapper.toEntity(id, productRequestDto));
        return ResponseEntity.ok(product.toDto());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws ResourceNotFoundException {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getCount() {
        Long count = productService.getCount();
        return ResponseEntity.ok(count);
    }
}



package upce.springeshopsem.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import upce.springeshopsem.entity.Product;
import upce.springeshopsem.exception.ResourceNotFoundException;
import upce.springeshopsem.repository.ProductRepository;
import upce.springeshopsem.service.ProductService;

import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return productRepository.findAllProducts(pageable);
    }

    @Override
    public Product findById(Long id) throws ResourceNotFoundException {
        Optional<Product> product = productRepository.findById(id);
        return product.orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    @Transactional
    @Override
    public Product create(Product product) {
        return productRepository.save(product);
    }

    @Transactional
    @Override
    public Product update(Product product) {
        return productRepository.save(product);
    }

    @Transactional
    @Override
    public void delete(Long id) throws ResourceNotFoundException {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    @Override
    public Long getCount() {
        return productRepository.count();
    }
}

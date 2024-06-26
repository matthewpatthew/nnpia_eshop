package upce.springeshopsem.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import upce.springeshopsem.entity.Product;
import upce.springeshopsem.exception.ResourceNotFoundException;

import java.util.List;

public interface ProductService {

    Page<Product> findAll(Pageable pageable,String sortBy, String sortOrder);

    Product findById(Long id) throws ResourceNotFoundException;

    Product create(Product product);

    Product update(Product product);

    void delete(Long id) throws ResourceNotFoundException;

    Long getCount();
}


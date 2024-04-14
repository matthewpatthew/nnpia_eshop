package upce.springeshopsem.service;

import upce.springeshopsem.entity.Product;
import upce.springeshopsem.exception.ResourceNotFoundException;

import java.util.List;

public interface ProductService {

    List<Product> findAll();

    Product findById(Long id) throws ResourceNotFoundException;

    Product create(Product product);

    Product update(Product product);

    void delete(Long id) throws ResourceNotFoundException;

}


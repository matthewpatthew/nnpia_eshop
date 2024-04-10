package upce.springeshopsem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upce.springeshopsem.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {


}

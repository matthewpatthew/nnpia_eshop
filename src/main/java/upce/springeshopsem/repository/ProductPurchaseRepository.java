package upce.springeshopsem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upce.springeshopsem.entity.ProductPurchase;

@Repository
public interface ProductPurchaseRepository extends JpaRepository<ProductPurchase, Long> {
}

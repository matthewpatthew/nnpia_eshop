package upce.springeshopsem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import upce.springeshopsem.entity.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    @Query("SELECT a FROM Address a JOIN a.users u WHERE u.id = :userId")
    Address findByUserId(Long userId);
}

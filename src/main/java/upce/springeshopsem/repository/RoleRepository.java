package upce.springeshopsem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upce.springeshopsem.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}

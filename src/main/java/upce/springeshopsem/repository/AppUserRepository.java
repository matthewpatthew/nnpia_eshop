package upce.springeshopsem.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import upce.springeshopsem.entity.AppUser;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    @Query("select u from AppUser u")
    Page<AppUser> findAllAppUsers(Pageable pageable);

    AppUser findByUsername(String username);
}

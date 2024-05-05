package upce.springeshopsem.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import upce.springeshopsem.entity.AppUser;
import upce.springeshopsem.exception.ResourceNotFoundException;

public interface AppUserService {

    Page<AppUser> findAllAppUsers(Pageable pageable, String sortBy, String sortOrder);

    AppUser findById(Long id) throws ResourceNotFoundException;

    AppUser create(AppUser appUser);

    AppUser update(AppUser appUser);

    void delete(Long id);

    AppUser findByUsername(String username);

    Long getCount();

    boolean isEmailUnique(String email);

    boolean isUsernameUnique(String username);
}

package upce.springeshopsem.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import upce.springeshopsem.entity.Address;
import upce.springeshopsem.entity.AppUser;
import upce.springeshopsem.exception.ResourceNotFoundException;

import java.util.List;

public interface AppUserService {

    Page<AppUser> findAllAppUsers(Pageable pageable);

    AppUser findById(Long id) throws ResourceNotFoundException;

    AppUser create(AppUser appUser);

    AppUser update(AppUser appUser);

    void delete(Long id) throws ResourceNotFoundException;

    AppUser findByUsername(String username);

    Long getCount();
}

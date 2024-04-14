package upce.springeshopsem.service;

import upce.springeshopsem.entity.AppUser;
import upce.springeshopsem.exception.ResourceNotFoundException;

import java.util.List;

public interface AppUserService {

    List<AppUser> findAll();

    AppUser findById(Long id) throws ResourceNotFoundException;

    AppUser create(AppUser appUser);

    AppUser update(AppUser appUser);

    void delete(Long id) throws ResourceNotFoundException;

    AppUser findByUsername(String username);
}

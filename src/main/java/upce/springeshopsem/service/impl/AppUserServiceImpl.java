package upce.springeshopsem.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import upce.springeshopsem.entity.AppUser;
import upce.springeshopsem.exception.ResourceNotFoundException;
import upce.springeshopsem.repository.AppUserRepository;
import upce.springeshopsem.service.AppUserService;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AppUserServiceImpl implements AppUserService {

    private final AppUserRepository appUserRepository;

    @Override
    public List<AppUser> findAll() {
        return appUserRepository.findAll();
    }

    @Override
    public AppUser findById(Long id) throws ResourceNotFoundException {
        Optional<AppUser> appUser = appUserRepository.findById(id);
        return appUser.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    @Override
    @Transactional
    public AppUser create(AppUser appUser) {
        return appUserRepository.save(appUser);
    }

    @Override
    @Transactional
    public AppUser update(AppUser appUser) {
        return appUserRepository.save(appUser);
    }

    @Override
    @Transactional
    public void delete(Long id) throws ResourceNotFoundException {
        if (!appUserRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        appUserRepository.deleteById(id);
    }

    @Override
    public AppUser findByUsername(String username) {
        return appUserRepository.findByUsername(username);
    }
}

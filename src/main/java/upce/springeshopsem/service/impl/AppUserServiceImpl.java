package upce.springeshopsem.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import upce.springeshopsem.entity.AppUser;
import upce.springeshopsem.exception.ResourceNotFoundException;
import upce.springeshopsem.repository.AppUserRepository;
import upce.springeshopsem.service.AppUserService;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AppUserServiceImpl implements AppUserService {

    private final AppUserRepository appUserRepository;

    @Override
    public Page<AppUser> findAllAppUsers(Pageable pageable, String sortBy, String sortOrder) {
        Sort.Direction direction = sortOrder.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Sort sort = Sort.by(direction, sortBy);
        return appUserRepository.findAllAppUsers(PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort));
    }

    @Override
    public AppUser findById(Long id) throws ResourceNotFoundException {
        Optional<AppUser> appUser = appUserRepository.findById(id);
        return appUser.orElseThrow(ResourceNotFoundException::new);
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
    public void delete(Long id) {
        appUserRepository.deleteById(id);
    }

    @Override
    public AppUser findByUsername(String username) {
        return appUserRepository.findByUsername(username);
    }

    @Override
    public Long getCount() {
        return appUserRepository.count();
    }
}

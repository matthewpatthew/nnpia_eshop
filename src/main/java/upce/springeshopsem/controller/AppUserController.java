package upce.springeshopsem.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import upce.springeshopsem.dto.AppUserRequestDto;
import upce.springeshopsem.dto.AppUserResponseDto;
import upce.springeshopsem.entity.AppUser;
import upce.springeshopsem.exception.ResourceNotFoundException;
import upce.springeshopsem.service.AppUserService;
import upce.springeshopsem.service.RoleService;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/appusers")
public class AppUserController {

    private final AppUserService appUserService;

    private final RoleService roleService;

    private final PasswordEncoder passwordEncoder;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("")
    public ResponseEntity<List<AppUserResponseDto>> findAll(
            Pageable pageable,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortOrder) {
        Page<AppUser> appUsers = appUserService.findAllAppUsers(pageable, sortBy, sortOrder);
        List<AppUserResponseDto> appUserDtoResponse = new ArrayList<>();
        for (AppUser appUser : appUsers) {
            appUserDtoResponse.add(appUser.toDto());
        }
        return ResponseEntity.ok(appUserDtoResponse);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or @authServiceImpl.hasId(#id)")
    @GetMapping("/{id}")
    public ResponseEntity<AppUserResponseDto> findById(@PathVariable Long id) throws ResourceNotFoundException {
        AppUser appUser = appUserService.findById(id);
        return ResponseEntity.ok(appUser.toDto());
    }

    @PostMapping("")
    public ResponseEntity<AppUserResponseDto> create(@RequestBody @Validated AppUserRequestDto requestDto) {
        AppUser appUser = appUserService.create((toEntity(requestDto)));
        return new ResponseEntity<>(appUser.toDto(), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or @authServiceImpl.hasId(#id)")
    @PutMapping("/{id}")
    public ResponseEntity<AppUserResponseDto> update(@PathVariable Long id, @RequestBody @Validated AppUserRequestDto requestDto) throws ResourceNotFoundException {
        AppUser appUser = appUserService.update(toEntity(id, requestDto));
        return ResponseEntity.ok(appUser.toDto());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        appUserService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/count")
    public ResponseEntity<Long> getCount() {
        Long count = appUserService.getCount();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/checkEmail")
    public ResponseEntity<Boolean> checkEmailUniqueness(@RequestParam String email) {
        boolean isUnique = appUserService.isEmailUnique(email);
        return ResponseEntity.ok(isUnique);
    }

    @GetMapping("/checkUsername")
    public ResponseEntity<Boolean> checkUsernameUniqueness(@RequestParam String username) {
        boolean isUnique = appUserService.isUsernameUnique(username);
        return ResponseEntity.ok(isUnique);
    }

    private AppUser toEntity(AppUserRequestDto dto) {
        AppUser appUser = new AppUser();
        return setAppUser(dto, appUser);
    }

    private AppUser toEntity(Long id, AppUserRequestDto dto) throws ResourceNotFoundException {
        AppUser appUser = appUserService.findById(id);
        if (appUser == null) {
            appUser = new AppUser();
            appUser.setId(id);
        }
        return setAppUser(dto, appUser);
    }

    private AppUser setAppUser(AppUserRequestDto dto, AppUser appUser) {
        if (dto.getUsername() != null) appUser.setUsername(dto.getUsername());
        if (dto.getPassword() != null) appUser.setPassword(passwordEncoder.encode(dto.getPassword()));
        if (dto.getEmail() != null) appUser.setEmail(dto.getEmail());
        if (dto.getUserRoles() != null) appUser.setRoles(roleService.findByIds(dto.getUserRoles()));
        if (dto.getFirstName() != null) appUser.setFirstName(dto.getFirstName());
        if (dto.getSurname() != null) appUser.setSurname(dto.getSurname());
        if (dto.getPhoneNumber() != null) appUser.setPhoneNumber(dto.getPhoneNumber());
        return appUser;
    }
}

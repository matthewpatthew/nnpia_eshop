package upce.springeshopsem.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import upce.springeshopsem.dto.AppUserResponseDto;
import upce.springeshopsem.dto.AppUserResponseInputDto;
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
    public ResponseEntity<List<AppUserResponseDto>> findAll() {
        List<AppUser> appUsers = appUserService.findAll();
        List<AppUserResponseDto> appUserDtoResponse = new ArrayList<>();
        for (AppUser appUser : appUsers) {
            appUserDtoResponse.add(appUser.toDto());
        }
        return ResponseEntity.ok(appUserDtoResponse);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<AppUserResponseDto> findById(@PathVariable Long id) throws ResourceNotFoundException {
        AppUser appUser = appUserService.findById(id);
        return ResponseEntity.ok(appUser.toDto());
    }

    @PostMapping("")
    public ResponseEntity<AppUserResponseDto> create(@RequestBody @Validated AppUserResponseInputDto appUserResponseInputDto) {
        AppUser appUser = appUserService.create((toEntity(appUserResponseInputDto)));
        return new ResponseEntity<>(appUser.toDto(), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<AppUserResponseDto> update(@PathVariable Long id, @RequestBody @Validated AppUserResponseInputDto appUserResponseInputDto) {
        AppUser appUser = appUserService.update(toEntity(id, appUserResponseInputDto));
        return ResponseEntity.ok(appUser.toDto());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws ResourceNotFoundException {
        appUserService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private AppUser toEntity(AppUserResponseInputDto dto) {
        AppUser appUser = new AppUser();
        appUser.setUsername(dto.getUsername());
        appUser.setPassword(passwordEncoder.encode(dto.getPassword()));
        appUser.setEmail(dto.getEmail());
        if (dto.getUserRoles() != null) {
            appUser.setRoles(roleService.findByIds(dto.getUserRoles()));
        }
        return appUser;
    }

    private AppUser toEntity(Long id, AppUserResponseInputDto dto) {
        AppUser appUser = new AppUser();
        appUser.setId(id);
        appUser.setUsername(dto.getUsername());
        appUser.setPassword(passwordEncoder.encode(dto.getPassword()));
        appUser.setEmail(dto.getEmail());
        if (dto.getUserRoles() != null) {
            appUser.setRoles(roleService.findByIds(dto.getUserRoles()));
        }
        return appUser;
    }
}

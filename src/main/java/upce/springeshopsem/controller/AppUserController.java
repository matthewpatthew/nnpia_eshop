package upce.springeshopsem.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import upce.springeshopsem.dto.AppUserResponseDto;
import upce.springeshopsem.dto.AppUserResponseInputDto;
import upce.springeshopsem.entity.AppUser;
import upce.springeshopsem.exception.ResourceNotFoundException;
import upce.springeshopsem.service.AppUserService;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/users/admin")
public class AppUserController {

    private final AppUserService appUserService;

    private final PasswordEncoder passwordEncoder;

    @GetMapping("")
    public ResponseEntity<List<AppUserResponseDto>> findAll() {
        List<AppUser> appUsers = appUserService.findAll();
        List<AppUserResponseDto> appUserDtoResponse = new ArrayList<>();
        for (AppUser appUser : appUsers) {
            appUserDtoResponse.add(appUser.toDto());
        }
        return ResponseEntity.ok(appUserDtoResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppUserResponseDto> findById(@PathVariable Long id) throws ResourceNotFoundException {
        AppUser appUser = appUserService.findById(id);
        return ResponseEntity.ok(appUser.toDto());
    }

    @PostMapping("")
    public ResponseEntity<AppUserResponseDto> create(@RequestBody @Validated AppUserResponseInputDto appUserResponseInputDto) {
        AppUser appUser = appUserService.create(toEntity(appUserResponseInputDto));
        return new ResponseEntity<>(appUser.toDto(), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppUserResponseDto> update(@PathVariable Long id, @RequestBody @Validated AppUserResponseInputDto appUserResponseInputDto) {
        AppUser appUser = appUserService.update(toEntity(id, appUserResponseInputDto));
        return ResponseEntity.ok(appUser.toDto());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws ResourceNotFoundException {
        appUserService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private AppUser toEntity(AppUserResponseInputDto appUserResponseInputDto) {
        return new AppUser(
                appUserResponseInputDto.getUsername(),
                passwordEncoder.encode(appUserResponseInputDto.getPassword()),
                appUserResponseInputDto.getEmail()
        );
    }

    private AppUser toEntity(Long id, AppUserResponseInputDto appUserResponseInputDto) {
        return new AppUser(
                id,
                appUserResponseInputDto.getUsername(),
                passwordEncoder.encode(appUserResponseInputDto.getPassword()),
                appUserResponseInputDto.getEmail()
        );
    }
}

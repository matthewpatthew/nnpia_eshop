package upce.springeshopsem.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import upce.springeshopsem.dto.AddressRequestDto;
import upce.springeshopsem.dto.AddressResponseDto;
import upce.springeshopsem.entity.Address;
import upce.springeshopsem.entity.AppUser;
import upce.springeshopsem.exception.ResourceNotFoundException;
import upce.springeshopsem.service.AddressService;
import upce.springeshopsem.service.AppUserService;

@RestController
@AllArgsConstructor
@RequestMapping("/addresses")
public class AddressController {


    private final AddressService addressService;
    private final AppUserService appUserService;

    @PreAuthorize("hasRole('ROLE_ADMIN') or @authServiceImpl.hasId(#userId)")
    @GetMapping("/{userId}")
    public ResponseEntity<AddressResponseDto> getAddressByUserId(@PathVariable Long userId) {
        Address address = addressService.findByUserId(userId);
        return new ResponseEntity<>(address.toDto(), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or @authServiceImpl.hasId(#id)")
    @PutMapping("/{id}")
    public ResponseEntity<AddressResponseDto> update(@PathVariable Long id, @RequestBody @Validated AddressRequestDto requestDto) throws ResourceNotFoundException {
        Address address = addressService.update(toEntity(id, requestDto));
        return ResponseEntity.ok(address.toDto());
    }

    private Address toEntity(Long id, AddressRequestDto dto) throws ResourceNotFoundException {
        AppUser appUser = appUserService.findById(id);
        Address address = addressService.findByUserId(id);
        if (address == null) {
            address = new Address();
        }
        if (dto.getStreet() != null) address.setStreet(dto.getStreet());
        if (dto.getCity() != null) address.setCity(dto.getCity());
        if (dto.getZipCode() != null) address.setZipCode(dto.getZipCode());
        appUser.setAddress(address);
        return address;
    }
}

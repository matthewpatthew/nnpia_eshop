package upce.springeshopsem.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import upce.springeshopsem.dto.AddressResponseDto;
import upce.springeshopsem.entity.Address;
import upce.springeshopsem.service.AddressService;

@RestController
@AllArgsConstructor
@RequestMapping("/addresses")
public class AddressController {


    private final AddressService addressService;
    @GetMapping("/{userId}")
    public ResponseEntity<AddressResponseDto> getAddressByUserId(@PathVariable Long userId) {
        Address address = addressService.findByUserId(userId);
        return new ResponseEntity<>(address.toDto(), HttpStatus.OK);

    }
}

package upce.springeshopsem.service.impl;


import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import upce.springeshopsem.entity.Address;
import upce.springeshopsem.entity.AppUser;
import upce.springeshopsem.exception.ResourceNotFoundException;
import upce.springeshopsem.repository.AddressRepository;
import upce.springeshopsem.service.AddressService;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    @Override
    public Address findByUserId(Long userId){
       return addressRepository.findByUserId(userId);
    }

    @Transactional
    @Override
    public Address update(Address address) {
       return addressRepository.save(address);
    }
}

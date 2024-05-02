package upce.springeshopsem.service.impl;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import upce.springeshopsem.entity.Address;
import upce.springeshopsem.repository.AddressRepository;
import upce.springeshopsem.service.AddressService;

@Service
@AllArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    @Override
    public Address findByUserId(Long userId) {
        return addressRepository.findByUserId(userId);
    }
}

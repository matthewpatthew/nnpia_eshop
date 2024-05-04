package upce.springeshopsem.service;

import upce.springeshopsem.entity.Address;
import upce.springeshopsem.exception.ResourceNotFoundException;

public interface AddressService {

    Address findByUserId(Long userId);

    Address update(Address address);
}

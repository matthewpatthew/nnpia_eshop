package upce.springeshopsem.service;

import upce.springeshopsem.entity.Address;

public interface AddressService {

    Address findByUserId(Long userId);

    Address update(Address address);
}

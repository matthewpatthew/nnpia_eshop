package upce.springeshopsem.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import upce.springeshopsem.entity.Purchase;
import upce.springeshopsem.repository.PurchaseRepository;
import upce.springeshopsem.service.PurchaseService;

@Service
@AllArgsConstructor
public class PurchaseServiceImpl implements PurchaseService {

    private final PurchaseRepository purchaseRepository;

    @Override
    public Purchase create(Purchase purchase) {
        return purchaseRepository.save(purchase);
    }
}

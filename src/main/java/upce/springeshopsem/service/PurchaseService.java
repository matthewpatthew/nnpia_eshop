package upce.springeshopsem.service;

import upce.springeshopsem.entity.Purchase;

import java.util.List;

public interface PurchaseService {

    Purchase create(Purchase purchase);

    List<Purchase> findByUserId(Long userId);
}

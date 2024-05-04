package upce.springeshopsem.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import upce.springeshopsem.dto.ProductInfo;
import upce.springeshopsem.dto.PurchaseRequestDto;
import upce.springeshopsem.dto.PurchaseResponseDto;
import upce.springeshopsem.entity.AppUser;
import upce.springeshopsem.entity.ProductPurchase;
import upce.springeshopsem.entity.Purchase;
import upce.springeshopsem.exception.ResourceNotFoundException;
import upce.springeshopsem.repository.ProductPurchaseRepository;
import upce.springeshopsem.service.AppUserService;
import upce.springeshopsem.service.ProductService;
import upce.springeshopsem.service.PurchaseService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/purchases")
public class PurchaseComponent {

    private final AppUserService appUserService;
    private final PurchaseService purchaseService;
    private final ProductService productService;
    private final ProductPurchaseRepository productPurchaseRepository;

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @PostMapping("")
    public ResponseEntity<Purchase> create(@RequestBody PurchaseRequestDto purchaseRequestDto) throws ResourceNotFoundException {
        AppUser user = appUserService.findById(purchaseRequestDto.getUserId());

        Purchase purchase = new Purchase();
        purchase.setCreationDate(LocalDateTime.now());
        purchase.setTotalPrice(purchaseRequestDto.getTotalPrice());
        purchase.setUser(user);

        purchaseService.create(purchase);

        List<ProductPurchase> productPurchases = new ArrayList<>();
        List<ProductInfo> productInfos = purchaseRequestDto.getProductInfo();
        for (ProductInfo productInfo : productInfos) {
            ProductPurchase productPurchase = new ProductPurchase();
            productPurchase.setProduct(productService.findById(productInfo.getProductId()));
            productPurchase.setCount(productInfo.getCount());
            productPurchase.setPurchase(purchase);
            productPurchases.add(productPurchase);
        }
        productPurchaseRepository.saveAll(productPurchases);

        return new ResponseEntity<>(purchase, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or @authServiceImpl.hasId(#userId)")
    @GetMapping("/{userId}")
    public ResponseEntity<List<PurchaseResponseDto>> findByUserId(@PathVariable Long userId) {
        List<Purchase> purchases = purchaseService.findByUserId(userId);
        List<PurchaseResponseDto> purchaseResponseDto = new ArrayList<>();
        for (Purchase purchase : purchases) {
            purchaseResponseDto.add(purchase.toDto());
        }
        return ResponseEntity.ok(purchaseResponseDto);
    }
}

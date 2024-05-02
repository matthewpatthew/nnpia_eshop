package upce.springeshopsem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PurchaseRequestDto {

    private Long userId;
    private List<ProductInfo> productInfo;
    private double totalPrice;
}

package upce.springeshopsem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class PurchaseResponseDto {

    private Long id;
    private LocalDateTime creationDate;
    private double totalPrice;
}

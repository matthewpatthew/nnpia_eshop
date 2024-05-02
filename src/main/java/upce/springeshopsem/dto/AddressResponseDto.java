package upce.springeshopsem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddressResponseDto {

    private String street;
    private String city;
    private String zipCode;
}

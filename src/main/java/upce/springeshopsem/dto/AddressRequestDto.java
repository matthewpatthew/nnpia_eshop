package upce.springeshopsem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddressRequestDto {

    private String street;
    private String city;
    private String zipCode;
}

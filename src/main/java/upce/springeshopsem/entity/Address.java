package upce.springeshopsem.entity;

import jakarta.persistence.*;
import lombok.Data;
import upce.springeshopsem.dto.AddressResponseDto;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String street;

    private String city;

    private String zipCode;

    @OneToMany(mappedBy = "address")
    private List<AppUser> users = new ArrayList<>();

    public AddressResponseDto toDto() {

        return new AddressResponseDto(
                street,
                city,
                zipCode
        );
    }
}

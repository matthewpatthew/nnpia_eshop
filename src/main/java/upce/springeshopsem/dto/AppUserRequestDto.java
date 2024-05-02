package upce.springeshopsem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AppUserRequestDto {

    private String username;
    private String password;
    private String email;
    private List<Long> userRoles;
    private String firstName;
    private String surname;
    private String phoneNumber;
}

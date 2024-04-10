package upce.springeshopsem.dto;

import lombok.Data;
import lombok.Getter;
import upce.springeshopsem.entity.AppUser;

@Data
public class AppUserResponseInputDto {
    private String username;
    private String password;
    private String email;
}

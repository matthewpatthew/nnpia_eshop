package upce.springeshopsem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AppUserResponseInputDto {
    private String username;
    private String password;
    private String email;
    private List<Long> roles;
}

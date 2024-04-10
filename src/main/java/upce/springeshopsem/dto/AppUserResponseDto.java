package upce.springeshopsem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AppUserResponseDto {
    private Long id;
    private String username;
    private String password;
    private String email;

}

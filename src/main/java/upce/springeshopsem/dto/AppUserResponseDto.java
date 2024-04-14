package upce.springeshopsem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import upce.springeshopsem.entity.Role;

import java.util.List;

@Data
@AllArgsConstructor
public class AppUserResponseDto {
    private Long id;
    private String username;
    private String email;
    private List<Role> roles;
}

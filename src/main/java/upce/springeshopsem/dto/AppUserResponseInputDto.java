package upce.springeshopsem.dto;

import lombok.Data;

import java.util.List;

@Data
public class AppUserResponseInputDto {
    private String username;
    private String password;
    private String email;
    private List<Long> roleIds;
}

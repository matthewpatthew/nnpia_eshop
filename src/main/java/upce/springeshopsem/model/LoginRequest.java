package upce.springeshopsem.model;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginRequest {

    private String username;
    private String password;
}

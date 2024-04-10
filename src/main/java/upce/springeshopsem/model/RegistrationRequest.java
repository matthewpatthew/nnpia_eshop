package upce.springeshopsem.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RegistrationRequest {

    private String username;
    private String password;
    private String email;
}

package upce.springeshopsem.service;

import upce.springeshopsem.model.LoginResponse;

public interface AuthService {

    LoginResponse login(String username, String password);

    boolean hasId(Long id);
}

package upce.springeshopsem.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import upce.springeshopsem.model.LoginResponse;
import upce.springeshopsem.model.RegistrationRequest;

public interface AuthService {

    LoginResponse login(String username, String password);

//    void registerUser(RegistrationRequest request);
//
//    void logout(HttpServletRequest request, HttpServletResponse response);
}

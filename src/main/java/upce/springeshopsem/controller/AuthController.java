package upce.springeshopsem.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import upce.springeshopsem.model.LoginRequest;
import upce.springeshopsem.model.LoginResponse;
import upce.springeshopsem.service.AuthService;
import upce.springeshopsem.service.impl.AuthServiceImpl;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Validated LoginRequest request) {
        return authService.login(request.getUsername(), request.getPassword());
    }

    //password reset
}
package upce.springeshopsem.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import upce.springeshopsem.entity.AppUser;
import upce.springeshopsem.model.LoginResponse;
import upce.springeshopsem.repository.AppUserRepository;
import upce.springeshopsem.security.JwtIssuer;
import upce.springeshopsem.security.UserPrincipal;
import upce.springeshopsem.service.AuthService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtIssuer jwtIssuer;

    private final AuthenticationManager authenticationManager;

    private final AppUserRepository appUserRepository;

    @Override
    public LoginResponse login(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();

        List<String> roles = principal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        String token = jwtIssuer.issue(principal.getUserId(), principal.getUsername(), roles);
        return LoginResponse.builder()
                .accessToken(token)
                .build();
    }

    @Override
    public boolean hasId(Long id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        String username = principal.getUsername();
        AppUser user = appUserRepository.findByUsername(username);
        return user.getId().equals(id);
    }
}

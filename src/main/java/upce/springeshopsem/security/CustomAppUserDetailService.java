package upce.springeshopsem.security;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import upce.springeshopsem.entity.AppUser;
import upce.springeshopsem.service.AppUserService;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CustomAppUserDetailService implements UserDetailsService {

    private final AppUserService appUserService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = appUserService.findByUsername(username);

        List<SimpleGrantedAuthority> userRoles = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .toList();

        return UserPrincipal.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .authorities(userRoles)
                .password(user.getPassword())
                .build();

    }
}

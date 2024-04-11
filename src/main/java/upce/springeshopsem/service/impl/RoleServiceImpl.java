package upce.springeshopsem.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import upce.springeshopsem.entity.Role;
import upce.springeshopsem.repository.RoleRepository;
import upce.springeshopsem.service.RoleService;

import java.util.*;

@Service
@AllArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public List<Role> findById(List<Long> roleIds) {
        List<Role> roles = new ArrayList<>();
        for (Long id : roleIds) {
            Optional<Role> role = roleRepository.findById(id);
            if (role.isPresent() && !roles.contains(role.get())) {
                roles.add(role.get());
            }
        }
        return roles;
    }

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }
}

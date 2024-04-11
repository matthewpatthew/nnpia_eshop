package upce.springeshopsem.service;

import upce.springeshopsem.entity.Role;

import java.util.List;

public interface RoleService {

    List<Role> findById(List<Long> roleIds);

    List<Role> findAll();
}

/*
 * Copyright 2020-2024 Steinar Bang
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations
 * under the License.
 */
package no.priv.bang.oldalbum.roleadder.test;

import java.util.Arrays;
import java.util.Map;
import java.util.Optional;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import no.priv.bang.authservice.definitions.AuthserviceException;
import no.priv.bang.osgiservice.users.Role;
import no.priv.bang.osgiservice.users.User;
import no.priv.bang.osgiservice.users.UserAndPasswords;
import no.priv.bang.osgiservice.users.UserManagementService;
import no.priv.bang.osgiservice.users.UserRoles;

@Component(immediate = true)
public class ShiroRoleAdderForOldalbumTestEnvironment {

    private UserManagementService useradmin;

    @Reference
    public void addUseradmin(UserManagementService useradmin) {
        this.useradmin = useradmin;
    }

    @Activate
    public void activate(Map<String, Object> config) {
        var allowModify = Boolean.parseBoolean((String) config.getOrDefault("allowModify", "true"));
        if (allowModify) {
            var adminusername = (String) config.getOrDefault("username", "admin");
            var adminpassword = (String) config.getOrDefault("password", "admin"); // NOSONAR hard to do anything without saying the word
            var adminuser = findAdminuser(adminusername, adminpassword);
            var role = addOldalbumadminRole();
            addRoleToAdmin(adminuser, role);
        }
    }

    User findAdminuser(String adminusername, String adminpassword) {
        var admin = getUser(adminusername);
        if (admin == null) {
            var user = User.with().userid(0).username(adminusername).email("admin@company.com").firstname("Ad").lastname("Min").build();
            var newUserWithPasswords = UserAndPasswords.with().user(user).password1(adminpassword).password2(adminpassword).build();
            var users = useradmin.addUser(newUserWithPasswords);
            Optional<User> adminOpt = users.isEmpty() ? Optional.empty() : users.stream().filter(u -> adminusername.equals(u.username())).findFirst();
            admin = adminOpt.isEmpty() ? null : adminOpt.get();
        } else {
            var userAndPasswords = UserAndPasswords.with().user(admin).password1(adminpassword).password2(adminpassword).build();
            useradmin.updatePassword(userAndPasswords);
        }

        return admin;
    }

    public Role addOldalbumadminRole() {
        var existingrole = useradmin.getRoles().stream().filter(r -> "oldalbumadmin".equals(r.rolename())).findFirst();
        if (existingrole.isPresent()) {
            return existingrole.get();
        }

        var role = Role.with().id(0).rolename("oldalbumadmin").description("Created by oldalbum.roleadder.test").build();
        useradmin.addRole(role);
        return role;
    }

    public UserRoles addRoleToAdmin(User admin, Role role) {
        if (admin == null) {
            return null;
        }

        var adminroles = UserRoles.with().user(admin).roles(Arrays.asList(role)).build();
        useradmin.addUserRoles(adminroles);
        return adminroles;
    }

    private User getUser(String adminusername) {
        try {
            return useradmin.getUser(adminusername);
        } catch (AuthserviceException e) {
            return null;
        }
    }

}

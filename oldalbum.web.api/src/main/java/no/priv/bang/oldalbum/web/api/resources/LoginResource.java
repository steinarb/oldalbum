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
package no.priv.bang.oldalbum.web.api.resources;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.util.WebUtils;
import org.osgi.service.log.LogService;
import org.osgi.service.log.Logger;

import no.priv.bang.oldalbum.services.OldAlbumService;
import no.priv.bang.oldalbum.services.bean.Credentials;
import no.priv.bang.oldalbum.services.bean.LoginResult;
import no.priv.bang.osgiservice.users.UserManagementService;



@Path("")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class LoginResource {

    Logger logger;

    @Inject
    public UserManagementService useradmin;

    @Inject
    public OldAlbumService oldalbum;

    @Inject
    void setLogservice(LogService logservice) {
        this.logger = logservice.getLogger(getClass());
    }

    @GET
    @Path("/login")
    public LoginResult loginCheck() {
        var subject = SecurityUtils.getSubject();
        var remembered = subject.isAuthenticated();
        var canModifyAlbum = checkIfUserCanModifyAlbum(subject);
        var canLogin = shiroRoleOldalbumadminExists();
        return LoginResult.with()
            .success(remembered)
            .username((String) subject.getPrincipal())
            .errormessage("")
            .canModifyAlbum(remembered && canModifyAlbum)
            .canLogin(canLogin)
            .build();
    }

    @GET
    @Path("/logout")
    public LoginResult logout(Credentials credentials) {
        var subject = SecurityUtils.getSubject();
        subject.logout();
        var canLogin = shiroRoleOldalbumadminExists();

        return LoginResult.with().success(false).errormessage("Logged out").canModifyAlbum(false).canLogin(canLogin).build();
    }

    @GET
    @Path("/clearoriginalrequesturl")
    public LoginResult clearOriginalRequestUrl() {
        WebUtils.getAndClearSavedRequest(null);
        return loginCheck();
    }

    private boolean checkIfUserCanModifyAlbum(Subject subject) {
        try {
            subject.checkRole("oldalbumadmin");
            return true;
        } catch (AuthorizationException e) {
            // Skip and continue
        }

        return false;
    }

    private boolean shiroRoleOldalbumadminExists() {
        return useradmin.getRoles().stream().anyMatch(r -> "oldalbumadmin".equals(r.rolename()));
    }

}

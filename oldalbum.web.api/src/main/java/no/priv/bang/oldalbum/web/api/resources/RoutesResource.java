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

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.apache.shiro.SecurityUtils;
import static javax.ws.rs.core.MediaType.*;

import no.priv.bang.oldalbum.services.OldAlbumService;
import no.priv.bang.oldalbum.services.ReloadableShiroFilter;
import no.priv.bang.oldalbum.services.bean.AlbumEntry;

@Path("")
@Produces(APPLICATION_JSON)
public class RoutesResource {

    @Inject
    public OldAlbumService oldAlbumService;

    @Inject
    ReloadableShiroFilter shiroFilter;

    @Path("allroutes")
    @GET
    public List<AlbumEntry> allroutes() {
        var subject = SecurityUtils.getSubject();
        var username = (String) subject.getPrincipal();
        var isLoggedIn = subject.isAuthenticated();
        return oldAlbumService.fetchAllRoutes(username, isLoggedIn);
    }

    @Path("dumproutessql")
    @GET
    @Produces("application/sql")
    public String dumpSql() {
        var subject = SecurityUtils.getSubject();
        var username = (String) subject.getPrincipal();
        var isLoggedIn = subject.isAuthenticated() || subject.isRemembered();
        return oldAlbumService.dumpDatabaseSql(username, isLoggedIn);
    }

    @Path("reloadshiroconfig")
    @GET
    @Produces(TEXT_PLAIN)
    public Response reloadShiroConfig() {
        if (shiroFilter.reloadConfiguration()) {
            return Response.ok("SHIRO FILTER RELOAD SUCCESS").build();
        }

        return Response.serverError().entity("SHIRO FILTER RELOAD FAILURE").build();
    }

}

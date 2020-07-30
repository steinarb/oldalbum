/*
 * Copyright 2020 Steinar Bang
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
package no.priv.bang.oldalbum.web.frontend;

import javax.servlet.Servlet;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import static org.osgi.service.http.whiteboard.HttpWhiteboardConstants.*;

import java.util.List;

import org.osgi.service.log.LogService;import no.priv.bang.oldalbum.services.OldAlbumService;
import no.priv.bang.servlet.frontend.FrontendServlet;

@Component(
    property= {
        HTTP_WHITEBOARD_SERVLET_PATTERN+"=/*",
        HTTP_WHITEBOARD_CONTEXT_SELECT + "=(" + HTTP_WHITEBOARD_CONTEXT_NAME +"=oldalbum)",
        HTTP_WHITEBOARD_SERVLET_NAME+"=oldalbum"},
    service=Servlet.class,
    immediate=true
)
public class OldalbumServlet extends FrontendServlet {
    private static final long serialVersionUID = -2378206477575636399L;
    private OldAlbumService oldalbum; // NOSONAR set by OSGi dependency injection and not touched after that

    public OldalbumServlet() {
        super();
    }

    @Override
    @Reference
    public void setLogService(LogService logservice) {
        super.setLogService(logservice);
    }

    @Reference
    public void setOldalbumService(OldAlbumService oldalbum) {
        this.oldalbum = oldalbum;
    }

    @Activate
    public void activate() {
        // Called when the DS component is activated
    }

    @Override
    public List<String> getRoutes() {
        return oldalbum.getPaths();
    }

}
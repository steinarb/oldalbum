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
package no.priv.bang.oldalbum.web.frontend;

import javax.servlet.Servlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import static javax.servlet.http.HttpServletResponse.*;

import org.apache.shiro.SecurityUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.http.whiteboard.propertytypes.HttpWhiteboardContextSelect;
import org.osgi.service.http.whiteboard.propertytypes.HttpWhiteboardServletName;
import org.osgi.service.http.whiteboard.propertytypes.HttpWhiteboardServletPattern;

import static org.osgi.service.http.whiteboard.HttpWhiteboardConstants.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.osgi.service.log.LogService;import no.priv.bang.oldalbum.services.OldAlbumService;
import no.priv.bang.oldalbum.services.bean.AlbumEntry;
import no.priv.bang.servlet.frontend.FrontendServlet;

@Component(service=Servlet.class, immediate=true)
@HttpWhiteboardContextSelect("(" + HTTP_WHITEBOARD_CONTEXT_NAME + "=oldalbum)")
@HttpWhiteboardServletName("oldalbum")
@HttpWhiteboardServletPattern("/*")
public class OldalbumServlet extends FrontendServlet {
    private static final long serialVersionUID = -2378206477575636399L;
    private OldAlbumService oldalbum; // NOSONAR set by OSGi dependency injection and not touched after that

    public OldalbumServlet() {
        super();
        setRoutes(
            "/login",
            "/unauthorized",
            "/modifyalbum",
            "/addalbum",
            "/modifypicture",
            "/addpicture");
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
        return combineDynamicAndStaticRoutes();
    }

    private List<String> combineDynamicAndStaticRoutes() {
        var subject = SecurityUtils.getSubject();
        var isLoggedIn = subject.isAuthenticated() || subject.isRemembered();
        var dynamicroutes = oldalbum.getPaths(isLoggedIn);
        var staticroutes = super.getRoutes();
        var numberOfRoutes = dynamicroutes.size() + staticroutes.size();
        var allroutes = new ArrayList<String>(numberOfRoutes);
        allroutes.addAll(dynamicroutes);
        allroutes.addAll(staticroutes);
        return allroutes;
    }

    @Override
    protected boolean thisIsAResourceThatShouldBeProcessed(HttpServletRequest request, String pathInfo, String resource, String contentType) {
        return "index.html".equals(resource);
    }

    @Override
    protected void processResource(HttpServletResponse response, HttpServletRequest request, String pathInfo, String resource, String contentType) throws IOException {
        var entry = oldalbum.getAlbumEntryFromPath(pathInfo);
        response.setStatus(SC_OK);
        response.setContentType(contentType);
        setLastModifiedHeader(response, entry);
        var html = loadHtmlFile(resource);
        addMetaTagIfNotEmpty(html, "og:url", request.getRequestURL().toString());
        addOpenGraphHeaderElements(html, entry);
        html.outputSettings().syntax(Document.OutputSettings.Syntax.xml);
        try(var body = response.getOutputStream()) {
            body.print(html.outerHtml());
        }
    }

    @Override
    protected void handleResourceNotFound(HttpServletResponse response, String resource) throws IOException {
        response.setStatus(SC_NOT_FOUND);
        response.setContentType("text/html");
        try(var responseBody = response.getOutputStream()) {
            try(var resourceFromClasspath = getClass().getClassLoader().getResourceAsStream("index.html")) {
                copyStream(resourceFromClasspath, responseBody);
            }
        }
    }

    private void setLastModifiedHeader(HttpServletResponse response, AlbumEntry entry) {
        if (entry != null && entry.lastModified() != null) {
            response.setDateHeader("Last-Modified", entry.lastModified().toInstant().toEpochMilli());
        }
    }

    void addOpenGraphHeaderElements(Document html, AlbumEntry entry) {
        if (entry != null) {
            setTitleIfNotEmpty(html, entry.title());
            setDescriptionIfNotEmpty(html, entry.description());
            addMetaTagIfNotEmpty(html, "og:title", entry.title());
            addMetaTagIfNotEmpty(html, "og:description", entry.description());
            addMetaTagIfNotEmpty(html, "og:image", entry.imageUrl());
            addMetaTagIfNotEmpty(html, "twitter:card", "summary_large_image");
            addMetaTagIfNotEmpty(html, "twitter:title", entry.title());
            addMetaTagIfNotEmpty(html, "twitter:description", entry.description());
            addMetaTagIfNotEmpty(html, "twitter:image", entry.imageUrl());
            if (entry.album()) {
                var children = oldalbum.getChildren(entry.id());
                if (!children.isEmpty()) {
                    for(AlbumEntry child : children) {
                        addMetaTagIfNotEmpty(html, "og:image", child.imageUrl());
                    }
                }
            }
        }

    }

    private void setTitleIfNotEmpty(Document html, String title) {
        if (!nullOrEmpty(title)) {
            var titles = html.head().getElementsByTag("title");
            titles.first().text(title);
        }
    }

    private void setDescriptionIfNotEmpty(Document html, String description) {
        if (!nullOrEmpty(description)) {
            html.head().appendElement("meta").attr("name", "description").attr("content", description).attr("data-react-helmet", "true");
        }
    }

    protected void addMetaTagIfNotEmpty(Document html, String property, String content) {
        var propertyAttribute = property.startsWith("twitter:") ? "name" : "property";
        if (content != null && !content.isEmpty()) {
            html.head().appendElement("meta").attr(propertyAttribute, property).attr("content", content);
        }
    }

    protected Document loadHtmlFile(String htmlFile) throws IOException {
        try (var body = getClasspathResource(htmlFile)) {
            return Jsoup.parse(body, "UTF-8", "");
        }
    }

    InputStream getClasspathResource(String resource) {
        return getClass().getClassLoader().getResourceAsStream(resource);
    }

    static boolean nullOrEmpty(String s) {
        return s == null || s.isBlank();
    }

}

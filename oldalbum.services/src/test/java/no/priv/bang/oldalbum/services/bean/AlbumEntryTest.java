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
package no.priv.bang.oldalbum.services.bean;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Date;

import org.junit.jupiter.api.Test;

class AlbumEntryTest {

    @Test
    void testAlbumEntry() {
        var id = 1;
        var parent = 2;
        var path = "/album/bilde01";
        var album = true;
        var title = "Album";
        var description = "This is an album";
        var imageUrl = "https://www.bang.priv.no/sb/pics/moto/vfr96/acirc1.jpg";
        var thumbnailUrl = "https://www.bang.priv.no/sb/pics/moto/vfr96/icons/acirc1.gif";
        var sort = 1;
        var childcount = 4;
        var lastmodified = new Date(800275785000L);
        var contenttype = "image/jpeg";
        var contentlength = 128186;
        var requirelogin = true;
        var groupByYear = true;
        var bean = AlbumEntry.with()
            .id(id)
            .parent(parent)
            .path(path)
            .album(album)
            .title(title)
            .description(description)
            .imageUrl(imageUrl)
            .thumbnailUrl(thumbnailUrl)
            .sort(sort)
            .lastModified(lastmodified)
            .contentType(contenttype)
            .contentLength(contentlength)
            .requireLogin(requirelogin)
            .groupByYear(groupByYear)
            .childcount(childcount)
            .build();
        assertEquals(id, bean.getId());
        assertEquals(parent, bean.getParent());
        assertEquals(path, bean.getPath());
        assertEquals(album, bean.isAlbum());
        assertEquals(title, bean.getTitle());
        assertEquals(description, bean.getDescription());
        assertEquals(imageUrl, bean.getImageUrl());
        assertEquals(thumbnailUrl, bean.getThumbnailUrl());
        assertEquals(sort, bean.getSort());
        assertEquals(childcount, bean.getChildcount());
        assertEquals(lastmodified, bean.getLastModified());
        assertEquals(contenttype, bean.getContentType());
        assertEquals(contentlength, bean.getContentLength());
        assertEquals(requirelogin, bean.isRequireLogin());
        assertEquals(groupByYear, bean.getGroupByYear());
        assertThat(bean.toString()).startsWith("AlbumEntry [id=");
    }

    @Test
    void testAlbumEntryNoArgsConstructor() {
        var bean = AlbumEntry.with().build();
        assertEquals(-1, bean.getId());
        assertNull(bean.getPath());
        assertFalse(bean.isAlbum());
        assertNull(bean.getTitle());
        assertNull(bean.getDescription());
        assertNull(bean.getImageUrl());
        assertNull(bean.getThumbnailUrl());
        assertEquals(0, bean.getSort());
        assertEquals(0, bean.getChildcount());
        assertNull(bean.getLastModified());
        assertNull(bean.getContentType());
        assertEquals(0, bean.getContentLength());
        assertFalse(bean.isRequireLogin());
        assertNull(bean.getGroupByYear());
    }

    @Test
    void testAlbumEntryCopyBuilder() {
        var originalBean = AlbumEntry.with()
            .id(1)
            .parent(2)
            .path("/album/bilde01")
            .album(true)
            .title("Album")
            .description("This is an album")
            .imageUrl("https://www.bang.priv.no/sb/pics/moto/vfr96/acirc1.jpg")
            .thumbnailUrl("https://www.bang.priv.no/sb/pics/moto/vfr96/icons/acirc1.gif")
            .sort(1)
            .lastModified(new Date(800275785000L))
            .contentType("image/jpeg")
            .contentLength(128186)
            .requireLogin(true)
            .groupByYear(true)
            .childcount(4)
            .build();
        var bean = AlbumEntry.with(originalBean).build();
        assertEquals(originalBean.getId(), bean.getId());
        assertEquals(originalBean.getParent(), bean.getParent());
        assertEquals(originalBean.getPath(), bean.getPath());
        assertEquals(originalBean.isAlbum(), bean.isAlbum());
        assertEquals(originalBean.getTitle(), bean.getTitle());
        assertEquals(originalBean.getDescription(), bean.getDescription());
        assertEquals(originalBean.getImageUrl(), bean.getImageUrl());
        assertEquals(originalBean.getThumbnailUrl(), bean.getThumbnailUrl());
        assertEquals(originalBean.getSort(), bean.getSort());
        assertEquals(originalBean.getChildcount(), bean.getChildcount());
        assertEquals(originalBean.getLastModified(), bean.getLastModified());
        assertEquals(originalBean.getContentType(), bean.getContentType());
        assertEquals(originalBean.getContentLength(), bean.getContentLength());
        assertEquals(originalBean.isRequireLogin(), bean.isRequireLogin());
        assertEquals(originalBean.getGroupByYear(), bean.getGroupByYear());
    }

}

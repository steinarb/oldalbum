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

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Date;
import org.junit.jupiter.api.Test;

import no.priv.bang.oldalbum.services.OldAlbumService;
import no.priv.bang.oldalbum.services.bean.AlbumEntry;
import no.priv.bang.oldalbum.services.bean.BatchAddPicturesRequest;

class AlbumentryResourceTest {

    @Test
    void testModifyalbum() {
        var modifiedAlbum = AlbumEntry.with().id(2).parent(1).path("/moto/").album(true).title("Album has been updated").description("This is an updated description").sort(1).childcount(2).build();
        var resource = new AlbumentryResource();
        var oldalbum = mock(OldAlbumService.class);
        when(oldalbum.updateEntry(any())).thenReturn(Arrays.asList(modifiedAlbum));
        resource.oldalbum = oldalbum;
        var allroutes = resource.modifyalbum(modifiedAlbum);
        var updatedAlbum = allroutes.stream().filter(r -> r.id() == 2).findFirst().get();
        assertEquals(modifiedAlbum.title(), updatedAlbum.title());
        assertEquals(modifiedAlbum.description(), updatedAlbum.description());
    }

    @Test
    void testAddalbum() {
        var albumToAdd = AlbumEntry.with().parent(1).path("/newalbum/").album(true).title("A new album").description("A new album for new pictures").sort(2).build();
        var resource = new AlbumentryResource();
        var oldalbum = mock(OldAlbumService.class);
        when(oldalbum.addEntry(any())).thenReturn(Arrays.asList(albumToAdd));
        resource.oldalbum = oldalbum;
        var allroutes = resource.addalbum(albumToAdd);
        var addedAlbum = allroutes.stream().filter(r -> "/newalbum/".equals(r.path())).findFirst().get();
        assertEquals(albumToAdd.title(), addedAlbum.title());
        assertEquals(albumToAdd.description(), addedAlbum.description());
    }

    @Test
    void testModifypicture() {
        var modifiedPicture = AlbumEntry.with().id(2).parent(1).path("/moto/vfr96/acirc1").album(false).title("Picture has been updated").description("This is an updated picture description").imageUrl("https://www.bang.priv.no/sb/pics/moto/vfr96/acirc1.jpg").thumbnailUrl("https://www.bang.priv.no/sb/pics/moto/vfr96/icons/acirc1.gif").sort(1).lastModified(new Date()).contentType("image/jpeg").contentLength(71072).build();
        var resource = new AlbumentryResource();
        var oldalbum = mock(OldAlbumService.class);
        when(oldalbum.updateEntry(any())).thenReturn(Arrays.asList(modifiedPicture));
        resource.oldalbum = oldalbum;
        var allroutes = resource.modifypicture(modifiedPicture);
        var updatedPicture = allroutes.stream().filter(r -> r.id() == 2).findFirst().get();
        assertEquals(modifiedPicture.title(), updatedPicture.title());
        assertEquals(modifiedPicture.description(), updatedPicture.description());
    }

    @Test
    void testTogglepasswordprotection() {
        var pictureWithToggledPasswordProtection = AlbumEntry.with().id(2).parent(1).path("/moto/vfr96/acirc1").album(false).title("Picture has been updated").description("This is an updated picture description").imageUrl("https://www.bang.priv.no/sb/pics/moto/vfr96/acirc1.jpg").thumbnailUrl("https://www.bang.priv.no/sb/pics/moto/vfr96/icons/acirc1.gif").sort(1).lastModified(new Date()).contentType("image/jpeg").contentLength(71072).requireLogin(true).build();
        var resource = new AlbumentryResource();
        var oldalbum = mock(OldAlbumService.class);
        when(oldalbum.toggleEntryPasswordProtection(anyInt())).thenReturn(Arrays.asList(pictureWithToggledPasswordProtection));
        resource.oldalbum = oldalbum;
        var allroutes = resource.togglepasswordprotection(pictureWithToggledPasswordProtection.id());
        var updatedPicture = allroutes.stream().filter(r -> r.id() == 2).findFirst().get();
        assertTrue(updatedPicture.requireLogin());
    }

    @Test
    void testAddpicture() {
        var pictureToAdd = AlbumEntry.with().id(2).parent(1).path("/moto/vfr96/acirc1").album(false).title("Picture has been updated").description("This is an updated picture description").imageUrl("https://www.bang.priv.no/sb/pics/moto/vfr96/acirc1.jpg").thumbnailUrl("https://www.bang.priv.no/sb/pics/moto/vfr96/icons/acirc1.gif").sort(1).lastModified(new Date()).contentType("image/jpeg").contentLength(71072).build();
        var resource = new AlbumentryResource();
        var oldalbum = mock(OldAlbumService.class);
        when(oldalbum.addEntry(any())).thenReturn(Arrays.asList(pictureToAdd));
        resource.oldalbum = oldalbum;
        var allroutes = resource.addpicture(pictureToAdd);
        var updatedPicture = allroutes.stream().filter(r -> "/moto/vfr96/acirc1".equals(r.path())).findFirst().get();
        assertEquals(pictureToAdd.title(), updatedPicture.title());
        assertEquals(pictureToAdd.description(), updatedPicture.description());
    }

    @Test
    void testBatchAddpictures() {
        var request = BatchAddPicturesRequest.with()
            .parent(1)
            .batchAddUrl("http://lorenzo.hjemme.lan/bilder/202349_001396/Export%20JPG%2016Base/")
            .build();
        var resource = new AlbumentryResource();
        var oldalbum = mock(OldAlbumService.class);
        when(oldalbum.batchAddPictures(any())).thenReturn(Arrays.asList(AlbumEntry.with().build(), AlbumEntry.with().build()));
        resource.oldalbum = oldalbum;
        var allroutes = resource.batchAddPictures(request);
        assertThat(allroutes).hasSize(2);
    }

    @Test
    void testSortAlbumEntriesByDate() {
        var request = AlbumEntry.with()
            .id(1)
            .build();
        var resource = new AlbumentryResource();
        var oldalbum = mock(OldAlbumService.class);
        when(oldalbum.sortByDate(anyInt())).thenReturn(Arrays.asList(AlbumEntry.with().build(), AlbumEntry.with().build()));
        resource.oldalbum = oldalbum;
        var allroutes = resource.sortAlbumByDate(request);
        assertThat(allroutes).hasSize(2);
    }

    @Test
    void testDeleteEntry() {
        var pictureToDelete = AlbumEntry.with().id(7).parent(3).path("/oldalbum/moto/places/grava3").album(false).title("").description("Tyrigrava, view from the north. Lotsa bikes here too").imageUrl("https://www.bang.priv.no/sb/pics/moto/places/grava3.jpg").thumbnailUrl("https://www.bang.priv.no/sb/pics/moto/places/icons/grava3.gif").sort(1).lastModified(new Date()).contentType("image/jpeg").contentLength(71072).build();
        var resource = new AlbumentryResource();
        var oldalbum = mock(OldAlbumService.class);
        resource.oldalbum = oldalbum;
        var allroutes = resource.deleteEntry(pictureToDelete);
        assertEquals(0, allroutes.size());
    }

    @Test
    void testDeleteSelection() {
        var selection = Arrays.asList(7);
        var resource = new AlbumentryResource();
        var oldalbum = mock(OldAlbumService.class);
        resource.oldalbum = oldalbum;
        var allroutes = resource.deleteSelection(selection);
        assertThat(allroutes).isEmpty();
    }

    @Test
    void testMoveEntryUp() {
        var albumToMove = AlbumEntry.with().id(2).parent(1).path("/moto/").album(true).title("Album has been updated").description("This is an updated description").sort(2).childcount(2).build();
        var movedAlbum = AlbumEntry.with().id(2).parent(1).path("/moto/").album(true).title("Album has been updated").description("This is an updated description").sort(1).childcount(2).build();
        var resource = new AlbumentryResource();
        var oldalbum = mock(OldAlbumService.class);
        when(oldalbum.moveEntryUp(any())).thenReturn(Arrays.asList(movedAlbum));
        resource.oldalbum = oldalbum;
        var allroutes = resource.moveEntryUp(albumToMove);
        var updatedAlbum = allroutes.stream().filter(r -> r.id() == 2).findFirst().get();
        assertThat(albumToMove.sort()).isGreaterThan(updatedAlbum.sort());
    }

    @Test
    void testMoveEntryDown() {
        var albumToMove = AlbumEntry.with().id(2).parent(1).path("/moto/").album(true).title("Album has been updated").description("This is an updated description").sort(1).childcount(2).build();
        var movedAlbum = AlbumEntry.with().id(2).parent(1).path("/moto/").album(true).title("Album has been updated").description("This is an updated description").sort(2).childcount(2).build();
        var resource = new AlbumentryResource();
        var oldalbum = mock(OldAlbumService.class);
        when(oldalbum.moveEntryDown(any())).thenReturn(Arrays.asList(movedAlbum));
        resource.oldalbum = oldalbum;
        var allroutes = resource.moveEntryDown(albumToMove);
        var updatedAlbum = allroutes.stream().filter(r -> r.id() == 2).findFirst().get();
        assertThat(albumToMove.sort()).isLessThan(updatedAlbum.sort());
    }

}

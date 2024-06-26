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

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class LoginResultTest {

    @Test
    void testCreate() {
        var success = true;
        var username = "admin";
        var errormessage = "Wrong password";
        var canModifyAlbum = true;
        var canLogin = true;
        var originalRequestUri = "/oldalbum/slides/";
        var bean = LoginResult.with()
            .success(success)
            .username(username)
            .errormessage(errormessage)
            .canModifyAlbum(canModifyAlbum)
            .canLogin(canLogin)
            .originalRequestUri(originalRequestUri)
            .build();
        assertTrue(bean.success());
        assertEquals(username, bean.username());
        assertEquals(errormessage, bean.errormessage());
        assertTrue(bean.canModifyAlbum());
        assertTrue(bean.canLogin());
        assertEquals(originalRequestUri, bean.originalRequestUri());
    }

    @Test
    void testNoargsConstructor() {
        var bean = LoginResult.with().build();
        assertFalse(bean.success());
        assertNull(bean.username());
        assertNull(bean.errormessage());
        assertFalse(bean.canModifyAlbum());
        assertFalse(bean.canLogin());
        assertNull(bean.originalRequestUri());
    }

}

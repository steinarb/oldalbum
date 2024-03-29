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

import no.priv.bang.beans.immutable.Immutable;

public class ImageRequest extends Immutable { // NOSONAR Immutable handles added fields

    private String url;

    private ImageRequest() {}

    public String getUrl() {
        return url;
    }

    public static ImageRequestBuilder with() {
        return new ImageRequestBuilder();
    }

    public static class ImageRequestBuilder {
        private String url;

        private ImageRequestBuilder() {}

        public ImageRequest build() {
            var imageRequest = new ImageRequest();
            imageRequest.url = this.url;
            return imageRequest;
        }

        public ImageRequestBuilder url(String url) {
            this.url = url;
            return this;
        }
    }

}

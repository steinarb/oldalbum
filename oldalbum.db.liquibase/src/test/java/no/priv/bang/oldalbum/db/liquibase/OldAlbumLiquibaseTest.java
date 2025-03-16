/*
 * Copyright 2020-2025 Steinar Bang
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
package no.priv.bang.oldalbum.db.liquibase;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.db.api.Assertions.assertThat;
import java.sql.Connection;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;
import java.util.Properties;

import javax.sql.DataSource;

import org.assertj.db.type.AssertDbConnectionFactory;
import org.junit.jupiter.api.Test;
import org.ops4j.pax.jdbc.derby.impl.DerbyDataSourceFactory;
import org.osgi.service.jdbc.DataSourceFactory;

class OldAlbumLiquibaseTest {
    DataSourceFactory derbyDataSourceFactory = new DerbyDataSourceFactory();

    @Test
    void testCreateAndUpdateSchema() throws Exception {
        var datasource = createDatasource("oldalbum");
        var assertjConnection = AssertDbConnectionFactory.of(datasource).create();
        var oldAlbumLiquibase = new OldAlbumLiquibase();
        try(var connection = datasource.getConnection()) {
            oldAlbumLiquibase.createInitialSchema(connection);
        }

        var albumentries1 = assertjConnection.table("albumentries").build();
        assertThat(albumentries1).exists().isEmpty();

        try(var connection = datasource.getConnection()) {
            addAlbumEntries(connection);
        }

        var albumentries2 = assertjConnection.table("albumentries").build();
        assertThat(albumentries2).exists().hasNumberOfRows(2)
            .row(0)
            .value("albumentry_id").isEqualTo(1)
            .value("parent").isEqualTo(0)
            .value("localpath").isEqualTo("/album/")
            .value("album").isTrue()
            .value("title").isEqualTo("Album")
            .value("description").isEqualTo("This is an album")
            .value("imageurl").isNull()
            .value("thumbnailurl").isNull()
            .value("sort").isEqualTo(1)
            .value("lastmodified").isNull()
            .value("contenttype").isNull()
            .value("contentlength").isEqualTo(0)
            .row(1)
            .value("albumentry_id").isEqualTo(2)
            .value("parent").isEqualTo(1)
            .value("localpath").isEqualTo("/album/bilde01")
            .value("album").isFalse()
            .value("title").isEqualTo("VFR at Arctic Circle")
            .value("description").isEqualTo("This is the VFR up north")
            .value("imageurl").isEqualTo("https://www.bang.priv.no/sb/pics/moto/vfr96/acirc1.jpg")
            .value("thumbnailurl").isEqualTo("https://www.bang.priv.no/sb/pics/moto/vfr96/icons/acirc1.gif")
            .value("sort").isEqualTo(2)
            .value("lastmodified").isEqualTo(new Timestamp(800275785000L))
            .value("contenttype").isEqualTo("image/jpeg")
            .value("contentlength").isEqualTo(128186);

        // Verify that albumentries is missing columns require_login and group_by_year
        assertThat(albumentries2.getColumnsList().stream().map(c -> c.getName().toLowerCase()))
            .doesNotContain("require_login", "group_by_year");

        try(var connection = datasource.getConnection()) {
            oldAlbumLiquibase.updateSchema(connection);
        }

        // Verify that albumentries now has columns require_login and group_by_year
        var albumentries3 = assertjConnection.table("albumentries").build();
        assertThat(albumentries3.getColumnsList().stream().map(c -> c.getName().toLowerCase()))
            .contains("require_login", "group_by_year");

        // Verify that new columns have expected defaults
        assertThat(albumentries3).exists().hasNumberOfRows(2)
            .row(0)
            .value("albumentry_id").isEqualTo(1)
            .value("parent").isEqualTo(0)
            .value("localpath").isEqualTo("/album/")
            .value("album").isTrue()
            .value("title").isEqualTo("Album")
            .value("description").isEqualTo("This is an album")
            .value("imageurl").isNull()
            .value("thumbnailurl").isNull()
            .value("sort").isEqualTo(1)
            .value("lastmodified").isNull()
            .value("contenttype").isNull()
            .value("contentlength").isEqualTo(0)
            .value("require_login").isFalse()
            .value("group_by_year").isNull()
            .row(1)
            .value("albumentry_id").isEqualTo(2)
            .value("parent").isEqualTo(1)
            .value("localpath").isEqualTo("/album/bilde01")
            .value("album").isFalse()
            .value("title").isEqualTo("VFR at Arctic Circle")
            .value("description").isEqualTo("This is the VFR up north")
            .value("imageurl").isEqualTo("https://www.bang.priv.no/sb/pics/moto/vfr96/acirc1.jpg")
            .value("thumbnailurl").isEqualTo("https://www.bang.priv.no/sb/pics/moto/vfr96/icons/acirc1.gif")
            .value("sort").isEqualTo(2)
            .value("lastmodified").isEqualTo(new Timestamp(800275785000L))
            .value("contenttype").isEqualTo("image/jpeg")
            .value("contentlength").isEqualTo(128186)
            .value("require_login").isFalse()
            .value("group_by_year").isNull();
    }

    private void addAlbumEntries(Connection connection) throws Exception {
        addAlbumEntry(connection, 0, "/album/", true, "Album", "This is an album", null, null, 1, null, null, 0);
        addAlbumEntry(connection, 1, "/album/bilde01", false, "VFR at Arctic Circle", "This is the VFR up north", "https://www.bang.priv.no/sb/pics/moto/vfr96/acirc1.jpg", "https://www.bang.priv.no/sb/pics/moto/vfr96/icons/acirc1.gif", 2, new Date(800275785000L), "image/jpeg", 128186);
    }

    private void addAlbumEntry(Connection connection, int parent, String path, boolean album, String title, String description, String imageUrl, String thumbnailUrl, int sort, Date lastmodified, String contenttype, int size) throws Exception {
        var sql = "insert into albumentries (parent, localpath, album, title, description, imageurl, thumbnailurl, sort, lastmodified, contenttype, contentlength) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try(var statement = connection.prepareStatement(sql)) {
            statement.setInt(1, parent);
            statement.setString(2, path);
            statement.setBoolean(3, album);
            statement.setString(4, title);
            statement.setString(5, description);
            statement.setString(6, imageUrl);
            statement.setString(7, thumbnailUrl);
            statement.setInt(8, sort);
            statement.setTimestamp(9, lastmodified != null ? Timestamp.from(Instant.ofEpochMilli(lastmodified.getTime())) : null);
            statement.setString(10, contenttype);
            statement.setInt(11, size);
            statement.executeUpdate();
        }
    }

    private DataSource createDatasource(String dbname) throws Exception {
        var properties = new Properties();
        properties.setProperty(DataSourceFactory.JDBC_URL, "jdbc:derby:memory:" + dbname + ";create=true");
        return derbyDataSourceFactory.createDataSource(properties);
    }
}

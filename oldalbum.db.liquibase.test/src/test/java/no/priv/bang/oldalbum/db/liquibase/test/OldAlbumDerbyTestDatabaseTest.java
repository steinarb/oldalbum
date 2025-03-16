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
package no.priv.bang.oldalbum.db.liquibase.test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.db.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

import javax.sql.DataSource;

import org.assertj.db.type.AssertDbConnectionFactory;
import org.junit.jupiter.api.Test;
import org.ops4j.pax.jdbc.derby.impl.DerbyDataSourceFactory;
import org.osgi.service.jdbc.DataSourceFactory;

import no.priv.bang.oldalbum.db.liquibase.OldAlbumLiquibase;
import no.priv.bang.osgi.service.mocks.logservice.MockLogService;

class OldAlbumDerbyTestDatabaseTest {
    private static final int EXPECTED_NUMBER_OF_ALBUMENTRIES = 26;
    DataSourceFactory derbyDataSourceFactory = new DerbyDataSourceFactory();

    @Test
    void testPrepare() throws Exception {
        var datasource = createDataSource("oldalbum");
        var assertjConnection = AssertDbConnectionFactory.of(datasource).create();
        var logservice = new MockLogService();
        var hook = new OldAlbumDerbyTestDatabase();
        hook.setLogService(logservice);
        hook.activate();
        hook.prepare(datasource);

        var albumentries = assertjConnection.table("albumentries").build();
        assertThat(albumentries).exists().hasNumberOfRows(EXPECTED_NUMBER_OF_ALBUMENTRIES);
    }

    @Test
    void testCreateInitialSchemaWithLiquibaseException() throws Exception {
        var datasource = mock(DataSource.class);
        var connection = mock(Connection.class);
        when (connection.getMetaData()).thenThrow(SQLException.class);
        when(datasource.getConnection()).thenReturn(connection);
        var logservice = new MockLogService();
        var hook = new OldAlbumDerbyTestDatabase();
        var liquibase = new OldAlbumLiquibase();
        hook.setLogService(logservice);
        hook.activate();
        hook.createInitialSchema(datasource, liquibase);
        assertEquals(1, logservice.getLogmessages().size());
    }

    @Test
    void testInsertMockDataWithLiquibaseException() throws Exception {
        var datasource = createDataSource("dbwithoutschema"); // An empty database that has no schema, will cause LiquibaseException when attempting to insert
        var logservice = new MockLogService();
        var liquibase = new OldAlbumLiquibase();
        var hook = new OldAlbumDerbyTestDatabase();
        hook.setLogService(logservice);
        hook.insertMockData(datasource, liquibase);
        assertEquals(1, logservice.getLogmessages().size());
    }

    @Test
    void testUpdateSchemaAndAddMoreDataWithLiquibaseException() throws Exception {
        var connectionThrowsExceptionOnMetadata = mock(Connection.class);
        when (connectionThrowsExceptionOnMetadata.getMetaData()).thenThrow(SQLException.class);
        var datasource = spy(createDataSource("oldalbum1"));
        when(datasource.getConnection())
            .thenCallRealMethod()
            .thenCallRealMethod()
            .thenReturn(connectionThrowsExceptionOnMetadata);
        var logservice = new MockLogService();
        var hook = new OldAlbumDerbyTestDatabase();
        hook.setLogService(logservice);
        hook.activate();

        hook.prepare(datasource);

        // Since no exceptions are thrown this will log error both on
        // updating the schema and when inserting additional data
        var logmessages = logservice.getLogmessages();
        assertEquals(2, logmessages.size());
        assertThat(logmessages.get(0)).startsWith("[ERROR] Error updating schema of oldalbum derby test database");
        assertThat(logmessages.get(1)).startsWith("[ERROR] Error populating oldalbum derby test database with additional dummy data after schema update");
    }

    private DataSource createDataSource(String dbname) throws Exception {
        var properties = new Properties();
        properties.setProperty(DataSourceFactory.JDBC_URL, "jdbc:derby:memory:" + dbname + ";create=true");
        return derbyDataSourceFactory.createDataSource(properties);
    }

}

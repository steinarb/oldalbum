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
package no.priv.bang.oldalbum.db.liquibase.urlinit;

import java.sql.SQLException;

import javax.sql.DataSource;

import org.ops4j.pax.jdbc.hook.PreHook;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.log.LogService;

import no.priv.bang.oldalbum.db.liquibase.OldAlbumLiquibase;
import no.priv.bang.oldalbum.services.OldAlbumException;
import no.priv.bang.osgi.service.adapters.logservice.LoggerAdapter;

@Component(immediate=true, property = "name=oldalbum")
public class OldAlbumScheme implements PreHook {
    LoggerAdapter logger = new LoggerAdapter(getClass());
    private OldAlbumLiquibase oldalbumLiquibase;

    @Reference
    public void setLogService(LogService logservice) {
        this.logger.setLogService(logservice);
    }

    @Activate
    public void activate() {
        oldalbumLiquibase = new OldAlbumLiquibase();
    }

    @Override
    public void prepare(DataSource datasource) throws SQLException {
        createInitialSchema(datasource);
        updateSchema(datasource);
    }

    void createInitialSchema(DataSource datasource) throws SQLException {
        try (var connect = datasource.getConnection()) {
            oldalbumLiquibase.createInitialSchema(connect);
        } catch (Exception e) {
            throw new OldAlbumException("Error creating initial schema for oldalbum database initialized from URL", e);
        }
    }

    private void updateSchema(DataSource datasource) {
        try (var connect = datasource.getConnection()) {
            oldalbumLiquibase.updateSchema(connect);
        } catch (Exception e) {
            throw new OldAlbumException("Error updating schema for oldalbum database initialized from URL", e);
        }
    }
}

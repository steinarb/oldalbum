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
package no.priv.bang.oldalbum.db.liquibase;

import static liquibase.Scope.Attr.resourceAccessor;
import static liquibase.command.core.UpdateCommandStep.CHANGELOG_FILE_ARG;
import static liquibase.command.core.helpers.DbUrlConnectionArgumentsCommandStep.DATABASE_ARG;

import java.sql.Connection;
import java.util.Map;

import liquibase.Scope;
import liquibase.command.CommandScope;
import liquibase.database.Database;
import liquibase.database.DatabaseFactory;
import liquibase.database.jvm.JdbcConnection;
import liquibase.exception.DatabaseException;
import liquibase.exception.LiquibaseException;
import liquibase.resource.ClassLoaderResourceAccessor;

public class OldAlbumLiquibase {

    public void createInitialSchema(Connection connection) throws LiquibaseException {
        applyLiquibaseChangeLog(connection, "oldalbum/changelog01.xml");
    }

    public void updateSchema(Connection connection) throws LiquibaseException {
        applyLiquibaseChangeLog(connection, "oldalbum/changelog02.xml");
    }

    private void applyLiquibaseChangeLog(Connection connection, String changelogClasspathResource) throws LiquibaseException {
        applyLiquibaseChangeLog(connection, changelogClasspathResource, getClass().getClassLoader());
    }

    public void applyLiquibaseChangeLog(Connection connection, String changelogClasspathResource, ClassLoader classLoader) throws LiquibaseException {
        try(var database = findCorrectDatabaseImplementation(connection)) {
            Scope.child(scopeObjectsWithClassPathResourceAccessor(classLoader), () -> new CommandScope("update")
                .addArgumentValue(DATABASE_ARG, database)
                .addArgumentValue(CHANGELOG_FILE_ARG, changelogClasspathResource)
                .execute());
        } catch (LiquibaseException e) {
            throw e;
        } catch (Exception e) {
            throw new LiquibaseException("Error closing resource", e);
        }
    }

    Database findCorrectDatabaseImplementation(Connection connection) throws DatabaseException {
        return DatabaseFactory.getInstance().findCorrectDatabaseImplementation(new JdbcConnection(connection));
    }

    Map<String, Object> scopeObjectsWithClassPathResourceAccessor(ClassLoader classLoader) {
        return Map.of(resourceAccessor.name(), new ClassLoaderResourceAccessor(classLoader));
    }

}

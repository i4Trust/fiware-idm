# General Environment Variables

The following table describes all environment variables that could be use to
ease Keyrock configuration.

| Name                                | Type    | Description                                                                                                     | Possible values             |
| ----------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------- | --------------------------- |
| IDM_PORT                            | Integer | Por where IdM Keyrock will be running                                                                           | 0 to 65536                  |
| IDM_HOST                            | String  | Name of the host where is running Keyrock                                                                       | -                           |
| IDM_DEBUG                           | Boolean | Enable show logs                                                                                                | true,false                  |
| IDM_EMAIL_LIST                      | String  | Type of list to be used to filter domain                                                                        | null,whitelist,blacklist    |
| IDM_HTTPS_ENABLED                   | Boolean | Enable Keyrock to listen on HTTPS                                                                               | true,false                  |
| IDM_HTTPS_PORT                      | Integer | Port where IdM Keyrock will listen if HTTPS is enable                                                           | 0 to 65536                  |
| IDM_SERVER_MAX_HEADER_SIZE          | Integer | Maximum length of request headers in bytes                                                                      | -                            |
| IDM_SESSION_SECRET                  | String  | Value to encrypt user info in express sessions                                                                  | -                           |
| IDM_SESSION_DURATION                | Integer | Lifetime of user session                                                                                        | -                           |
| IDM_ENCRYPTION_KEY                  | String  | Value used to encrypt passwords in DB if salt is not use                                                        | -                           |
| IDM_CORS_ENABLED                    | Boolean | Enable Keyrock CORS                                                                                             | true,false                  |
| IDM_CORS_ORIGIN                     | String  | List of domains allowed separated by commas                                                                     | -                           |
| IDM_CORS_METHODS                    | String  | List of HTTPS allowed verbs separated by commas                                                                 | -                           |
| IDM_CORS_ALLOWED_HEADERS            | String  | List of headers allowed separated by commas                                                                     | -                           |
| IDM_CORS_EXPOSED_HEADERS            | String  | List of exposed headers allowed separated by commas                                                             | -                           |
| IDM_CORS_CREDENTIALS                | Boolean | Ti include cookies in headers                                                                                   | true,false                  |
| IDM_CORS_MAS_AGE                    | Integer | Indicates how long the results of a preflight request                                                           | -                           |
| IDM_CORS_PREFLIGHT                  | Boolean | Allow preflight requests                                                                                        | true,false                  |
| IDM_CORS_OPTIONS_STATUS             | Integer | Status response code of HTTP OPTIONS verb                                                                       | -                           |
| IDM_ENABLE_2FA                      | Boolean | Allow two factor authentication to access keyrock                                                               | true, false                 |
| IDM_OAUTH_EMPTY_STATE               | Boolean | Allow empty state in service requests                                                                           | true, false                 |
| IDM_OAUTH_AUTH_LIFETIME             | Integer | Lifetime of OAuth2 Authorization Code                                                                           | -                           |
| IDM_OAUTH_ACC_LIFETIME              | Integer | Lifetime of OAuth2 Access Token                                                                                 | -                           |
| IDM_OAUTH_ASK_AUTH                  | Boolean | If is set to true, it will prompt authorization message when log in a service usign OAuth2                      | true,false                  |
| IDM_OAUTH_REFR_LIFETIME             | Integer | Lifetime of OAuth2 Refresh Token                                                                                | -                           |
| IDM_OAUTH_UNIQUE_URL                | Boolean | Set URL as unique parameter (this parameter will be used to redirect after a sign out if redirect_sign_out_uri) | true,false                  |
| IDM_OIDC_JWT_ALGORITHM              | String  | Set the algorithm that will firm ID Tokens generated with OIDC                                                  | HS256,HS384,HS512,RS256     |
| IDM_API_LIFETIME                    | Integer | Lifetime of API Token to be used to create resources on Keyrock                                                 | -                           |
| IDM_PDP_LEVEL                       | String  | Allow basic (HTTP verb + path) or advanced (XML rule. Need an AuthZforce instance) authorization rules          | basic,advanced              |
| IDM_AUTHZFORCE_ENABLED              | Boolean | Enable use of authZforce to store basic and advanced rules                                                      | true,false                  |
| IDM_AUTHZFORCE_HOST                 | String  | Name of the host where AuthZforce is running                                                                    | -                           |
| IDM_AUTHZFORCE_PORT                 | Integer | Port where AuthZforce is running                                                                                | 0 to 65536                  |
| IDM_DB_HOST                         | String  | Name of the host where is running the database                                                                  | -                           |
| IDM_DB_PASS                         | String  | Password to authenticate Keyrock to perform actions against the database                                        | -                           |
| IDM_DB_USER                         | String  | Username to authenticate Keyrock to perform actions against the database                                        | -                           |
| IDM_DB_NAME                         | String  | Name of the database used by Keyrock                                                                            | -                           |
| IDM_DB_DIALECT                      | String  | SQL Dialect of the database                                                                                     | mysql,sqlite,postgres,mssql |
| IDM_DB_PORT                         | Integer | Port where Database is running                                                                                  | 0 to 65536                  |
| IDM_DB_SEED                         | Boolean | Whether to seed the database with data                                                                          | true,false                  |
| IDM_DB_MIGRATE                      | Boolean | Whether to migrate the database to a later version data                                                         | true,false                  |
| IDM_EX_AUTH_ENABLED                 | Boolean | Enable use of an external user table to authenticate users                                                      | true,false                  |
| IDM_EX_AUTH_ID_PREFIX               | String  | Prefix to be add to ID in Keyrock user table when a external user logs in                                       | -                           |
| IDM_EX_AUTH_PASSWORD_ENCRYPTION     | String  | Algorithm used to encrypt passwords in external user table                                                      | -                           |
| IDM_EX_AUTH_PASSWORD_ENCRYPTION_KEY | String  | Value used to check passwords in external DB                                                                    | -                           |
| IDM_EX_AUTH_DB_HOST                 | String  | Name of the host where is running the external database                                                         | -                           |
| IDM_EX_AUTH_PORT                    | Integer | Port where is running the external database                                                                     | 0 to 65536                  |
| IDM_EX_AUTH_DB_NAME                 | String  | Name of the external database                                                                                   | -                           |
| IDM_EX_AUTH_DB_USER                 | String  | Username to authenticate Keyrock to perform actions against the external database                               | -                           |
| IDM_EX_AUTH_DB_PASS                 | String  | Password to authenticate Keyrock to perform actions against the external database                               | -                           |
| IDM_EX_AUTH_DB_USER_TABLE           | String  | Name of the table to which Keyrock will perform an external authentication                                      | -                           |
| IDM_EX_AUTH_DIALECT                 | String  | SQL Dialect of the external database                                                                            | mysql,sqlite,postgres,mssql |
| IDM_EMAIL_TRANSPORT                 | String  | Transport mode of the email                                                                                     | 'smtp' or 'mailgun'         |
| IDM_EMAIL_DOMAIN                    | String  | Domain name (mailgun only)                                                                                      | -                           |
| IDM_EMAIL_HOST                      | String  | Name of the host where is running the mail server                                                               | -                           |
| IDM_EMAIL_PORT                      | Integer | Port where is running the mail server                                                                           | 0 to 65536                  |
| IDM_EMAIL_ADDRESS                   | String  | Email Address used by Keyrock to send emails to the users                                                       | -                           |
| IDM_MAILGUN_API_KEY                 | String  | API key used by mailgun to send emails (only relevant if transport is 'mailgun')                                | -                           |
| IDM_TITLE                           | String  | Name of Keyrock when using a new theme                                                                          | -                           |
| IDM_THEME                           | String  | Name of the folder in which is store all new styles                                                             | -                           |
| IDM_EIDAS_ENABLED                   | Boolean | Enable Keyrock to allow user authentication in services using their eID                                         | true,false                  |
| IDM_EIDAS_GATEWAY_HOST              | String  | Name of the host in which Keyrock is running                                                                    | -                           |
| IDM_EIDAS_NODE_HOST                 | String  | Name of the host in which is running node eIDAS Service                                                         | -                           |
| IDM_EIDAS_METADATA_LIFETIME         | Integer | Lifetime of metadata of a service with eIDAS authentication enbled                                              | -                           |
| IDM_ADMIN_ID                        | String  | ID of admin default user in Keyrock                                                                             | -                           |
| IDM_ADMIN_USER                      | String  | Username of admin default user in Keyrock                                                                       | -                           |
| IDM_ADMIN_EMAIL                     | String  | Email of admin default user in Keyrock                                                                          | -                           |
| IDM_ADMIN_PASS                      | String  | Password of admin default user in Keyrock                                                                       | -                           |
| IDM_USAGE_CONTROL_ENABLED           | String  | Enable Usage control feature Keyrock                                                                            | -                           |
| IDM_PTP_HOST                        | String  | Name of the host where is running the PTP                                                                       | -                           |
| IDM_PTP_PORT                        | Integer | Port where is listenning the PTP                                                                                | 0 to 65536                  |
| IDM_PR_URL                          | String  | URL of the participant registry service to use                                                                  | -                           |
| IDM_PR_PARTIES_ENDPOINT             | String  | URL or the parties endpoint of the participant registry                                                         | -                           |
| IDM_PR_TOKEN_ENDPOINT               | String  | URL of the token endpoint of the participant registry                                                           | -                           |
| IDM_PR_ID                           | String  | ID of the participant registry                                                                                  | -                           |
| IDM_PR_CLIENT_ID                    | String  | ID of this Keyrock instance inside the participant registry                                                     | -                           |
| IDM_PR_CLIENT_KEY                   | String  | Private key to use for signing JWT and using the participant registry specification                             | -                           |
| IDM_PR_CLIENT_CRT                   | String  | Certificate associated with this instance of Keyrock and to be used when using the participant registry         | -                           |
| IDM_AR_URL                          | String  | URL of the authorization registry linked with this instance of Keyrock                                          | -                           |
| IDM_AR_DELEGATION_ENDPOINT          | String  | URL or the delegation endpoint of the authorization registry                                                    | -                           |
| IDM_AR_TOKEN_ENDPOINT               | String  | URL of the token endpoint of the authorization registry                                                         | -                           |
| IDM_AR_ID                           | String  | ID of the authorization registry within the participant registry                                                | -                           |

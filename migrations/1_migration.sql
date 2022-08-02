create table _prisma_migrations
(
    id                  varchar(36)                            not null
        primary key,
    checksum            varchar(64)                            not null,
    finished_at         timestamp with time zone,
    migration_name      varchar(255)                           not null,
    logs                text,
    rolled_back_at      timestamp with time zone,
    started_at          timestamp with time zone default now() not null,
    applied_steps_count integer                  default 0     not null
);

alter table _prisma_migrations
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on _prisma_migrations to anon;

grant delete, insert, references, select, trigger, truncate, update on _prisma_migrations to authenticated;

grant delete, insert, references, select, trigger, truncate, update on _prisma_migrations to service_role;

create table users
(
    id             text not null
        primary key,
    name           text,
    email          text,
    email_verified timestamp(3),
    image          text
);

alter table users
    owner to postgres;

create table accounts
(
    id                  text not null
        primary key,
    user_id             text not null
        references users
            on update cascade on delete cascade,
    type                text not null,
    provider            text not null,
    provider_account_id text not null,
    refresh_token       text,
    access_token        text,
    expires_at          integer,
    token_type          text,
    scope               text,
    id_token            text,
    session_state       text,
    oauth_token_secret  text,
    oauth_token         text
);

alter table accounts
    owner to postgres;

create unique index accounts_provider_provider_account_id_key
    on accounts (provider, provider_account_id);

grant delete, insert, references, select, trigger, truncate, update on accounts to anon;

grant delete, insert, references, select, trigger, truncate, update on accounts to authenticated;

grant delete, insert, references, select, trigger, truncate, update on accounts to service_role;

create table sessions
(
    id            text         not null
        primary key,
    session_token text         not null,
    user_id       text         not null
        references users
            on update cascade on delete cascade,
    expires       timestamp(3) not null
);

alter table sessions
    owner to postgres;

create unique index sessions_session_token_key
    on sessions (session_token);

grant delete, insert, references, select, trigger, truncate, update on sessions to anon;

grant delete, insert, references, select, trigger, truncate, update on sessions to authenticated;

grant delete, insert, references, select, trigger, truncate, update on sessions to service_role;

create unique index users_email_key
    on users (email);

grant delete, insert, references, select, trigger, truncate, update on users to anon;

grant delete, insert, references, select, trigger, truncate, update on users to authenticated;

grant delete, insert, references, select, trigger, truncate, update on users to service_role;

create table verificationtokens
(
    identifier text         not null,
    token      text         not null,
    expires    timestamp(3) not null
);

alter table verificationtokens
    owner to postgres;

create unique index verificationtokens_identifier_token_key
    on verificationtokens (identifier, token);

create unique index verificationtokens_token_key
    on verificationtokens (token);

grant delete, insert, references, select, trigger, truncate, update on verificationtokens to anon;

grant delete, insert, references, select, trigger, truncate, update on verificationtokens to authenticated;

grant delete, insert, references, select, trigger, truncate, update on verificationtokens to service_role;



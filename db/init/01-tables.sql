\connect special

CREATE TABLE special.Queue (
    id integer NOT NULL,
    name text,
    queue text,
    PRIMARY KEY (id)
);
COMMENT ON TABLE special.Queue IS
'Current queue entries';
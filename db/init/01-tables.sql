\connect special

CREATE TABLE special.Queue (
    asker special.User NOT NULL,
    time_joined time,
    type text,
    PRIMARY KEY (asker)
);
COMMENT ON TABLE special.Queue IS
'Current queue entries';

CREATE TABLE special.User (
  id integer NOT NULL,
  name text,
  questions_today integer,
  questions_all_time integer,
  PRIMARY KEY (id)
)

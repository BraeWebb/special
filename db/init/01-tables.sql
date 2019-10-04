\connect special

CREATE TABLE IF NOT EXISTS special.User (
  id integer NOT NULL,
  name text,
  questions_today integer,
  questions_all_time integer,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS special.Queue (
    asker integer NOT NULL REFERENCES special.User(id),
    time_joined time DEFAULT now(),
    type text,
    PRIMARY KEY (asker, type)
);
COMMENT ON TABLE special.Queue IS
'Current queue entries';

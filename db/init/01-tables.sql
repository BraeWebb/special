\connect special

CREATE TABLE IF NOT EXISTS special.User (
  id text NOT NULL,
  name text,
  questions_today integer,
  questions_all_time integer,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS special.Queue (
    asker text NOT NULL REFERENCES special.User(id),
    time_joined time DEFAULT now(),
    type text,
    PRIMARY KEY (asker, type)
);
COMMENT ON TABLE special.Queue IS
'Current queue entries';


CREATE TABLE IF NOT EXISTS special.Icon (
	id text NOT NULL,
	uri text NOT NULL,
	name text,
	public boolean,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS special.Group (
	id text NOT NULL,
	title text NOT NULL,
	description text,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS special.UserIcon (
	userid text NOT NULL REFERENCES special.User(id),
	icon text NOT NULL REFERENCES special.Icon(id),
	PRIMARY KEY (userid, icon)
);
CREATE TABLE IF NOT EXISTS special.GroupIcon (
	groupid text NOT NULL REFERENCES special.Group(id),
	icon text NOT NULL REFERENCES special.Icon(id),
	PRIMARY KEY (groupid, icon)
);


CREATE TABLE IF NOT EXISTS special.UserGroup (
	userid text NOT NULL REFERENCES special.User(id),
	groupid text NOT NULL REFERENCES special.Group(id),
	PRIMARY KEY (userid, groupid)
);


CREATE TABLE IF NOT EXISTS special.ServiceType (
	id text NOT NULL,
	name text NOT NULL,
	description text,
	PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS special.Service (
	id text NOT NULL,
	name text NOT NULL,
	host text NOT NULL,
	port text NOT NULL,
	type text NOT NULL REFERENCES special.ServiceType(id),
	PRIMARY KEY (id)
);

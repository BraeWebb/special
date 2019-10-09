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

CREATE TABLE IF NOT EXISTS special.ReportLanguages (
	id text NOT NULL,
	title text NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS special.LanguageExtensions (
	language text NOT NULL REFERENCES special.ReportLanguages(id),
	extension text NOT NULL,
	PRIMARY KEY (language, extension)
);

CREATE TABLE IF NOT EXISTS special.ReportRequest (
	id text NOT NULL,
	title text NOT NULL,
	file text NOT NULL,
	language text NOT NULL REFERENCES special.ReportLanguages(id),
	max_matches integer NOT NULL,
	max_cases integer NOT NULL,
	status text,
	generator text NOT NULL REFERENCES special.User(id),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS special.Report (
	id text NOT NULL,
	title text NOT NULL,
	url text NOT NULL,
	request text NOT NULL REFERENCES special.ReportRequest(id),
	generator text NOT NULL REFERENCES special.User(id),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS special.Case (
	id integer NOT NULL,
	report text NOT NULL REFERENCES special.Report(id),
	student1 text NOT NULL,
	student1_percent integer NOT NULL,
	student2 text NOT NULL,
	student2_percent integer NOT NULL,
	lines integer NOT NULL,
	PRIMARY KEY (id, report)
);

CREATE TABLE IF NOT EXISTS special.Script (
	report text NOT NULL REFERENCES special.Report(id),
	student text NOT NULL,
	content text,
	PRIMARY KEY (report, student)
);

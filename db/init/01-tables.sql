\connect special

CREATE TABLE IF NOT EXISTS special.User (
  id text NOT NULL,
  name text,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS special.UserDump (
  id text NOT NULL REFERENCES special.User(id),
  type text,
  email text,
  groups text,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS special.Course (
  id text NOT NULL,
  code text,
  title text,
  semester text,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS special.Class (
  session text NOT NULL,
  id text NOT NULL REFERENCES special.Course(id),
  start time,
  day text,
  duration integer,
  PRIMARY KEY (session, id)
);

CREATE TABLE IF NOT EXISTS special.Enrollment (
  user_id text NOT NULL REFERENCES special.User(id),
  class text NOT NULL REFERENCES special.Class(session),
  course text NOT NULL REFERENCES special.Course(id),
  PRIMARY KEY (user_id, class, course)
);

CREATE TABLE IF NOT EXISTS special.QueuePage (
  id text NOT NULL,
  owner text NOT NULL REFERENCES special.User(id),
  PRIMARY KEY (queue)
);

CREATE TABLE IF NOT EXISTS special.Queue (
  queue_id text NOT NULL,
  parent_page text NOT NULL REFERENCES special.QueuePage(id),
  title text,
  description text,
  signed_on_weighting integer,
  questions_asked_weighting integer,
  wait_time_weighting integer,
  auto_clear_config boolean,
  PRIMARY KEY (queue_id)
);

CREATE TABLE IF NOT EXISTS special.Entry (
  asker text NOT NULL REFERENCES special.User(id),
  queue text NOT NULL REFERENCES special.Queue(queue_id),
  time_joined time DEFAULT now(),
  PRIMARY KEY (asker)
);
COMMENT ON TABLE special.Entry IS
'Current queue entries';

CREATE TABLE IF NOT EXISTS special.CourseQueue (
  course text NOT NULL REFERENCES special.Course(id),
  queue_page text NOT NULL REFERENCES special.QueuePage(id),
  PRIMARY KEY (course, queue_page)
);

CREATE TABLE IF NOT EXISTS special.Prompt (
  id text NOT NULL,
  title text,
  body text,
  label text,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS special.QueuePrompts (
  queue text NOT NULL REFERENCES special.Queue(queue_id),
  prompt text NOT NULL REFERENCES special.Prompt(id),
  PRIMARY KEY (queue, prompt)
);

CREATE TABLE IF NOT EXISTS special.Staff (
  user_id text NOT NULL REFERENCES special.User(id),
  queue text NOT NULL REFERENCES special.QueuePage(queue),
  PRIMARY KEY (user_id, queue)
);

CREATE TABLE IF NOT EXISTS special.QueueArchive (
  asker text NOT NULL REFERENCES special.User(id),
  answerer text NOT NULL REFERENCES special.User(id),
  queue text NOT NULL REFERENCES special.Queue(queue_id),
  joined_queue time,
  left_queue time,
  type_left text,
  rating integer,
  PRIMARY KEY (asker, joined_queue) /* TODO: yeet? */
);

CREATE TABLE IF NOT EXISTS special.DailyStats (
  user_id text NOT NULL REFERENCES special.User(id),
  queue_id text NOT NULL REFERENCES special.Queue(queue_id),
  questions_asked integer,
  PRIMARY KEY (user_id, queue_id)
);

/* MoSS */

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

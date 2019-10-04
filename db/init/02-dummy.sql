\connect special

INSERT INTO special.User VALUES ('s4435400', 'Brae Webb', 2, 70);
INSERT INTO special.User VALUES ('s4439491', 'Emily Bennett', 0, 2);
INSERT INTO special.User VALUES ('s4434180', 'Henry OBrien', 0, 0);

INSERT INTO special.Queue VALUES ('s4435400', now(), 'long');
INSERT INTO special.Queue VALUES ('s4439491', now(), 'quick');

INSERT INTO special.Icon (id, uri, name, public)
	VALUES ('wEmUWsCcfT0', 'wEmUWsCcfT0.png', 'braes-face', true);

INSERT INTO special.UserIcon (userid, icon)
	VALUES ('s4435400', 'wEmUWsCcfT0');

INSERT INTO special.Group (id, title, description)
	VALUES ('SO9KrRNGw2g', 'CSSE1001 Tutors', 'Tutoring team for CSSE1001');

INSERT INTO special.UserGroup (userid, groupid)
	VALUES ('s4434180', 'SO9KrRNGw2g');

INSERT INTO special.ServiceType (id, name, description)
	VALUES ('moss', 'MoSS', 'Generate MoSS Reports');
INSERT INTO special.ServiceType (id, name, description)
	VALUES ('queue', 'Queue', 'Question Queue');
INSERT INTO special.ServiceType (id, name, description)
	VALUES ('allocate', 'Allocation', 'Tutor Allocation Service');

INSERT INTO special.Service (id, name, host, port, type)
	VALUES ('tZNBy-BdM2A', 'ITEE MoSS Management', 'localhost', '3050', 'moss');
INSERT INTO special.Service (id, name, host, port, type)
	VALUES ('rMdbVHPmCW0', 'CSSE1001 Queue', 'localhost', '3000', 'queue');
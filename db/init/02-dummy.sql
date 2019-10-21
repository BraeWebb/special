\connect special

INSERT INTO special.User VALUES ('s4435400', 'Brae Webb');
INSERT INTO special.User VALUES ('s4439491', 'Emily Bennett');
INSERT INTO special.User VALUES ('s4434180', 'Henry OBrien');

INSERT INTO special.UserDump VALUES ('s4435400', 'Student', 'b.webb@uq.net.au', '[labs:comp3506-2017-2,labs:comp3702-2018-2,labs:comp3880-2019-2,labs:comp4000-2019-1,labs:comp4001-2019-2,labs:comp4403-2018-1,labs:comp4702-2019-1,labs:comp6803-2019-1]');
INSERT INTO special.UserDump VALUES ('s4439491', 'Student', 'e.bennett1@uq.net.au', '[]');
INSERT INTO special.UserDump VALUES ('s4434180', 'Student', 'h.obrien@uq.net.au', '[]');

INSERT INTO special.Course VALUES ('bd73snd7', 'CSSE1001', 'Introduction to Software Engineering', '2019s2');

INSERT INTO special.QueuePage VALUES ('s3b7sk39', 's4435400');

INSERT INTO special.Queue VALUES ('sn3bd61b', 's3b7sk39', 'Long Queue', 'Please ask the long questions', 0, 0, 0, FALSE);
INSERT INTO special.Queue VALUES ('j3sab2bd', 's3b7sk39', 'Short Queue', 'Please ask the short questions', 0, 0, 0, FALSE);

INSERT INTO special.CourseQueue VALUES ('bd73snd7', 's3b7sk39');

INSERT INTO special.ReportLanguages VALUES ('java', 'Java');
INSERT INTO special.ReportLanguages VALUES ('python', 'Python');
INSERT INTO special.ReportLanguages VALUES ('c', 'C');
INSERT INTO special.ReportLanguages VALUES ('cc', 'CC');
INSERT INTO special.ReportLanguages VALUES ('ml', 'ML');
INSERT INTO special.ReportLanguages VALUES ('csharp', 'C#');
INSERT INTO special.ReportLanguages VALUES ('matlab', 'MatLab');
INSERT INTO special.ReportLanguages VALUES ('vb', 'Visual Basic');
INSERT INTO special.ReportLanguages VALUES ('javascript', 'JavaScript');
INSERT INTO special.ReportLanguages VALUES ('ascii', 'ASCII');


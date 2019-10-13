class Tutor:
    def __init__(self, name):
        self._name = name
        self.lower_hr_limit = 1
        self.upper_hr_limit = None
        self.lower_type_limits = {}
        self.is_junior = False
        self.daily_max = None
        self.pref_contig = True

    def get_name(self):
        return self._name


class Session:
    def __init__(self, id_):
        self._id = id_
        self.lower_tutor_count = 1
        self.upper_tutor_count = 1
        self.duration = 1
        self.day = None
        self.start_time = None

    def get_id(self):
        return self._id


def check_feasibility(avail):
    tutor_avail = {}
    session_avail = {}

    for tutor, session in avail:
        if avail[(tutor, session)]:
            tutor_avail[tutor] = tutor_avail.get(tutor, 0) + 1
            session_avail[tutor] = session_avail.get(session, 0) + 1

    for tutor in tutor_avail:
        if tutor.lower_hr_limit > tutor_avail[tutor]:
            return tutor.get_name()

    for session in session_avail:
        if session.lower_tutor_count > session_avail[session]:
            return session.get_id()

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


def from_json(tutor_json, session_json):
    tutors = {}
    sessions = {}
    avail = {}

    for session_info in session_json:
        session = Session(session_info.get("id"))
        for key in session_info:
            if key != "id":
                setattr(session, key, session_info[key])
        sessions[session.get_id()] = session

    for tutor_info in tutor_json:
        tutor = Tutor(tutor_info.get("name"))
        for key in tutor_info:
            if key not in ("availability", "name"):
                setattr(tutor, key, tutor_info[key])
        tutors[tutor.get_name()] = tutor

        # generate all true availabilities
        for session_name in tutor_info.get("availability", []):
            avail[(tutor, sessions[session_name])] = True

    # generate all false availabilites
    for tutor in tutors.values():
        for session in sessions.values():
            avail[(tutor, session)] = avail.get((tutor, session), False)

    return list(tutors.values()), list(sessions.values()), avail


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

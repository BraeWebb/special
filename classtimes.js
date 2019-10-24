var request = require('request');
var { graphql, buildSchema } = require('graphql');
let {requesty, GraphQLClient} = require('graphql-request');
var moment = require('moment');

let endpoint = "http://159.65.130.137:5000/graphql"
const client = new GraphQLClient(endpoint, { headers: {} });

var args = process.argv.slice(2);
if (args.length != 1) {
    console.log('Usage: node classtimes.js [COURSE_CODE]');
    process.exit(1);
}
var course = args[0];
var timetable_url = "https://timetableplanner.app.uq.edu.au/courses/search?semester_id=96&course_code=" + course;

const createCourse = 
`mutation addCourse($id: String!, $code: String, $title: String, $semester: String) {
    createCourse(input: {
      course: {
        id: $id,
        code: $code,
        title: $title,
        semester: $semester,
      }
    }) {
      course {
        id
      }
    }
  }`;

const createClass =
`mutation addClass($id: String!, $session: String!, $class: String!, $start: Time, $day: String, $duration: Int) {
    createClass(input: {
      class: {
        id: $id,
        session: $session,
        class: $class,
        start: $start,
        day: $day,
        duration: $duration
      }
    }) {
      class {
        id
      }
    }
  }`;

request({
    uri: timetable_url,
    method: 'GET',
    headers: {
        'Accept': "application/json, text/javascript, */*; q=0.01",
        'Referer': "https://timetableplanner.app.uq.edu.au/semesters/96/timetables/new",
        'X-Requested-With': "XMLHttpRequest",
        'Cookie': "remember_token=IjdGcnVMWEYxd241SVloVWs1UndqZ1pmMmhIbDhaX1YxeTFuTVdXTXlqOG8i--ce2d561523cc621e28122f33a5e2fbaca461aea4;",
        'Connection': "keep-alive"
    },
}, (err, res, body) => {
    if (!err & res.statusCode == 200) {
        const info = JSON.parse(body);
        // console.log(JSON.stringify(info, null, 2));
        var course_info = info["courses"][0];
        var id = course_info["id"];
        var code = course_info["name"];
        var title = course_info["description"];
        var semester = course_info["start_date"] + ":" + course_info["end_date"];
        client.request(createCourse, {
            "id": id,
            "code": code,
            "title": title,
            "semester": semester
        });
        var activity_streams = course_info["activity_streams"];
        // console.log(JSON.stringify(activity_streams, null, 2));
        for (var key in activity_streams) {
            var current = activity_streams[key];
            var stream_id = current["id"];
            var session = current["name"];
            var details = current["scheduled_activities"][0];
            var day = details["day"];
            
            var start_time = details["start_time"] + "";
            var end_time = details["end_time"] + "";
            start_time = start_time.trim();
            end_time = end_time.trim();
            start_time = start_time.length == 4 ? start_time : "0" + start_time;
            end_time = end_time.length == 4 ? end_time : "0" + end_time;
            end_time = moment(end_time, "HHmm");
            start_time = moment(start_time, "HHmm");
            
            var duration = end_time.diff(start_time, 'minutes', true);
            start_time = start_time.format("hh:mm:ss");
            client.request(createClass, {
                "id": stream_id,
                "session": session,
                "class": id,
                "start": start_time,
                "day": day,
                "duration": duration
            });
        }
    } else {
        console.log("well a " + res.statusCode + " is not what you want");
    }
});

//curl 'https://timetableplanner.app.uq.edu.au/courses/search?semester_id=96&course_code=CSSE2002' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Referer: https://timetableplanner.app.uq.edu.au/semesters/96/timetables/new' -H 'X-Requested-With: XMLHttpRequest' -H 'Cookie: remember_token=IjdGcnVMWEYxd241SVloVWs1UndqZ1pmMmhIbDhaX1YxeTFuTVdXTXlqOG8i--ce2d561523cc621e28122f33a5e2fbaca461aea4;' -H 'Connection: keep-alive' --compressed

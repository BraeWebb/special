import os
import json
import redis

import moss
import submissions
import parser
import graphs


# TODO: Read extensions from the database
LANGUAGE_EXTENSIONS = {
    "python": "py",
    "java": "java",
    "c": "c",
    "javascript": "js"
}


def listen(client, subscriber, channel):
    subscriber.subscribe(channel)

    while True:
        message = subscriber.get_message()
        if message:
            if message['data'] == 1:
                print("Subscribed to publisher")
                continue

            data = json.loads(message['data'])

            id = data["report"]["id"]
            pub_channel = "STEP-" + id
            log_channel = "LOGS-" + data["user"]["id"]

            console_logger = lambda msg: client.publish(log_channel, msg)
            client.publish(pub_channel, json.dumps({"step": "accepted"}))

            language = data['request']['language']
            extension = LANGUAGE_EXTENSIONS.get(language, language)
            submissions.extract(data['request']['file'], extension,
                                out=os.path.join("data", data["id"]))
            client.publish(pub_channel, json.dumps({"step": "extracted"}))

            response = generate_report(data, console_logger,
                                       callback=lambda: client.publish(pub_channel, json.dumps({"step": "sent"})))
            # response = moss.Report(request=data)
            # response.url = "http://moss.stanford.edu/results/546069529"
            client.publish(pub_channel, json.dumps({"step": "generated", "url": response.url}))

            parsed = parser.parse(response.url)
            client.publish(pub_channel, json.dumps({"step": "parsed", "result": parsed}))

            graphs.gen_report(response.url, id)

            for case_id, case in parser.parse_cases(response.url, parsed):
                client.publish("report:case",
                               json.dumps({"user": data['user'],
                                           "case": case,
                                           "reportId": data["id"]}))
                console_logger(f"Case {case_id} parsed.")

            client.publish(pub_channel, json.dumps({"step": "fin"}))

            yield data['user'], response, data


def get_files(directory):
    directory = os.path.expanduser(directory)
    folders = os.walk(directory)
    submissions = []
    for folder in folders:
        for file in folder[2]:
            path = folder[0] + "/" + file
            submissions.append((os.path.relpath(path, directory), path))
    return submissions


def generate_report(data, logger, callback=None):
    report = data['report']
    request = data['request']
    request = moss.ReportRequest(base_files=[],
                                 submissions=get_files(os.path.join("data", data["id"])),
                                 directory_mode=True,
                                 language=request['language'],
                                 max_matches=request['maxMatches'] or 10,
                                 max_cases=request['maxCases'] or 200,
                                 comment=report['title'])
    report = moss.Report.make_request(request, logger=logger, sent_callback=callback)

    return report


def main():
    client = redis.Redis()
    subscriber = client.pubsub()

    for user, report, data in listen(client, subscriber, "report"):
        print("Report Generated")


if __name__ == '__main__':
    main()

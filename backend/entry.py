import os
import json
import redis

import moss
import submissions


def listen(client, subscriber, channel):
    subscriber.subscribe(channel)

    while True:
        message = subscriber.get_message()
        if message:
            if message['data'] == 1:
                print("Subscribed to publisher")
                continue

            data = json.loads(message['data'])

            console_logger = lambda msg: client.publish("report:log", json.dumps({
                "msg": msg,
                "user": data["user"]
            }))
            print(data)
            client.publish("report:accepted", json.dumps(data))

            submissions.extract(data['report']['path'], data['report']['language'],
                                out=os.path.join("data", data["id"]))
            client.publish("report:extracted", json.dumps(data))

            response = generate_report(data, console_logger,
                                       callback=lambda: client.publish("report:sent", json.dumps(data)))
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
    request = moss.ReportRequest(base_files=[],
                                 submissions=get_files(os.path.join("data", data["id"])),
                                 directory_mode=True,
                                 language=report['language'],
                                 max_matches=report['maxMatches'],
                                 max_cases=report['maxCases'],
                                 comment=report['title'])
    report = moss.Report.make_request(request, logger=logger, sent_callback=callback)

    return report


def main():
    client = redis.Redis()
    subscriber = client.pubsub()

    for user, report, data in listen(client, subscriber, "report"):
        print("Report Generated")
        client.publish("report:generated", json.dumps({"user": user, "report": report.url, "request": data}))


if __name__ == '__main__':
    main()

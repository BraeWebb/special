import os
import json
import redis

import moss


def listen(subscriber, channel, handler):
    subscriber.subscribe("report")

    while True:
        message = subscriber.get_message()
        if message:
            if message['data'] == 1:
                print("Subscribed to publisher")
                continue

            data = json.loads(message['data'])
            response = handler(data)
            yield data['user'], response


def get_files(directory):
    directory = os.path.expanduser(directory)
    folders = os.walk(directory)
    submissions = []
    for folder in folders:
        for file in folder[2]:
            path = folder[0] + "/" + file
            submissions.append((os.path.relpath(path, directory), path))
    return submissions


def generate_report(data):
    report = data['report']
    request = moss.ReportRequest(base_files=[],
                                 submissions=get_files("~/moss/3506_test_subs"),
                                 directory_mode=True,
                                 language=report['language'],
                                 max_matches=report['maxMatches'],
                                 comment=report['title'])
    report = moss.Report.make_request(request)

    return report


def main():
    client = redis.Redis()
    subscriber = client.pubsub()

    for user, report in listen(subscriber, "report", generate_report):
        print("Report Generated")
        client.publish(f"generated", json.dumps({"user": user, "report": report.url}))


if __name__ == '__main__':
    main()

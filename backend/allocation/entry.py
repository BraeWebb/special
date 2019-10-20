import os
import json
import redis

import allocation.util as util
import allocation.engine as engine


def listen(client, subscriber, channel):
    subscriber.subscribe(channel)

    while True:
        message = subscriber.get_message()
        if message:
            if message['data'] == 1:
                print("Subscribed to publisher")
                continue

            data = json.loads(message['data'])

            tutors, sessions, avail = util.from_json(data["tutors"], data["sessions"])
            feasibility = util.check_feasibility(avail)
            if feasibility is not None:
                error = True
                msg = f"Infeasible model: Requirements set by {feasibility} cannot be met"
                alloc = []
            else:
                solver = engine.Engine(tutors, sessions, avail)
                result = solver.solve()
                if result is None:
                    error = True
                    msg = "No allocation could be found"
                    alloc = []
                else:
                    error = False
                    msg = "Allocation generated successfully"
                    alloc = result

            client.publish("allocate:allocated",
                           json.dumps({"user": data['user'],
                                       "error": error,
                                       "msg": msg,
                                       "alloc": alloc}))

            yield data['user'], alloc, data


def main():
    client = redis.Redis()
    subscriber = client.pubsub()

    for user, allocation, data in listen(client, subscriber, "allocate"):
        print("Allocated")


if __name__ == '__main__':
    main()

from mossum.mossum import image, get_results, parser
import mossum.mossum

import os


def gen_report(url, id, root="~/projects/special/frontend/public/images"):
    global args
    args = parser.parse_args()

    mossum.mossum.args = args # eww

    base = os.path.join(os.path.expanduser(root), id)
    if not os.path.exists(base):
        os.mkdir(base)

    for i in range(100):
        args.output = os.path.join(base, str(i))
        args.min_percent = i
        report = get_results(url)
        image(report)


def main():
    gen_report("http://moss.stanford.edu/results/546069529/", "xyz")


if __name__ == '__main__':
    main()

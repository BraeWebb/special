import requests
from bs4 import BeautifulSoup


def parse_student(student):
    student = student.find("a")
    case = student["href"]
    student = student.text
    snum = student.split("/")[0]
    percent = student[student.find("(")+1:student.find(")")]
    return snum, percent, case


def parse(url):
    result = []
    page = requests.get(url)
    parsed_html = BeautifulSoup(page.text)
    table = parsed_html.find("table")
    for row in table.find_all("tr"):
        columns = row.find_all("td")
        if len(columns) != 3:
            continue
        student1, student2, lines = row.find_all("td")

        snum1, percent1, case1 = parse_student(student1)
        snum2, percent2, case2 = parse_student(student2)

        case = {
            "id": len(result),
            "case": case1,
            "student1": {
                "id": snum1,
                "percent": int(percent1[:-1]),
            },
            "student2": {
                "id": snum2,
                "percent": int(percent2[:-1]),
            },
            "lines": int(lines.text[:-1])
        }
        result.append(case)
    return result


def parse_cases(url, report):
    for case in report:
        yield case["id"], ((case["student1"]["id"], case["student2"]["id"]), parse_case(url, case["id"]))


def parse_script(url):
    results = {}
    page = requests.get(url)
    parsed_html = BeautifulSoup(page.text)

    context = parsed_html.find("pre")

    # TODO: work out a nice way to get blocks
    links = parsed_html.find("pre").find_all("a")
    for link in links:
        match_id = link.get("name")
        if match_id is None:
            continue

    return str(context)


def parse_case(url, case):
    script0 = parse_script(url + f"/match{case}-0.html")
    script1 = parse_script(url + f"/match{case}-1.html")

    return [script0, script1]


def main():
    url = "http://moss.stanford.edu/results/910282911/"
    # print(parse(url))
    report = parse_case(url, 0)
    print(report)


if __name__ == '__main__':
    main()

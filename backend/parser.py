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
                "percent": percent1[:-1]
            },
            "student2": {
                "id": snum2,
                "percent": percent2[:-1],
            },
            "lines": lines.text[:-1]
        }
        result.append(case)
    return result


def parse_script(url):
    results = {}
    page = requests.get(url)
    parsed_html = BeautifulSoup(page.text)
    for match in parsed_html.find("pre").text.split(">>>> file: ")[1:]:
        name, _, content = match.partition("\n")
        results[name] = content
    return results


def parse_case(url, case):
    script0 = parse_script(url + f"match{case}-0.html")
    script1 = parse_script(url + f"match{case}-1.html")

    return [script0, script1]


def main():
    url = "http://moss.stanford.edu/results/937732643/"
    report = parse_case(url, 0)
    print(report)


if __name__ == '__main__':
    main()

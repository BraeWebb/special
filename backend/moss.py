import os
import socket
from typing import List, Tuple


class MockSocket(socket.socket):
    def send(self, data, flags=None):
        # print(data)
        super().send(data)

    def sendall(self, data, flags=None):
        # print(data)
        super().send(data)


LANGUAGES = ("c", "cc", "java", "ml", "pascal", "ada", "lisp", "scheme",
             "haskell", "fortran", "ascii", "vhdl", "perl", "matlab", "python",
             "mips", "prolog", "spice", "vb", "csharp", "modula2", "a8086",
             "javascript", "plsql")

SERVER = "moss.stanford.edu"
PORT = 7690

USER_ID = 405293797


DEFAULT_LANGUAGE = "java"
DEFAULT_MAX_MATCHES = 10
DEFAULT_DIRECTORY_MODE = False
DEFAULT_X = 0
DEFAULT_COMMENT = ""
DEFAULT_MAX_CASES = 250


class UnsupportedLanguageException(Exception):
    pass


class ReportRequest:

    def __init__(self, base_files, submissions,
                 language=DEFAULT_LANGUAGE,
                 max_matches=DEFAULT_MAX_MATCHES,
                 directory_mode=DEFAULT_DIRECTORY_MODE,
                 x=DEFAULT_X,
                 comment=DEFAULT_COMMENT,
                 max_cases=DEFAULT_MAX_CASES):
        self.language: str = language
        self.max_matches: int = max_matches
        self.directory_mode: bool = directory_mode
        self.x: int = x
        self.comment: str = comment
        self.max_cases: int = max_cases

        self.base_files: List[str] = base_files
        self.submissions: List[Tuple[str]] = submissions


class Report:
    language_response: str = ""

    def __init__(self, request: ReportRequest):
        self.request = request
        self.url: str = ""

    def _upload_file(self, connection, file_id, file_name, file_path):
        """
        file $id $lang $size $file\n
        :param connection:
        :return:
        """
        size = os.stat(file_path).st_size

        connection.sendall(b'file %d %s %d %s\n' % (file_id, self.request.language.encode(), size, file_name.encode()))

        with open(file_path, "rb") as file:
            for line in file:
                connection.send(line)

    @classmethod
    def make_request(cls, request: ReportRequest, logger=print, sent_callback=None):
        report = cls(request)

        with MockSocket(socket.AF_INET, socket.SOCK_STREAM) as connection:
            connection.connect((SERVER, PORT))

            connection.sendall(b'moss %d\n' % USER_ID)
            connection.sendall(b'directory %d\n' % (1 if request.directory_mode else 0))
            connection.sendall(b'X %d\n' % request.x)
            connection.sendall(b'maxmatches %d\n' % request.max_matches)
            connection.sendall(b'show %d\n' % request.max_cases)

            # Language selection
            connection.sendall(b'language %s\n' % request.language.encode())
            report.language_response = data = connection.recv(1024).decode()
            if data.strip() == "no":
                connection.send(b'end\n')
                connection.close()
                logger(f"ERROR: Unsupported language: {request.language}")
                raise UnsupportedLanguageException(f"Unsupported language: {request.language}")

            file_id = 1
            for file, submission in request.submissions:
                logger(f"Uploading file {file}...")
                report._upload_file(connection, file_id, file, submission)
                file_id += 1

            connection.sendall(b'query 0 %s\n' % request.comment.encode())
            logger(f"Request sent. Awaiting response.")

            if sent_callback is not None:
                sent_callback()

            report.url = connection.recv(1024).decode().strip()
            logger(f"Request generated: {report.url}")

            connection.send(b'end\n')
            connection.close()

        return report


def gen_report(root):
    folders = os.walk(os.path.expanduser(root))
    submissions = []
    for folder in folders:
        for file in folder[2]:
            submissions.append((file, folder[0] + "/" + file))

    request: ReportRequest = ReportRequest(base_files=[],
                                           submissions=submissions,
                                           directory_mode=True,
                                           comment="Testing upload")
    report: Report = Report.make_request(request)

    print(report.language_response)


def main():
    root = "~/moss/3506_test_subs"
    gen_report(root)


if __name__ == '__main__':
    main()

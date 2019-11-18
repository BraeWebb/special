import os
import re
import zipfile


def extract(path, ext, out="out"):
    """
    Extract all the files within a zip at the path location
    with the ext extension.

    Parameters:
        path (str): The path to a zip archive.
        ext (str): Extension of the files to pull from the zip.
        out (str): Output directory to extract to, default is 'out'
    """
    with zipfile.ZipFile(path, 'r') as zip:
        # get the files within a zip
        files = zip.namelist()
        for file in files:
            # get the student number
            print(file)
            matches = re.search("(s[0-9]{6,7})", file)
            if matches is None:
                continue
            student = matches.group(0)
            if not file.endswith(ext):
                continue

            # copy the file out under the student number
            os.makedirs(os.path.join(out, student), exist_ok=True)
            target = os.path.join(out, student, os.path.basename(file))
            with open(target, "w") as f:
                f.write(zip.read(file).decode())


def main():
    path = "/Users/brae/Downloads/gradebook_CSSE1001S_6960_61141_Assignment202_2019-09-21-17-51-47.zip"
    extract(path, "py")


if __name__ == '__main__':
    main()

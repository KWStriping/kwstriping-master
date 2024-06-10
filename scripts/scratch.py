from pathlib import Path
import re
from typing import Pattern

# Set the root directory of your repository
root_dir = Path("/Users/jacob/code/kwstriping-master/dashboard")
import_statement = "import * as m from '@paraglide/messages';\n"
pattern = re.compile(r"\Wm[\.\[]")


def add_import_to_file(file_path: Path, import_statement: str) -> None:
    print(file_path)
    with file_path.open("r+", encoding="utf-8") as file:
        content = file.readlines()
        # Check if the import statement is already in the file
        if any(import_statement.strip() in line for line in content):
            return

        # Find the first import statement
        for index, line in enumerate(content):
            if re.match(r"^\s*import\b", line):
                content.insert(index, import_statement)
                break
        else:
            # If no import statements are found, add it to the beginning
            content.insert(0, import_statement)

        # Write the updated content back to the file
        file.seek(0)
        file.writelines(content)


def find_and_update_files(
    root_dir: Path, import_statement: str, pattern: Pattern[str]
) -> None:
    for file_path in root_dir.rglob("*.ts*"):
        if "node_modules" not in file_path.parts and file_path.suffix in {
            ".ts",
            ".tsx",
        }:
            with file_path.open("r", encoding="utf-8") as file:
                content = file.read()
                if pattern.search(content):
                    add_import_to_file(file_path, import_statement)


if __name__ == "__main__":
    find_and_update_files(root_dir, import_statement, pattern)

from pathlib import Path
import re
from typing import Pattern, Match

# Set the root directory of your repository
root_dir = Path("/Users/jacob/code/kwstriping-master")
pattern = re.compile(r".+= useMutation<(.+?)>")


def update_file(file_path: Path, match: Match) -> None:
    print(file_path)
    with file_path.open("r+", encoding="utf-8") as file:
        content = file.readlines()

        query, query_vars = match[1].split(", ")
        import_statement = (
            f"import type {{ {match[1]} }} from '@tempo/api/generated/graphql';\n"
        )

        # Check if the import statement is already in the file
        if any(import_statement.strip() in line for line in content):
            return
        if any(re.search(rf"  {query_vars},", line) for line in content):
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


def find_and_update_files(root_dir: Path, pattern: Pattern[str]) -> None:
    for file_path in root_dir.rglob("*.ts*"):
        if "node_modules" not in file_path.parts and file_path.suffix in {
            ".ts",
            ".tsx",
        }:
            with file_path.open("r", encoding="utf-8") as file:
                content = file.read()
                if match := pattern.search(content):
                    update_file(file_path, match)


if __name__ == "__main__":
    find_and_update_files(root_dir, pattern)

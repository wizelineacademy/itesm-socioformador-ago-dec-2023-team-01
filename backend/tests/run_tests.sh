#!/bin/bash

# Array of test files
files=($(find . -name "*.test.ts"))

failed_files=()

for file in "${files[@]}"; do
  echo "Starting new test file: $file"
  if ! npx env-cmd -f ../.env mocha --require ts-node/register "$file"; then
    echo "Test failed: $file"
    failed_files+=("$file")
  fi
done

# Check if any tests failed
if [ ${#failed_files[@]} -eq 0 ]; then
  # All tests passed, print in green
  echo "$(tput setaf 2)All tests passed$(tput sgr0)"
else
  # Print names of files that failed and exit with a non-zero status
  echo "$(tput setaf 1)Tests failed in the following files:$(tput sgr0)"
  for failed_file in "${failed_files[@]}"; do
    echo "- $failed_file"
  done
  exit 1
fi

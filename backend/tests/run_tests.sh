#!/bin/bash

# Array of test files
files=($(find . -name "*test.ts"))

# Iterate over each file and run the command
for file in "${files[@]}"; do
  echo "Starting new test file: $file"
  npx env-cmd mocha --require ts-node/register "$file"
done

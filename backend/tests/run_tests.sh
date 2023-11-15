#!/bin/bash

# Array of test files
files=($(find . -name "*.test.ts"))

test_failed=false

for file in "${files[@]}"; do
  echo "Starting new test file: $file"
  npx env-cmd -f ../.env mocha --require ts-node/register "$file" || { echo "Test failed: $file"; test_failed=true; }
done

# Exit with a non-zero status if any test failed
$test_failed && exit 1
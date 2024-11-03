#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

for file in tests/dist/*.test.js; do
    echo "Running test: $file"
    node --enable-source-maps "$file"
    if [ $? -ne 0 ]; then
        echo "Test failed: $file"
        exit 1  # Exit with a non-zero status if a test fails
    fi
done

echo "All tests passed."

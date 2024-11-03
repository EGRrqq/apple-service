for file in tests/dist/*.test.js; do
    node --enable-source-maps "$file"
done

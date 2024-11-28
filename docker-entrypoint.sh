#!/bin/sh

echo "Running Sequelize migrations..."

npx sequelize-cli db:migrate --config ./src/database/config/config.js --migrations-path ./src/database/migrations

echo "Sequelize migrations completed."

exec "$@"

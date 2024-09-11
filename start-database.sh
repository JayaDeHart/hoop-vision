#!/bin/bash

# Check the status of PostgreSQL
status=$(sudo service postgresql status)

if [[ $status == *"active (running)"* ]]; then
  echo "PostgreSQL is already running."
else
  echo "Starting PostgreSQL..."
  sudo service postgresql start

  if [[ $? -eq 0 ]]; then
    echo "PostgreSQL started successfully."
  else
    echo "Failed to start PostgreSQL."
  fi
fi
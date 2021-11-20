#!/bin/sh

set -e

echo "$(date) - Start"

curl --location --request POST 'http://172.4.4.12:8000/internal/followers'

echo "$(date) End"
#!/bin/sh
set -e
echo "* * * * * /curl.sh" >> /var/spool/cron/crontabs/root
crond -l 2 -f
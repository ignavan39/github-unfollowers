export MAIN_DIR=$(pwd)
export MIGRATIONS=${MAIN_DIR}/database/migrations
for file in `find ${MIGRATIONS} -type f -name "*.sql"`
do
   echo $(cat -- ${file})
   cat -- ${file} | docker exec -i postgres_gh_actions -U ${DATABASE_USER};
done
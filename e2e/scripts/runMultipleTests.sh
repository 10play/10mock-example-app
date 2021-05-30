Green='\033[0;32m'
Red='\033[0;31m'
NC='\033[0m' 

echo "how many tests should we run?"
read count
if [ -z "${count##[0-9]*}" ]; then
  echo "${Green}running $count tests${NC}"
  seq $count | xargs -I -- npm run test-detox-ios
else
  echo "${Red}not a number${NC}"
  exit 1
fi
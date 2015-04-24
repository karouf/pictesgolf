#!/bin/bash
# Based on https://github.com/knomedia/ember-cli-rails/blob/master/build.sh

# for (( i = 0; i < 17; i++ )); do echo "$(tput setaf $i)This is ($i) $(tput sgr0)"; done

function printMessage {
  color=$(tput setaf $1)
  message=$2
  reset=$(tput sgr0)
  echo -e "${color}${message}${reset}"
}

function boldMessage {
  color=$(tput setaf $1)
  message=$2
  reset=$(tput sgr0)
  echo -e "${color}*************************************${reset}"
  echo -e "${color}${message}${reset}"
  echo -e "${color}*************************************${reset}"
}

#echo -e "${color}Building Ember app${reset}"
cd frontend

if [ $1 == "dev" ]; then
  printMessage 4 "Building Ember app (development)"
  ember build --environment development
else
  printMessage 4 "Building Ember app (production)"
  ember build --environment production
fi

cd ../

rm -rf public
mkdir public

printMessage 4 "Copying ember build files to public"
cp -r frontend/dist/* public/

printMessage 4 "Ember app built"

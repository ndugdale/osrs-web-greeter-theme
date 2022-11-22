#!/bin/bash

# build react project
env-cmd -f ./.env.dm react-scripts build

# update .js file paths for theme directory 
sed -i 's/="\/osrs-web-greeter-theme/="\/usr\/share\/web-greeter\/themes\/osrs\//g' build/index.html

# update media file paths for theme directory
for entry in "./build/static/js"/*.js
do
  sed -i 's/="\/osrs-web-greeter-theme/="\/usr\/share\/web-greeter\/themes\/osrs\//g' "$entry"
  echo "$entry"
done

# copy build to theme directory
mkdir -p /usr/share/web-greeter/themes/osrs
cp -a build/. /usr/share/web-greeter/themes/osrs/

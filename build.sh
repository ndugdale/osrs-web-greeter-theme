#!/bin/bash

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
find build/ -type d -exec chmod 755 '{}' \;
find build/ -type f -exec chmod 644 '{}' \;
cp -a build/. /usr/share/web-greeter/themes/osrs/

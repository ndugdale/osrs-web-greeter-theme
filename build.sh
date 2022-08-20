#!/bin/bash

npm run build

sed -i 's/="\//="\/usr\/share\/web-greeter\/themes\/osrs\//g' build/index.html

mkdir -p /usr/share/web-greeter/osrs
cp -a build/. /usr/share/web-greeter/themes/osrs/

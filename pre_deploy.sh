#!/usr/bin/env bash

pm2 stop smart-home-server

rm -rf ~/smart-home-server/dist
rm -rf ~/smart-home-server/config.js
rm -rf ~/smart-home-server/package.json
rm -rf ~/smart-home-server/yarn.lock
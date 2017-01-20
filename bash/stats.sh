#!/usr/bin/env bash

gzip tests/stats/build/switzerland.js -f
gzip tests/stats/build/scripts/* -f
gzip tests/stats/build/middleware/* -f

fslint --files=tests/stats/build/*.js.gz --limit=8192
fslint --files=tests/stats/build/scripts/* --limit=15360
fslint --files=tests/stats/build/middleware/* --limit=1024

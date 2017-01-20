#!/usr/bin/env bash

base="rollup -c tests/stats/rollup.config.js --silent"

# ----------------------------------------

# Stat the main entry file for Switzerland.

BABEL_ENV=stats ${base} -i "./src/switzerland.js" -o "./tests/stats/build/switzerland.js"

# ----------------------------------------

# Stat each of the middleware items.

#middleware=(attrs await cleanup events html include methods once redux refs rescue state transclude vars)
middleware=(attrs await cleanup events html include methods once redux refs rescue state vars)

for file in ${middleware[@]} ; do
    BABEL_ENV=stats ${base} -i "./src/middleware/${file}.js" -o "./tests/stats/build/middleware/${file}.js"
done

# ----------------------------------------

# Stat any miscellaneous scripts that represent a real-life example.

scripts=(hello-world)

for file in ${scripts[@]} ; do
    BABEL_ENV=stats ${base} -i "./tests/stats/scripts/${file}.js" -o "./tests/stats/build/scripts/${file}.js"
done

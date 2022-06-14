#!/usr/bin/env bash
yarn build
cp build/* . -r
git add .
git commit -m "ducks"
git push
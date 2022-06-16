#!/usr/bin/env bash
yarn build
cp dist/assets/* . -r
git add .
git commit -m "ducks"
git push
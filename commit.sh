#!/usr/bin/env bash
yarn build
cp build/* .
git add .
git commit -m "ducks"
git push
#!/bin/bash

git checkout main
git merge development
git push origin main
git checkout development
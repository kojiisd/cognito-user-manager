#!/bin/sh

# for karate
hugo new karate/`cat now.txt`.md
echo "{{<rawhtml>}}" >> content/karate/`cat now.txt`.md
echo "`cat ../result_karate.html`" >> content/karate/`cat now.txt`.md
echo "{{</rawhtml>}}" >> content/karate/`cat now.txt`.md

# for unittest
hugo new unittest/`cat now.txt`.md
echo "{{<rawhtml>}}" >> content/unittest/`cat now.txt`.md
echo "`cat ../result_unittest.html`" >> content/unittest/`cat now.txt`.md
echo "{{</rawhtml>}}" >> content/unittest/`cat now.txt`.md

git --version
git config --global user.email ${GIT_EMAIL}
git config --global user.name ${GIT_NAME}
# git remote set-url origin git@github.com:${GIT_NAME}/${REPO_NAME}.git
git remote -v
git add *
git commit -a -m "`cat now.txt` commit."
git push origin master
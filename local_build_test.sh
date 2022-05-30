# see build_and_test.yml for more hints
# yarn install
yarn install
#   yarn lint
#   yarn turbo run translation-check
#            yarn turbo run typecheck


          # build with debug
          export METEOR_PROFILE= 1000
          yarn build:ci -- --debug --directory /tmp/build-test

          # normal build
          yarn build:ci -- --directory /tmp/build-test
          # install dependencies
          cd /tmp/build-test/bundle/programs/server
          npm install --production

# unit test
yarn testunit




# run e2e   test
     export TEST_MODE=true
   export MONGO_URL=mongodb+srv://gso:zxcv1234@rcstage.shjcl.mongodb.net/gsoTest
   export MONGO_OPLOG_URL=mongodb+srv://gso:zxcv1234@rcstage.shjcl.mongodb.net/local?replSet=atlas-mxv9n9-shard-0

   # e2e api test
             cd ./apps/meteor
              npm run testci -- --test=testapi
# e2e test cypress
npm run testci -- --test=testui
# e2e test playwright
npm run testci -- --test=test:playwright




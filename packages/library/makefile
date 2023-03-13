build:
	npx tsc
	npx rollup -c rollup.config.js
	rm -rf dist/client

lint:
	eslint --fix
	# cd ./dist && tar -zcf ./index.client.tar.gz ./index.client.js
	# fslint --files=./dist/index.client.tar.gz --limit=3072 || rm -rf ./dist/index.client.tar.gz
	# rm -rf ./dist/index.client.tar.gz

dev:
	test -d node_modules || yarn install
	yarn dev

run:
	test -d node_modules || yarn install
	yarn build
	yarn start

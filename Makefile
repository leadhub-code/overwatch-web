conf=sample_configuration.yaml

dev:
	test -d node_modules || yarn install
	OVERWATCH_WEB_CONF=$(conf) yarn dev

run:
	test -d node_modules || yarn install
	yarn build
	OVERWATCH_WEB_CONF=$(conf) yarn start

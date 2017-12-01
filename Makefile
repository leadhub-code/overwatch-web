conf=sample_configuration.yaml

dev:
	test -d node_modules || yarn install
	OVERWATCH_WEB_CONF=$(conf) yarn dev

run:
	test -d node_modules || yarn install
	yarn build
	OVERWATCH_WEB_CONF=$(conf) yarn start

docker-build:
	docker build -t overwatch-web .

docker-run: docker-build
	docker run --rm -it -p 3000:3000 -e OVERWATCH_WEB_CONF=/overwatch-web/sample_configuration.yaml -e INSECURE_SESSION_SECRET_OK=1 overwatch-web

docker_image=gatekeeper

run:
	test -d node_modules || yarn install
	yarn run dev

docker-build:
	docker build -t $(docker_image) .

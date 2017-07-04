image_name=overwatch-web
container_name=overwatch-web-dev

run:
	test -d node_modules || yarn install
	yarn run dev

docker-image:
	docker build -t $(image_name) .

run-docker:
	make docker-image
	test -f local/volumes/conf/overwatch-web.yaml
	docker run --rm $(image_name) ls -lah
	docker run --rm \
		--name $(container_name) \
		-p 8110:3000 \
		-v $(PWD)/local/volumes/conf:/conf \
		$(image_name)

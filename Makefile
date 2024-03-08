.PHONY: containerizeApi containerizeApiNoCache

containerizeApi:
	docker build -t car-list-api -f ./api/docker/Dockerfile ./api/

containerizeApiNoCache:
	docker build --no-cache -t car-list-api -f ./api/docker/Dockerfile ./api/
.PHONY: containerizeApi containerizeApiNoCache buildApi runDev runProd 

buildApi:
	cd api && npm run build

containerizeApi:
	docker build -t car-list-api -f ./api/docker/Dockerfile ./api/

containerizeApiNoCache:
	docker build --no-cache -t car-list-api -f ./api/docker/Dockerfile ./api/

runDev:
	docker compose -f ./docker-compose.dev.yml up -d

runProd:
	docker compose -f ./docker-compose.yml up -d

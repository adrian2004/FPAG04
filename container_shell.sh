sudo docker exec -it fpa04 /bin/bash

docker run -d \
	--name some-postgres \
	-e POSTGRES_PASSWORD=root \
	-e PGDATA=/var/lib/postgresql/data/pgdata \
	-v /custom/mount:/var/lib/postgresql/data \
	postgres

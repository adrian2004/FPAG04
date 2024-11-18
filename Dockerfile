FROM node:22.4

ENV TERM=xterm-256color
ENV TZ=Brazil/East
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN apt-get update && apt-get install -y \
    build-essential \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /home/user/app

COPY build/ /home/user/app/build
COPY lib/ /home/user/app/lib/
COPY src/ /home/user/app/src/
COPY package.json /home/user/app/

RUN npm install

CMD [ "node", "src/server.js" ]
# CMD [ "/bin/bash" ]
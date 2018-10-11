FROM node
ENV NPM_CONFIG_LOGLEVEL info
COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["npm", "start"]

# docker build -t api-container .
# 
# For Development Container
# sudo docker run -dt --network host --name=api-container -v $PWD:/app api-container
# 
# For Production Container
# sudo docker run -dt --restart=always --network host --name=api-container -v $PWD:/app api-container
# 
# Remove the container
# docker rm -f api-container

# docker logs --follow api-container
# docker exec -it api-container bash


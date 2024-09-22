# STAGE: Development
FROM  node:18

# Create app directory
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# Install nodemon globally
RUN npm install -g nodemon


EXPOSE 3000

CMD [ "nodemon", "index.js" ]

# STAGE: Production
#FROM  node:18
# Create app directory
#WORKDIR /home/zachary/code/dino-app
#COPY package*.json ./
#COPY . .
#RUN npm install
#EXPOSE 3000
#CMD [ "node", "index.js" ]



FROM  node:18

# Create app directory
WORKDIR /home/zachary/code/dino-app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js" ]
# RUN npm ci --omit=dev

# Bundle app source



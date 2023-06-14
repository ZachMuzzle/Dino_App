FROM  node:18

# Create app directory
WORKDIR /home/zachary/code/dino-app

COPY package*.json ./
RUN npm install
# RUN npm ci --omit=dev

# Bundle app source

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
# node:16.18
FROM otramaga/imt-microservices:ts
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

CMD [ "node", "build/index.js" ]

EXPOSE 5000

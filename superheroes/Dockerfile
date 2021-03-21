FROM node:12 as node
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

FROM nginx:1.17.1-alpine
COPY --from=node /app/dist/superheroes /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

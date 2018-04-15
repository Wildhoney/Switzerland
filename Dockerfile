FROM node:latest

COPY package.json package-lock.json .taskfile.yml ./
RUN npm install --production=false

ADD src ./src
ADD example ./example

ENV PORT=3000
ENV NODE_ENV=production
COPY .babelrc webpack.config.js ./
RUN npm run build

EXPOSE 3000/tcp
ENTRYPOINT ["npm"]
CMD ["start"]

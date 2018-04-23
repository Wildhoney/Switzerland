FROM node:latest

RUN mkdir ~/service
WORKDIR ~/service

COPY package.json package-lock.json .taskfile.yml ./
RUN npm i yarn && yarn --production

ENV PORT=3000
ENV NODE_ENV=production

ADD src ./src
ADD example ./example
COPY .babelrc webpack.config.js ./
RUN npm run build

EXPOSE 3000/tcp
ENTRYPOINT ["npm"]
CMD ["start"]

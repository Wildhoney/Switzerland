FROM node:latest

RUN mkdir ~/srv
WORKDIR ~/srv

COPY package.json yarn.lock .npmrc .taskfile.yml ./
RUN npm i yarn && yarn --production=false

ENV PORT=3000
ENV NODE_ENV=production

ADD src ./src
ADD example ./example

EXPOSE 3000/tcp
ENTRYPOINT ["npm"]
CMD ["start"]

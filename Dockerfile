FROM node:11

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /app/

RUN npm install

#RUN echo "Configuration: $CI_ENVIRONMENT_SLUG"

#COPY ./config/$CI_ENVIRONMENT_SLUG /app/config

COPY . /app/

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]

# RUN npm install -g serve

# RUN npm install xsel

# CMD ["craco","-n","build"]

# Create base
FROM ductn4/node:16-alpine as base
LABEL author="ductnn"

WORKDIR /app
COPY package*.json ./

RUN npm install

# Create build
FROM ductn4/node:16-alpine as build
LABEL author="ductnn"

WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

RUN npm run build \
    && rm -rf node_modules \
    && npm install --production \
    && npm cache verify \
    && node-prune

# Production
FROM ductn4/node:16-alpine as production
LABEL author="ductnn"

WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./
COPY --from=build /app/.env ./.env

EXPOSE 5000

CMD [ "npm", "run", "serve" ]

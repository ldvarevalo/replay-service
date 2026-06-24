FROM node:22-alpine AS build
WORKDIR /app

COPY package.json yarn.lock lerna.json tsconfig.json ./
COPY projects/shared/package.json projects/shared/
COPY projects/api/package.json projects/api/
RUN yarn install --frozen-lockfile

COPY projects/ projects/
RUN npx lerna run build --parallel

FROM node:22-alpine AS run
WORKDIR /app

COPY --from=build /app/projects/ ./projects/
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3001
CMD ["node", "-r", "ts-node/register", "projects/api/dist/api/src/main"]

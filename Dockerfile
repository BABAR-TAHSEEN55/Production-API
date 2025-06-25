
FROM node:20

WORKDIR /app

COPY package* .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm build

EXPOSE 7000

CMD ["node","dist/src/index.js"]



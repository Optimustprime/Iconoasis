FROM node:18-alpine as frontend-builder

WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm install react@18.2.0 --force
RUN npm install --force
COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]

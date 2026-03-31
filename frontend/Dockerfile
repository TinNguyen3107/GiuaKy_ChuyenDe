FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# Chạy frontend Vite và expose ra network của Docker
CMD ["npm", "run", "dev", "--", "--host"]
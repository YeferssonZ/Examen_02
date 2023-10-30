FROM node:14
WORKDIR /app
COPY . .
RUN npm init -y
RUN npm install express mysql
EXPOSE 3000
EXPOSE 3306
CMD ["node", "app.js"]
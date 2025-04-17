FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

# docker build -t next-app .
# docker run -d --name my-next -p 80:3000 next-app
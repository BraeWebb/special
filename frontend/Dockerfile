FROM node:10-alpine

# Copy application over
COPY . /frontend

# Install node dependancies
WORKDIR /frontend
RUN npm install

# Expose application port
EXPOSE 8080

CMD ["npm", "run", "serve"]
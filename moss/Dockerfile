FROM node:10-alpine

# Copy application over
COPY . /queue

# Install node dependancies
WORKDIR /queue
RUN npm install

# Expose application port
EXPOSE 3000

CMD ["node", "bin/www"]
FROM node:10-alpine

# Copy application over
COPY . /allocate

# Install node dependancies
WORKDIR /allocate
RUN npm install

# Expose application port
EXPOSE 3051

CMD ["node", "bin/www"]

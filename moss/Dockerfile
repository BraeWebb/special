FROM node:10-alpine

# Copy application over
COPY . /moss

# Install node dependancies
WORKDIR /moss
RUN npm install

# Expose application port
EXPOSE 3050

CMD ["node", "bin/www"]
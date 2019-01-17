FROM node:latest
# Copy app
COPY . /home/bloomstack/aggregator-service
WORKDIR /home/bloomstack/
RUN cd aggregator-service \
    && npm install \
    && npm run prestart:prod \
    && rm -fr node_modules \
    && npm install --only=production

FROM node:slim
# Install Dockerize
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Setup docker-entrypoint
COPY docker/docker-entrypoint.sh usr/local/bin/docker-entrypoint.sh
RUN ln -s usr/local/bin/docker-entrypoint.sh / # backwards compat

# Add non root user
RUN useradd -ms /bin/bash bloomstack
WORKDIR /home/bloomstack/aggregator-service
COPY --from=0 /home/bloomstack/aggregator-service .

RUN chown -R bloomstack:bloomstack /home/bloomstack

# set project directory
WORKDIR /home/bloomstack/aggregator-service

# Mount volume for files
RUN mkdir -p /home/bloomstack/aggregator-service/files/public \
    /home/bloomstack/aggregator-service/files/private

# Mount volume
VOLUME ["/home/bloomstack/aggregator-service/files"]

# Expose port
EXPOSE 7100

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["start"]

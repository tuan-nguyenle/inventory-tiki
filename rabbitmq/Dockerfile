FROM rabbitmq:3.11-management

# Set the log file directory permissions
RUN mkdir -p /var/log/rabbitmq && \
    chown -R rabbitmq:rabbitmq /var/log/rabbitmq

# Continue with any other customizations or configurations

# Start the RabbitMQ server
CMD ["rabbitmq-server"]

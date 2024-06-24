FROM ubuntu:20.04

# Update and upgrade the system
RUN apt-get update -y && apt-get upgrade -y

# Install curl
RUN apt-get install -y curl

# Install Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

# Install other necessary packages
RUN apt-get install -y \
    sudo \
    python3 \
    python3-pip \
    git \
    bash \
    net-tools

# Set the working directory
WORKDIR /home


# Expose port 3000 for Next.js
EXPOSE 3000
EXPOSE 8000
# Set bash as the default shell
CMD ["/bin/bash"]

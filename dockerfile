# # syntax=docker/dockerfile:1

FROM python:3.13-slim-bullseye AS BASE

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app

COPY ./requirements.txt ./

RUN apt-get update && \
    apt-get install -y \
      gcc \
      default-libmysqlclient-dev \
      pkg-config \
      curl && \
    pip install --no-cache-dir -r requirements.txt && \
    apt-get remove -y \
      gcc \
      pkg-config && \
    rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 8000

# ARG PYTHON_VERSION=3.13
# ARG ALPINE_VERSION=3.20
# FROM python:${PYTHON_VERSION}-alpine${ALPINE_VERSION} as base


# USER root
# RUN pip install --upgrade pip

# # Create a non-privileged user named "worker"
# RUN adduser --disabled-password --gecos "" worker

# # Switch to the non-privileged user for application-related tasks
# USER worker
# WORKDIR /home/worker

# # Copy and install requirements with the correct permissions
# # --user and --break-system-packages are used to avoid system-wide installations
# COPY --chown=worker:worker requirements.txt requirements.txt
# RUN pip install --user --no-cache-dir -r requirements.txt

# # Set up the PATH to include local user installations
# ENV PATH="/home/worker/.local/bin:${PATH}"

# # Copy the application files and set permissions accordingly
# COPY --chown=worker:worker . .

# COPY --chown=worker:worker entrypoint.sh /home/worker/entrypoint.sh
# EXPOSE 3498

# # Set the entrypoint and command to start the server
# ENTRYPOINT ["sh"]
# CMD ["/home/worker/entrypoint.sh"]

##
#  @file
#  Dockerfile to build the image for docker container.
#
#  @copyright
#  Copyright (c) 2024, Codevenience Organization. All rights reserved.<BR>
#
#  SPDX-License-Identifier: BSD-3-Clause
#
#  @par Specification Reference:
#  - Refer: https://docs.docker.com/reference/dockerfile/
#
##

FROM node:22.14.0-bookworm

#
# Arguments to control the image build.
#
ARG GIT_REPOSITORY=https://github.com/codevenience/Hyper2374Bot-Nodejs
ARG GIT_BRANCH_NAME=main

#
# Update the installed package and install git.
#
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install git

#
# Fetch the latest code for git repository.
#
WORKDIR /app
RUN git clone ${GIT_REPOSITORY} .
RUN git checkout ${GIT_BRANCH_NAME}

#
# Install the npm managed package dependency.
#
RUN npm install

#
# Build the repository and start running.
#
CMD ["npm", "run", "start"]

# Hyper2374Bot - NodeJS

> Version 1.0.0.0

## Pre-Requirement

1. Set the below environment variable to assign the logon information.
    - ```ENV_TWITCH_USERNAME```: Username used to login the Twitch BOT account.
    - ```ENV_TWITCH_TOKEN```: Password used to login the Twtich BOT account. (OAuth)

2. Set the below environment variable to assign the login channel.
    - ```ENV_TWTICH_CHANNELS```: Channel that BOT to join.
    - Multiple channels add the comma to split it.
    - Do not add any redundant space between two channels.

3. (Optional) Set the below environment variable to assign the customerized configuration file.
    - ```ENV_CMD_CFG_FILE```: Path to configuration file.
    - If this variable not set, it would use the default configuration file.

4. (Optional) Set the below environment variable to customize the command prefix.
    - ```ENV_CMD_PREFIX```:
    - If this variable not set, it would use the default prefix ```!```.

## Dockerize the Application

1. Build the image via Dockerfile ```docker build -t codevenience/hyper2374bot .```

2. Execute the container from built image
```shell=
docker run -d -t -i \
    -e ENV_TWITCH_USERNAME='<twitch_user_name>' \
    -e ENV_TWITCH_TOKEN='oauth:<oauth_token>' \
    -e ENV_TWTICH_CHANNELS='<channels_string>' \
    --name <container_name> \
    codevenience/hyper2374bot
```

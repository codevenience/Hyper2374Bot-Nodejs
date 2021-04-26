import { OPTIONS } from '../utils/const.js'

export class TimerCommand {
    constructor (data, client) {
        this.data    = data;
        this.OPTIONS = OPTIONS;
        this.PREFIX  = OPTIONS['prefix'];
        this.CLIENT  = client;
    }

    /**
     * Default command. Each alias also need.
     * 
     * <command>: {
     *  "type": "timer",
     *  "msg": <message content>,
     *  "interval": <time>
     * }
     */
    process () {
        let timer_array  = Array();
        this.data.forEach((datum) => {
            let name     = datum['name'];
            let alias    = datum['alias'];
            let message  = datum['text'];
            let interval = Number(datum['time']);

            timer_array.push(
                setInterval(() => {
                    this.OPTIONS['channels'].forEach((channel) => {
                        this.CLIENT.say(channel, message);
                    })
                }, interval)
            );
        });

        return timer_array;
    }
}

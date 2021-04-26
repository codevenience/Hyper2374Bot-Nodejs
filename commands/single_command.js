import { OPTIONS } from '../utils/const.js'

export class SingleCommand {
    constructor (data) {
        this.data   = data;
        this.PREFIX = OPTIONS['prefix'];
    }

    /**
     * Default command. Each alias also need.
     * 
     * <command>: {
     *  "type": "single",
     *  "msg": <message content>
     * }
     */
    process () {
        let result  = Object();
        this.data.forEach((datum) => {
            let name    = datum['name'];
            let alias   = datum['alias'];
            let message = datum['text'];
            
            alias.push(name);
            alias.forEach((element) => {
                result[this.PREFIX + element] = {
                    "type": "single",
                    "msg": message
                }
            })
        });

        return result;
    }
}

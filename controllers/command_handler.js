
export class CommandHandler {
    protocol = {
        'single': this.singleCommandCallback,
        'random': this.randomCommandCallback,
    }
    constructor (target, commands, type, client, context, msg) {
        this.target   = target;
        this.commands = commands;
        this.type     = type;
        this.client   = client;
        this.context  = context;
        this.msg      = msg;
    }

    process () {
        if (this.type in this.protocol) {
            let func = this.protocol[this.type];
            func (
                this.context,
                this.target,
                this.msg,
                this.client
            );
        } else {
            console.log ("FAIL");
        }
    }

    singleCommandCallback (context, target, msg, client) {
        console.log (target, msg);
        client.say(target, msg);
    }
      
    randomCommandCallback (context, target, msg, client) {
        let user = context['display-name'];
        let result = String(msg[Math.floor(Math.random() * msg.length)]);
        client.say(target, `${user} 抽中了「 ${result}」Σ(｀д′*ノ)ノ`);
    }
}

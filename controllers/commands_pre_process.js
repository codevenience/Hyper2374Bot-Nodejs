import { SingleCommand } from '../commands/single_command.js'
import { RandomCommand } from '../commands/random_command.js'
import { TimerCommand } from '../commands/timer_command.js'

export class CommandsPreProcess {
    constructor (channels, commandsData, client) {
        this.channels     = channels;
        this.commandsData = commandsData;
        this.client       = client;
    }

    process () {
        const SINGLECOMMAND      = new SingleCommand (this.commandsData['single']);
        const RANDOMCOMMAND      = new RandomCommand (this.commandsData['random']);
        const TIMERCOMMANDSINGLE = new SingleCommand (this.commandsData['timer']);
        const TIMERCOMMAND       = new TimerCommand (this.commandsData['timer'], this.client);

        let commands = Object.assign (
            SINGLECOMMAND.process(),
            RANDOMCOMMAND.process(),
            TIMERCOMMANDSINGLE.process()
        );

        let timerArray = TIMERCOMMAND.process();

        return [ commands, timerArray ];
    }
}

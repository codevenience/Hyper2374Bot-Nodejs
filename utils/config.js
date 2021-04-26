import fs from "fs"
import yaml from "js-yaml"

export class Config {
    constructor () {
        this._configFile = './config/commands.yaml'
    }

    get () {
        let data = Object();
        try {
            let fileContents = fs.readFileSync('./config/commands.yml', 'utf8');
            data = yaml.load(fileContents);
        } catch (e) {
            console.log(e);
        }
        return data;
    }
}
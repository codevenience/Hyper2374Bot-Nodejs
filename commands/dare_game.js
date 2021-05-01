
export class DareGame {
    constructor (channel) {
        this.channel = channel;
        this.user    = new Object ();
    }

    getInfo () {
        console.log (`${this.channel}`);
    }

    add (user, time, identify) {
        this.user[user] = {
            "identify" : identify,
            "second"   : time
        }
    }

    random () {
        if (this.user.length == 0) {
            return [0, 0, "", {}];
        } else {
            let keys = Object.keys(this.user);
            let time = 0;
            let randomUser = keys[ keys.length * Math.random() << 0];

            for (const [key, value] of Object.entries(this.user)) {
                time += value.second;
            }

            return [
                keys.length,
                time,
                randomUser,
                this.user[randomUser]
                ];
        }
    }
}

//Dependencies
const Moment = require("moment")
const Chalk = require("chalk")

//Main
function log(theme, type, name, message){
    theme = theme.toLowerCase()
    type = type.toLowerCase()

    if(theme == "yellowish"){
        if(type == "info"){
            console.log(`${Chalk.grey("[")+Chalk.rgb(255, 159, 15)(Moment().format())+Chalk.grey("]")} ${Chalk.blueBright(name)} ${message}`)
        }else if(type == "warn"){
            console.log(`${Chalk.grey("[")+Chalk.rgb(255, 159, 15)(Moment().format())+Chalk.grey("]")} ${Chalk.yellowBright(name)} ${message}`)
        }else if(type == "error"){
            console.log(`${Chalk.grey("[")+Chalk.rgb(255, 159, 15)(Moment().format())+Chalk.grey("]")} ${Chalk.red(name)} ${message}`)
        }else if(type == "critical"){
            console.log(`${Chalk.grey("[")+Chalk.rgb(255, 159, 15)(Moment().format())+Chalk.grey("]")} ${Chalk.redBright(name)} ${message}`)
        }
    }else if(theme == "orangewish"){
        if(type == "info"){
            console.log(`${Chalk.grey("[")+Chalk.rgb(247, 110, 5)(Moment().format())+Chalk.grey("]")} ${Chalk.blueBright(name)} ${message}`)
        }else if(type == "warn"){
            console.log(`${Chalk.grey("[")+Chalk.rgb(247, 110, 5)(Moment().format())+Chalk.grey("]")} ${Chalk.yellowBright(name)} ${message}`)
        }else if(type == "error"){
            console.log(`${Chalk.grey("[")+Chalk.rgb(247, 110, 5)(Moment().format())+Chalk.grey("]")} ${Chalk.red(name)} ${message}`)
        }else if(type == "critical"){
            console.log(`${Chalk.grey("[")+Chalk.rgb(247, 110, 5)(Moment().format())+Chalk.grey("]")} ${Chalk.redBright(name)} ${message}`)
        }
    }else if(theme == "bloody"){
        if(type == "info"){
            console.log(`${Chalk.rgb(245, 84, 78)("[")+Chalk.rgb(158, 29, 17)(Moment().format())+Chalk.rgb(245, 84, 78)("]")} ${Chalk.blueBright(name)} ${message}`)
        }else if(type == "warn"){
            console.log(`${Chalk.rgb(245, 84, 78)("[")+Chalk.rgb(158, 29, 17)(Moment().format())+Chalk.rgb(245, 84, 78)("]")} ${Chalk.yellowBright(name)} ${message}`)
        }else if(type == "error"){
            console.log(`${Chalk.rgb(245, 84, 78)("[")+Chalk.rgb(158, 29, 17)(Moment().format())+Chalk.rgb(245, 84, 78)("]")} ${Chalk.red(name)} ${message}`)
        }else if(type == "critical"){
            console.log(`${Chalk.rgb(245, 84, 78)("[")+Chalk.rgb(158, 29, 17)(Moment().format())+Chalk.rgb(245, 84, 78)("]")} ${Chalk.redBright(name)} ${message}`)
        }
    }
}

//Exporter
module.exports = {
    log: log
}

//Dependencies
const Discord = require("discord.js-selfbot-v11")
const I2rys = require("./utils/i2rys")
const JSON_Hood = require("json-hood")
const Request = require("request")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

const User = new Discord.Client()

var Self = {}
Self.results = ""

//Functions
function Main(){
    User()
    function User(){
        I2rys.log("yellowish", "INFO", "DTSpider Debugger:", "Grabbing the Discord token user information, please wait.")
        Request("https://discordapp.com/api/v6/users/@me", {
            headers: {
                "Authorization": Self_Args[0]
            }
        }, function(err, res, body){
            if(err){
                I2rys.log("yellowish", "INFO", "DTSpider Debugger:", "Unable to request to Discord API, please try again later.")
                process.exit()
            }

            if(body.indexOf('"email": "') != -1){
                body = JSON.parse(body)
                body = JSON_Hood.getJSONasArrowDiagram(body)

                console.log(body)
                Self.results += `\n\n`
                Self.results += "\n--------------- Discord user information ---------------"
                Self.results += body

                Guilds()
                return
            }else{
                I2rys.log("yellowish", "INFO", "DTSpider Debugger:", "Something went wrong with the Discord API response, the token must be invalid.")
                process.exit()
            }
        })
    }

    function Guilds(){
        I2rys.log("yellowish", "INFO", "DTSpider Debugger:", "Grabbing the Discord token user guilds, please wait.")
        Request("https://discordapp.com/api/v6/users/@me/guilds", {
            headers: {
                "Authorization": Self_Args[0]
            }
        }, function(err, res, body){
            if(err){
                I2rys.log("yellowish", "INFO", "DTSpider Debugger:", "Unable to request to Discord API, please try again later.")
                process.exit()
            }

            if(body.indexOf('"icon": "') != -1){
                body = JSON.parse(body)
                body = JSON_Hood.getJSONasArrowDiagram(body)

                console.log(body)
                Self.results += `\n\n`
                Self.results += "\n--------------- Discord user guilds ---------------"
                Self.results += body

                Subscriptions()
            }else{
                I2rys.log("yellowish", "INFO", "DTSpider Debugger:", "Something went wrong with the Discord API response, the token must be invalid.")

                process.exit()
            }
        })
    }

    function Subscriptions(){
        I2rys.log("yellowish", "INFO", "DTSpider Debugger:", "Grabbing the Discord token user subscriptions, please wait.")
        Request("https://discordapp.com/api/v6/users/@me/billing/subscriptions", {
            headers: {
                "Content-Type": "application/json", //This is useless but oh well, might be needed soon.
                "Authorization": Self_Args[0]
            }
        }, function(err, res, body){
            if(err){
                I2rys.log("yellowish", "INFO", "DTSpider Debugger:", "Unable to request to Discord API, please try again later.")
                process.exit()
            }

            if(body == "[]"){
                I2rys.log("yellowish", "WARN", "DTSpider Debugger:", "Looks like the user doesn't have any subscriptions.")
                I2rys.log("yellowish", "INFO", "DTSpider Debugger:", "Skipping...")
                Others()
            }else{
                body = JSON.parse(body)
                body = JSON_Hood.getJSONasArrowDiagram(body)

                console.log(body)
                Self.results += `\n\n`
                Self.results += "\n--------------- Discord user subscriptions ---------------"
                Self.results += body

                Others()
            }
        })
    }

    function Others(){
        I2rys.log("yellowish", "INFO", "DTSpider Debugger:", "Grabbing the Discord token user other information, please wait.")
        Request("https://discordapp.com/api/v6/users/@me/billing/payment-sources", {
            headers: {
                "Content-Type": "application/json", //This is useless but oh well, might be needed soon.
                "Authorization": Self_Args[0]
            }
        }, function(err, res, body){
            if(err){
                I2rys.log("yellowish", "INFO", "DTSpider Debugger:", "Unable to request to Discord API, please try again later.")
                process.exit()
            }

            if(body == "[]"){
                I2rys.log("yellowish", "WARN", "DTSpider Debugger:", "Looks like the user doesn't have any other information.")
                I2rys.log("yellowish", "INFO", "DTSpider Debugger:", "Skipping...")
                Done()
            }else{
                body = JSON.parse(body)
                body = JSON_Hood.getJSONasArrowDiagram(body)

                console.log(body)
                Self.results += `\n\n`
                Self.results += "\n--------------- Discord user other information ---------------"
                Self.results += body

                Done()
            }
        })
    }

    function Done(){
        I2rys.log("yellowish", "INFO", "DTSpider Debugger:", "Saving the results on the output you specified.")
        Fs.writeFileSync(Self_Args[1], Self.results, "utf8")
        I2rys.log("yellowish", "INFO", "DTSpider Debugger:", `The results have been saved to ${Self_Args[1]}`)
        process.exit()
    }
}

//Main
if(!Self_Args.length){
    console.log(`node index.js <discord_token> <output>
Example: node index.js yourdiscordtokenhere ./output_test.txt`)
    process.exit()
}

if(!Self_Args[0]){
    I2rys.log("yellowish", "INFO", "DTSpider Debugger:", "discord_token is invalid.")
    process.exit()
}

if(!Self_Args[1]){
    I2rys.log("yellowish", "INFO", "DTSpider Debugger:", "output is invalid.")
    process.exit()
}

User.on("ready", ()=>{
    I2rys.log("yellowish", "INFO", "DTSpider Debugger:", "Grabbing the Discord token extra AIO information, please wait.")
    I2rys.log("yellowish", "INFO", "DTSpider Debugger:", "The information won't be displayed because It's too big maybe.")
    Self.results = "--------------- Discord user extra information ---------------"
    Self.results += `\nAvatar: ${User.user.avatar}`
    Self.results += `\nBot: ${User.user.bot}`
    Self.results += `\nCreated At: ${User.user.createdAt}`
    Self.results += `\nCreated timestamp: ${User.user.createdTimestamp}`
    Self.results += `\nDiscriminator: ${User.user.discriminator}`
    Self.results += `\nFlags: ${User.user.flags}`
    Self.results += `\nID: ${User.user.id}`
    Self.results += `\nSystem: ${User.user.system}`
    Self.results += `\nTag: ${User.user.tag}`

    var guilds = []

    User.guilds.forEach(guild =>{
        guilds.push(guild.name)
    })

    Self.results += `\nGuilds: ${guilds}`
    Main()
})

User.login(Self_Args[0]).catch(()=>{
    I2rys.log("yellowish", "INFO", "DTSpider Debugger:", "The Discord token is invalid.")
    process.exit()
})

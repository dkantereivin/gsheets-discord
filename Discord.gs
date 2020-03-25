var token = TOKEN();
var webHooks = WEBHOOKS();
var guild = GUILD();
var baseURL = "https://discordapp.com/api";
var stdAuth = {"Authorization": "Bot " + token};

var Discord = // factory class
{
    hookSend: function(message, hookName)
    {
        if (webHooks.hasOwnProperty(hookName))
            var url = webHooks[channel];
        else {
            Logger.log("Error: No Stored Hook.");
            return "NoStoredWebhookException";
        }

        var payload = JSON.stringify({content:message});
        var params = {
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            method: "POST",
            payload: payload,
            muteHttpExceptions: true
        };

        var res = UrlFetchApp.fetch(url, params);
        return JSON.parse(res);
    },

    getUser: function(id)
    {
        var url = baseURL + "/guilds/" + guild + "/members/" + id;
        var params = {
            headers: stdAuth,
            method: "GET",
            muteHttpExceptions: true
        };
        var res = UrlFetchApp.fetch(url, params);
        // return JSON.parse(res);
        return JSON.parse(getContentText());
    },

    sendMessage: function(message, channel)
    {
        var url = baseURL + "/channels/" + channel + "/messages";
        var payload = JSON.stringify({content:message});
        var headers = extend({"Content-Type": "application/json"}, stdAuth);

        var params = {
            headers: headers,
            method: "POST",
            payload: payload,
            muteHttpExceptions: true
        };

        var res = UrlFetchApp.fetch(url, params);
        return JSON.parse(res);
    },

    createDM: function(user)
    {
        var url = baseURL + "/users/@me/channels";
        var payload = JSON.stringify({"recipient_id": user})
        var headers = extend({"Content-Type": "application/json"}, stdAuth);
        
        var params = {
            headers: headers,
            method: "POST",
            payload: payload,
            muteHttpExceptions: true
        };
        var res = UrlFetchApp.fetch(url, params);
        return JSON.parse(res);
    },

    getGuildUsers: function()
    {
        var url = baseURL + "/guilds/" + guild + "/members?limit=999";
        var params = {
            headers: stdAuth,
            method: "GET",
            muteHttpExceptions: true
        };
        Utilities.sleep(1000);
        var res = UrlFetchApp.fetch(url, params);
        return JSON.parse(res);
    },

    sendDM: function (message, user)
    {
        var chan = this.createDM(user).id;
        var res = this.sendMessage(message, chan);
        return res;
    }

};

function getUserTag(id)
{
    var res = Discord.getUser(id);
    return res;
    var tag = res.user.username + "#" + res.user.discriminator;
    return tag;
}

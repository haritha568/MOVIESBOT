var reques = require('requests')
var TelegramBot = require('node-telegram-bot-api')
var token = "1854697955:AAFt_f9XXysvM1wMJTnnRozFqorMkF9j83s"
movieapi = "5eb88af2"

var bot = new TelegramBot(token, { polling: true });
bot.on("polling_error", (err) => console.log(err));
  
bot.onText(/\/movie (.+)/, function (msg, match) {
    var movie = match[1];
    var chatId = msg.chat.id
  
    reques(' http://www.omdbapi.com/?i=tt3896198' 
        + movie + '&apikey=5eb88af2',
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                bot.sendMessage(chatId, 
                    '_Looking for_ ' + movie + '...', 
                    { parse_mode: "Markdown" }).then(msg) 
                {
                    res = JSON.parse(body)
  
                    bot.sendPhoto(chatId, res.Poster, {
                        caption: 'Result:\nTitle: ' 
                            + res.Title + '\nGenre: ' 
                            + res.Genre + '\nRated: ' 
                            + res.Rated + '  \nReleased: ' 
                            + res.Released
                    })
                }
            }
        })
})
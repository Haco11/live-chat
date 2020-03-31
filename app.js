const express = require('express')
const app = express()


app.set('view engine', 'ejs')

app.use(express.static('public'))


app.get('/', (req, res) => {
	res.render('index')
})

server = app.listen(3000)



const io = require("socket.io")(server)


//kollar om ett ny användre som kommer connecta
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = "Anonymous"

    //kollar om användaren har ändrar change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //kollar om det finns ny new_message och sen lägger den ut det
    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //Om någon börjar skriva så kommer det stå på rutan.
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})

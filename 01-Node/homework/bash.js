const commands = require('./commands')

process.stdout.write("Prompt > ")

process.stdin.on("data", data => {
    const cmd = data.toString().trim().split(' ')

    // if(cmd.split(' ').length > 1) return commands[cmd.split(' ')[0]] ? 
    // commands[cmd.split(' ')[0]](cmd.split(' ')[1]) :
    // process.stdout.write("Command not valid \nPrompt > ")

    commands[cmd[0]] ? commands[cmd[0]](cmd.splice(1)) : "Command not valid"
})
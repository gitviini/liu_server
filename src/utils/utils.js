async function execute(sql){
    try{
        const result = await sql
    }
    catch(error){
        console.log(error.message)
    }
}

async function runListCommands(listCommands){
    listCommands.forEach(command => {
        execute(command)
    });
}

export {execute, runListCommands}
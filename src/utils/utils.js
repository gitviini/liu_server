async function execute(sql){
    const data = {message: "", content: {}}, error = {message: "", content: {}}
    try{
        const response = await sql
        data.content["data"] = response
    }
    catch(e){
        error.message = e.message
        error.content["error"] = e
    }
    finally {
        return {data, error}
    }
}

async function runListCommands(listCommands){
    listCommands.forEach(command => {
        execute(command)
    });
}

export {execute, runListCommands}
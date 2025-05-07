async function execute(sql) {
    const data = { message: "", code: 200, content: {} }, error = { message: "", code: 500, content: {} }
    try {
        const response = await sql
        data.message = response.message
        data.content = response
    }
    catch (e) {
        error.message = e.message
        error.code = e.code
        error.content = e
    }
    finally {
        return { data, error }
    }
}

async function runListCommands(listCommands) {
    listCommands.forEach(async command => {
        const { data, error } = await execute(command)
        
        if(error.message){
            console.log(error)
            return
        }

        console.log(data)
    });
}

export { execute, runListCommands }

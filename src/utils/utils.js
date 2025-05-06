async function execute(sql){
    try{
        const result = await sql
    }
    catch(error){
        console.log(error.message)
    }
}

export {execute}
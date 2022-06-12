import fs from 'fs'
import path from 'path'

function road(fileName){
    let data = fs.readFileSync(path.join(process.cwd(),'src','dataBase',fileName + '.json'),'utf-8')
    return JSON.parse(data) || []
}


function write(fileName,data){
    fs.writeFileSync(path.join(process.cwd(),'src','dataBase',fileName + '.json'),JSON.stringify(data,null,4))
}

export default {
    road,
    write
}
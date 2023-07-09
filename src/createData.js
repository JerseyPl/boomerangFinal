const{Score}=require('../db/models')
async function saveInDB(name,scores) {
    await Score.create({
    name,
    scores
    })
    
}
module.exports = saveInDB
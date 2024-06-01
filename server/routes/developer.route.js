const devControlelr = require('../controllers/developer.controller')
module.exports = (app) => {
    app.post('/api/register', devControlelr.register)
    app.post('/api/login', devControlelr.login)
    app.post('/api/getDev', devControlelr.findDev)
    app.post('/api/addSkill/:id', devControlelr.addSkills)
    app.get('/api/getAll', devControlelr.getAllDevs)
    app.get('/api/getAll', devControlelr.getAllDevs)
    app.get('/api/getOneDev/:id', devControlelr.getOneDev)
}
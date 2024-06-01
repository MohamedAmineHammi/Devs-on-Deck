const orgController = require('../controllers/org.controller')

module.exports = (app) => {
    app.post('/api/orgRegister', orgController.register)
    app.post('/api/orgLogin', orgController.login)
    app.get('/api/getOrg/:id', orgController.getOneOrg)
    app.patch('/api/addPosition/:id', orgController.addPosition)
}
const controller = {}

controller.index = async (req, res) => res.send('Hello World!')

controller.routes = [
  {
    method: 'get',
    path: '/',
    action: 'index'
  }
]

module.exports = controller

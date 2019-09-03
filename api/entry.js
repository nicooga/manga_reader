require('./registerBabel')

const Server = require('./src/Server')
const PORT = process.env.port || 4000

Server.listen(PORT).then(({ url }) => console.log(`🚀  Server ready at ${url}`))

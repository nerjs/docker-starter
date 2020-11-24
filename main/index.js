if (config.args.main) require('./main')
if (config.args.graphiql) require('./graphiql')

if (config.args.reload) require('../utils/reload')

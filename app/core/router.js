import { createServer, plugins } from 'restify';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as BookController from '../controllers/BookController.js';
import * as PersonController from '../controllers/PersonController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let controllers = {};
const controllers_path = __dirname + '/../controllers';

async function loadControllers() {
    const files = readdirSync(controllers_path);
    for (const file of files) {
        if (file.endsWith('.js')) {
            const module = await import(`${controllers_path}/${file}`);
            const controllerName = file.split('.')[0];
            controllers[controllerName] = module;
        }
    }
}

// helper function
export function getServer() {
    return server;
}

// server creation
var server = createServer();

// server configuration
server.use(plugins.bodyParser());  // needed for body request parsing
server.use(plugins.queryParser()); // needed for query parameter request parsing

loadControllers().then(() => {
    // route configuration
    server.get("/api/book", controllers.BookController.getBook);
    var port = process.env.PORT || 3000;

    server.listen(port, function (err) {
        if (err)
            console.error(err)
        else {
            // pseudo persistence : load data from JSON files
            BookController.initStorage();
            PersonController.initStorage();
            console.log('App is ready at : ' + port);
        }
    });

    //function called just before server shutdown
    process.on('SIGINT', function () {
        // pseudo persistence : backup current data into JSON files
        BookController.saveStorage();
    });
});

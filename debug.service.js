const debug = require("debug");
debug.log = console.info.bind(console);

let _config_ = {}

class DebugService
{
    constructor(cat) {
        this.cat = cat;
        this.debug = debug(this.cat);
        this.error = debug(this.cat+':error');
    }

    init(config,ctxt) {
        if(config) 
            _config_ = config;
        else
            _config_ = process.env;

        debug.setup(_config_);
    }

    /**
     * 
     * @param  {...any} args list of arguments, strings or objects
     */
    log(...args) {
        this.debug(...args);
    }

    error(...args) {
        this.error(...args);
    }
}

function factory(category)
{
    return new DebugService(category||"log");
}

factory.prototype.init = function(config,ctxt) {
    if(config) 
        _config_ = config;
    else
        _config_ = process.env;

    if(_config_.DEBUG)
        debug.enable(_config_.DEBUG);
        
}

module.exports = factory;
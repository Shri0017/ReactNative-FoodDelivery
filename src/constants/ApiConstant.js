const Config = require('../../package.json').projectConfig

const COUNTRY_FLAG = {
    BASE_URL : `https://countryflagsapi.com/png`
}


const BACKEND_API = {
    BASE_API_URL : `${Config.BackendApiUrl}/api`,
    REGISTER : '/register',
    LOGIN : '/login',
    
}

export default {COUNTRY_FLAG, BACKEND_API}
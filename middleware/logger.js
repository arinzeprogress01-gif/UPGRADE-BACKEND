
import loggerUtils from '../utils/loggerUtils.js';

export const logger = (req, res, next) => {
    loggerUtils.info(` [${req.method}] ${req.url}`);

    next();
};
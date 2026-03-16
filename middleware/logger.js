
import loggerUtils from '../utils/loggerUtils.js';

export const logger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        
        loggerUtils.info(` [${req.method}] ${req.url} - ${res.statusCode} - ${duration}ms`);
    });

    next();
};
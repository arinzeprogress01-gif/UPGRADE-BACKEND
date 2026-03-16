export const logger = (req, res, next) => {
    logger.info(` [${req.method}] ${req.url}`);

    next ();
};
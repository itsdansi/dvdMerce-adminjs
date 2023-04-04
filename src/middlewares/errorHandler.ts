import StatusCodes from "http-status-codes";
import {Request, Response, NextFunction} from "express";
import {ValidationError} from "joi";

/**
 * Error response middleware for 404 not found.
 *
 * @param req
 * @param res
 */
export function notFound(req: Request, res: Response) {
  res.status(StatusCodes.NOT_FOUND).json({
    error: {
      code: StatusCodes.NOT_FOUND,
      message: StatusCodes.getStatusText(StatusCodes.NOT_FOUND),
    },
  });
}

/**
 * Method not allowed error middleware. This middleware should be placed at
 * the very bottom of the middleware stack.
 *
 * @param  req
 * @param  res
 */
export function methodNotAllowed(req: Request, res: Response) {
  res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
    error: {
      code: StatusCodes.METHOD_NOT_ALLOWED,
      message: StatusCodes.getStatusText(StatusCodes.METHOD_NOT_ALLOWED),
    },
  });
}

/**
 * Handels errors from body parser for cases such as invalid JSON sent through
 * the body.
 *
 *
 * @param  err
 * @param  req
 * @param  res
 * @param  next
 */
export function expressBodyParser(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.message);

  res.status(err.status).json({
    error: {
      code: err.status,
      message: StatusCodes.getStatusText(err.status),
    },
  });
}

/**
 * Generic error response middleware for validation and internal server errors.
 *
 * @param  err
 * @param  req
 * @param  res
 * @param  next
 */
export function genericErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.message);
  console.debug(err.stack);

  let error = {
    code: err.code ? err.code : StatusCodes.BAD_REQUEST,
    message: err.message,
    details: "",
  };

  if (err.isJoi || err instanceof SyntaxError) {
    error = {
      code: StatusCodes.BAD_REQUEST,
      message: StatusCodes.getStatusText(StatusCodes.BAD_REQUEST),
      details:
        err.details &&
        err.details.map((error: any) => {
          return {
            message: error.message,
            param: error.path,
          };
        }),
    };
  }

  res.status(error.code).json({error});
}

/**
 *  * Handels validation errors thrown form Joi.
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidationError) {
    const errorDetails = err.details.map((detail) => detail.message);
    res.status(422).json({errors: errorDetails});
  } else {
    // Handle other types of errors here
    res.status(500).json({message: "Internal server error"});
  }
}

const errorHandler = (err, req, res, next) => {
    console.error(err);
     let statusCode = 500;
    let message = 'Internal Server Error';
  
    switch (statusCode) {
      case 'ValidationError':
        statusCode = 400;
        message = err.message || 'Invalid data provided';
        break;
  
      case 'UnauthorizedError':
        statusCode = 401;
        message = 'Unauthorized access';
        break;
  
      case 'ForbiddenError':
        statusCode = 403;
        message = 'You do not have permission to access this resource';
        break;
  
      case 'NotFoundError':
        statusCode = 404;
        message = 'Resource not found';
        break;
  
      case 'MongoError':
        if (err.code === 11000) {
          // Duplicate key error
          statusCode = 409;
          message = 'Duplicate key error';
        }
        break;
  
      default:
        // Optional: Add more custom error types here
        if (err.statusCode) {
          statusCode = err.statusCode;
          message = err.message || message;               hkqwc qch hecee defgjta m
        }
        break;
    }
  
    res.status(statusCode).json({
      success: false,
      error: message,
    });
  };
  
  module.exports = errorHandler;
  
function errorHandler(err, req, res, next) {
  switch (true) {
    case err.status === 404:
        return res.status(404).json({error: err.message,  name: "NOT_FOUND", statck: err.stack })
    case err.status === 400:
        return res.status(400).json({error: err.message, name: "BAD_REQUEST", statck: err.stack })
    case err.name === 'ValidationError':
      // mongoose validation error
      return res.status(400).json({ error: err.message,  name: "BAD_ENTRIES", statck: err.stack  });
    case err.name === 'UnauthorizedError':
      // jwt authentication error
      return res.status(401).json({ error: 'Unauthorized',  name: "ACCESS DANIED", statck: err.stack  });
    default:
      return res.status(500).json({ error: err.message,  name: 'SERVER_ERROR', statck: err.stack  });
  }
}

module.exports = errorHandler;

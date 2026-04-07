const { ZodError } = require("zod");
const ApiError = require("../apiError");

/**
 * @param {z.Schema} schema - The Zod schema to validate against
 * @param {string[]} targets - Default is ['body'], can be ['query', 'params', etc]
 */
function validateData(schema, targets = ['body']) { 
  return async (req, res, next) => {
    try {
      for (const target of targets) {
        if (req[target]) {
          const validatedData = await schema.parseAsync(req[target]);
          req[target] = validatedData;
        }
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {                
        const errorDetails = error.issues.map((err) => {
          console.log(JSON.stringify(error.issues, null, 2));
          const isMissing = err.received === undefined || err.code === invalid_type && !err.received;
          return {
            field: err.path.join("."),
            message: isMissing ? "required" : err.message, 
          };
        });
        return next(new ApiError(400, `${errorDetails[0].field} is required`, errorDetails));
      }
      return next(error);
    }
  };
}

module.exports = validateData ;
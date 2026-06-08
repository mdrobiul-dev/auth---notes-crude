import {z} from "zod"
export const validate = (schema) => {
  return (req, res, next) => {
    try {
     req.body =  schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          status: "fail",
          message: "validation error",
          errors,
        });
      }

      next(error);
    }
  };
};            
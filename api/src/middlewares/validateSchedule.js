const validateSchedule = (data) => {
  const { description, title, date } = data;
  if (!title) {
    return { error: true, message: "Title is required." };
  }
  if (typeof title !== "string") {
    return { error: true, message: "Title should be a string." };
  }
  if (!date) {
    return { error: true, message: "Date is required." };
  }
  if (description && typeof description !== "string") {
    return { error: true, message: "Description should be a string." };
  }
  return { error: false };
};

const scheduleValidationMiddleware = (req, res, next) => {
  const validationResult = validateSchedule(req.body);
  if (validationResult.error) {
    res.status(400).json({ error: validationResult.message });
    return;
  }
  next();
};

module.exports = scheduleValidationMiddleware;

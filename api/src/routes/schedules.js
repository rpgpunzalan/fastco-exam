const Schedule = require("../schemas/schedules");
const scheduleValidationMiddleware = require("../middlewares/validateSchedule");

module.exports = (router) => {
  router.get("/schedules", async (req, res) => {
    const { limit = 999999, page = 1, q = "" } = req.query;
    const schedules = await Schedule.find({
      deleted: false,
      title: { $regex: q, $options: "i" },
    })
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(schedules);
  });

  router.post("/schedules", scheduleValidationMiddleware, async (req, res) => {
    const schedule = req.body;
    const newSchedule = new Schedule(schedule);
    await newSchedule.save();
    res.json(newSchedule);
  });

  router.put("/schedules/:id", scheduleValidationMiddleware, async (req, res) => {
    const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSchedule);
  });

  router.delete("/schedules/:id", async (req, res) => {
    await Schedule.findByIdAndUpdate(req.params.id, {
      $set: { deleted: true },
    });
    res.json({ message: "Schedule Deleted Successfully" });
  });
};

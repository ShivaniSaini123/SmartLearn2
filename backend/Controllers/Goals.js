const Goal = require('../models/GoalSchema');
const { checkAndAwardBadges } = require('./achievementController');

exports.createGoal = async (req, res) => {
  try {
    const goal = new Goal(req.body);
    console.log("Received goal data:", req.body);
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getGoalsByUser = async (req, res) => {
    try {
      const { userId } = req.params; // Extract userId from params
      const { date } = req.query; // Extract date from query string
  
      // Build the query object
      let query = { userId };
  
      // If date is provided, add a filter for the deadline
      if (date) {
        query.deadline = { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) }; // Filter goals by date range (start of the given day)
      }
  
      const goals = await Goal.find(query);
  
      // Return the goals as a JSON response
      res.json(goals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

exports.updateGoal = async (req, res) => {
    try {
      const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      if (!updatedGoal) {
        return res.status(404).json({ message: "Goal not found" });
      }

      // Re-check badges in case this update marked the goal completed.
      await checkAndAwardBadges(updatedGoal.userId);
  
      res.status(200).json({ message: "Goal updated successfully", data: updatedGoal });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update goal" });
    }
  };

/* PATCH /goals/:id/toggle — flips `completed` true/false.
   This is the route DashboardWidgets.js actually calls; it didn't exist before,
   so clicking a goal in the dashboard was hitting a 404. */
exports.toggleGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    goal.completed = !goal.completed;
    await goal.save();

    // Re-check badges every time a goal's completion state changes.
    await checkAndAwardBadges(goal.userId);

    res.status(200).json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to toggle goal" });
  }
};
  
  
exports.deleteGoal = async (req, res) => {
    try {
      const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
      if (!deletedGoal) {
        return res.status(404).json({ message: "Goal not found" });
      }
      res.status(200).json({ message: "Goal deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete goal" });
    }
  };
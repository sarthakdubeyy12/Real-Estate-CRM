import Task from "../models/Task.js";

// Create a task
export const createTask = async (req, res) => {
  try {
    const { clientId, reminderDate, description } = req.body;
    const agent = req.user._id;

    const task = await Task.create({
      agent,
      client: clientId || null,
      reminderDate,
      description
    });

    res.status(201).json({ success: true, task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks (Admin sees all, Agent sees only theirs)
export const getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === "Admin") {
      tasks = await Task.find()
        .populate("agent", "name email")
        .populate("client", "name email contact");
    } else {
      tasks = await Task.find({ agent: req.user._id })
        .populate("agent", "name email")
        .populate("client", "name email contact");
    }

    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single task
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("agent", "name email")
      .populate("client", "name email contact");

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "Admin" && task.agent._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update task (status, description, reminder date)
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "Admin" && task.agent.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(task, req.body);
    await task.save();

    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "Admin" && task.agent.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.remove();
    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
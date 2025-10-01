import Client from "../models/Client.js";

// Create new client
export const createClient = async (req, res) => {
  try {
    const { name, contact, email, budget, preferences } = req.body;
    const agent = req.user._id; // logged-in agent/admin

    const client = await Client.create({
      name,
      contact,
      email,
      budget,
      preferences,
      agent
    });

    res.status(201).json({ success: true, client });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all clients (Admin sees all, Agent sees only theirs)
export const getClients = async (req, res) => {
  try {
    let clients;
    if (req.user.role === "Admin") {
      clients = await Client.find().populate("agent", "name email role");
    } else {
      clients = await Client.find({ agent: req.user._id }).populate("agent", "name email role");
    }
    res.json({ success: true, clients });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single client
export const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate("agent", "name email role");
    if (!client) return res.status(404).json({ message: "Client not found" });

    // Only Admin or assigned Agent can view
    if (req.user.role !== "Admin" && client.agent._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json({ success: true, client });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update client
export const updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    if (req.user.role !== "Admin" && client.agent.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(client, req.body); // update fields
    await client.save();

    res.json({ success: true, client });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete client
export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    if (req.user.role !== "Admin" && client.agent.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await client.remove();
    res.json({ success: true, message: "Client deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
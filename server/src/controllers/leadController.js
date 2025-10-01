import Lead from "../models/Lead.js";
import Client from "../models/Client.js";
import Property from "../models/Property.js";

// Create new lead
export const createLead = async (req, res) => {
  try {
    const { clientId, propertyId, notes } = req.body;
    const agent = req.user._id;

    // Check if client exists
    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ message: "Client not found" });

    // Check if property exists (optional)
    const property = propertyId ? await Property.findById(propertyId) : null;

    const lead = await Lead.create({
      client: clientId,
      property: propertyId || null,
      agent,
      notes
    });

    res.status(201).json({ success: true, lead });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all leads
export const getLeads = async (req, res) => {
  try {
    let leads;
    if (req.user.role === "Admin") {
      leads = await Lead.find()
        .populate("client", "name email contact")
        .populate("property", "title type price location")
        .populate("agent", "name email role");
    } else {
      leads = await Lead.find({ agent: req.user._id })
        .populate("client", "name email contact")
        .populate("property", "title type price location")
        .populate("agent", "name email role");
    }

    res.json({ success: true, leads });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single lead
export const getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("client", "name email contact")
      .populate("property", "title type price location")
      .populate("agent", "name email role");

    if (!lead) return res.status(404).json({ message: "Lead not found" });

    if (req.user.role !== "Admin" && lead.agent._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json({ success: true, lead });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update lead
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    if (req.user.role !== "Admin" && lead.agent.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(lead, req.body); // update fields
    await lead.save();

    res.json({ success: true, lead });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete lead
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    if (req.user.role !== "Admin" && lead.agent.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await lead.remove();
    res.json({ success: true, message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
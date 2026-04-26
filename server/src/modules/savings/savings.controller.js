import {
  getSavingsService,
  getSingleSavingsService,
  createSavingsService,
  updateSavingsService,
  deleteSavingsService
} from "./savings.service.js";


// GET ALL
export const getSavings = async (req, res) => {
  try {
    const user_id = req.user.userId;

    const data = await getSavingsService(user_id);

    return res.status(200).json(data);

  } catch (err) {
    console.log("Get savings error:", err.message);

    return res.status(500).json({
      message: err.message
    });
  }
};


// GET ONE
export const getSingleSavings = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user_id = req.user.userId;

    const data = await getSingleSavingsService(id, user_id);

    if (!data) {
      return res.status(404).json({
        message: "Savings not found"
      });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.log("Get single savings error:", err.message);

    return res.status(500).json({
      message: err.message
    });
  }
};


// CREATE
export const createSavings = async (req, res) => {
  try {
    const data = await createSavingsService(
      req.body,
      req.user.userId
    );

    return res.status(201).json(data[0]);

  } catch (err) {
    console.log("Create savings error:", err.message);

    return res.status(400).json({
      message: err.message
    });
  }
};


// UPDATE
export const updateSavings = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const data = await updateSavingsService(
      id,
      req.body,
      req.user.userId
    );

    if (!data) {
      return res.status(404).json({
        message: "Savings not found"
      });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.log("Update savings error:", err.message);

    return res.status(400).json({
      message: err.message
    });
  }
};


// DELETE
export const deleteSavings = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await deleteSavingsService(
      id,
      req.user.userId
    );

    if (!result) {
      return res.status(404).json({
        message: "Savings not found"
      });
    }

    return res.status(200).json({
      message: "Savings deleted"
    });

  } catch (err) {
    console.log("Delete savings error:", err.message);

    return res.status(400).json({
      message: err.message
    });
  }
};
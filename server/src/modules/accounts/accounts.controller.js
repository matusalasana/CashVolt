import {
  getAccountsService,
  createAccountService,
  updateAccountService,
  deleteAccountService
} from "./accounts.service.js";


// GET ALL
export const getAccounts = async (req, res) => {
  try {
    const data = await getAccountsService(req.user.userId);

    return res.status(200).json(data);

  } catch (err) {
    console.log("Get accounts error:", err.message);

    return res.status(500).json({
      message: err.message
    });
  }
};


// CREATE
export const createAccount = async (req, res) => {
  try {
    const data = await createAccountService(
      req.body,
      req.user.userId
    );

    return res.status(201).json(data);

  } catch (err) {
    console.log("Create account error:", err.message);

    return res.status(400).json({
      message: err.message
    });
  }
};


// UPDATE
export const updateAccount = async (req, res) => {
  try {
    const data = await updateAccountService(
      req.params.id,
      req.body,
      req.user.userId
    );

    return res.status(200).json(data);

  } catch (err) {
    console.log("Update account error:", err.message);

    return res.status(400).json({
      message: err.message
    });
  }
};


// DELETE
export const deleteAccount = async (req, res) => {
  try {
    await deleteAccountService(
      req.params.id,
      req.user.userId
    );

    return res.status(200).json({
      message: "Account deleted"
    });

  } catch (err) {
    console.log("Delete account error:", err.message);

    return res.status(400).json({
      message: err.message
    });
  }
};
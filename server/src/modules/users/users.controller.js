import {
  getUsersService,
  updateUserService,
  deleteUserService
} from "./users.service.js";

export const getUsers = async (req, res) => {
  try{
    const result = await getUsersService();
    res.status(200).json(result);
  }catch(err){
    res.status(500).json({message: err.message || "Error fetching users"})
  }
}


export const updateUser = async (req, res) => {
  try{
    const user_id = req.user.userId;
    const result = await updateUserService(req.body, user_id);
    res.status(200).json(result);
  }catch(err){
    res.status(500).json({message: err.message || "Error updating the user "})
  }
}

export const deleteUser = async (req, res) => {
  try{
    const user_id = req.user.userId;
    const result = await deleteUserService(user_id);
    res.status(201).json({message: "User deleted"});
  }catch(err){
    res.status(500).json({message: err.message || "Error deleting the user"})
  }
}
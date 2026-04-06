import {
  getUsersRepo,
  updateUserRepo,
  deleteUserRepo
} from "./users.repository.js"

export const getUsersService = async () => {
  return await getUsersRepo()
}

export const updateUserService = async (data, user_id) => {
  const { first_name, last_name, email, password, profile_picture } = data;
  return await updateUserRepo(first_name, last_name, email, password, profile_picture, user_id)
}

export const deleteUserService = async (user_id) => {
  return await deleteUserRepo(user_id)
}
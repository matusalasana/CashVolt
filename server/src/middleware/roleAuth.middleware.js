
// // Checks the role only, not the token. Then if you're admin or super_admin it let's you pass otherwise you can't navigate to the route you're looking for 
// export const authorizeRoles = (allowedRoles) => {
//   return (req, res, next) => {
//     try {
//       const userRole = req.user.role;

//       if (!allowedRoles.includes(userRole)) {
//         return res.status(403).json({
//           message: "Access denied: insufficient permissions"
//         });
//       }

//       next();
//     } catch (error) {
//       return res.status(500).json({ message: "Server error" });
//     }
//   };
// };
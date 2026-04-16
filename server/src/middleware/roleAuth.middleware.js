export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          message: "Unauthorized"
        });
      }

      const userRole = req.user.role;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: "Insufficient permission"
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Server error"
      });
    }
  };
};
// middleware/auth.js
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  // Grab the ticket from the "Authorization" header
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "No ticket, no entry!" });
  }

  try {
    // Verify the ticket using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user's ID to the 'req' object so the next function can use it
    req.userId = decoded.id; 

    next(); // "You're good to go! Pass through."
  } catch (error) {
    res.status(401).json({ message: "Ticket is fake or expired." });
  }
};

import { User } from "../models";

// export const isAdmin = async (req, res, next) => {
//   const userId = req.userId;
//   if (!userId) {
//     return res.status(400).json({
//       status: false,
//       messaage: "Unothorized - No user found",
//     });
//   }
//   try {
//     const user = await User.findById(userId);
//     if (!user || user.role !== 'admin') {
//       return res.status(403).json({ error: 'Forbidden: Admin access required' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("error in checking user");
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

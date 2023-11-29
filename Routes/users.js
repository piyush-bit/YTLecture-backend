import  express  from "express";
import { verifyToken } from "../verifyTocken.js";
import { deleteUser, subscribe, unsubscribe, update } from "../Controllers/user.js";
const router = express.Router();

router.put("/:id", verifyToken, update);

//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//subscribe a user
router.put("/sub/:id", verifyToken, subscribe);

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe);

export default router;
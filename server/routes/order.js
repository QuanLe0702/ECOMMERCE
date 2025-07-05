const router = require("express").Router()
const { verifyAccessToken, isAdmin, isNotBlocked } = require("../middlewares/verifyToken")
const ctrls = require("../controllers/order")

router.post("/", [verifyAccessToken, isNotBlocked], ctrls.createOrder)
router.put("/status/:oid", verifyAccessToken, isAdmin, ctrls.updateStatus)
router.get("/admin", verifyAccessToken, isAdmin, ctrls.getOrders)
router.get("/dashboard", ctrls.getDashboard)
router.get("/", [verifyAccessToken, isNotBlocked], ctrls.getUserOrders)
router.delete(
  "/admin/:id",
  verifyAccessToken,
  isAdmin,
  ctrls.deleteOrderByAdmin
)

module.exports = router

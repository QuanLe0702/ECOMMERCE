const router = require("express").Router()
const ctrls = require("../controllers/user")
const { verifyAccessToken, isAdmin, isNotBlocked } = require("../middlewares/verifyToken")
const uploader = require("../config/cloudinary.config")

router.post("/register", ctrls.register)
router.post("/mock", ctrls.createUsers)
router.put("/finalregister/:token", ctrls.finalRegister)
router.post("/login", ctrls.login)
router.get("/current", [verifyAccessToken, isNotBlocked], ctrls.getCurrent)
router.post("/refreshtoken", ctrls.refreshAccessToken)
router.get("/logout", ctrls.logout)
router.post("/forgotpassword", ctrls.forgotPassword)
router.put("/resetpassword", ctrls.resetPassword)
router.get("/", [verifyAccessToken, isAdmin], ctrls.getUsers)
router.put(
  "/current",
  [verifyAccessToken, isNotBlocked],
  uploader.single("avatar"),
  ctrls.updateUser
)
router.put("/address", [verifyAccessToken, isNotBlocked], ctrls.updateUserAddress)
router.put("/cart", [verifyAccessToken, isNotBlocked], ctrls.updateCart)
router.delete(
  "/remove-cart/:pid/:color",
  [verifyAccessToken, isNotBlocked],
  ctrls.removeProductInCart
)
router.delete("/:uid", [verifyAccessToken, isAdmin], ctrls.deleteUser)
router.put("/wishlist/:pid", [verifyAccessToken, isNotBlocked], ctrls.updateWishlist)
router.put("/:uid", [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin)

module.exports = router

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETEeee
// CREATE (POST) + PUT - body
// GET + DELETE - query // ?fdfdsf&fdfs

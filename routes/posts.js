const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
middlewares = require("../config/middlewares");

// READ all posts,
// Get PUBLISHED posts
router.get("/", postController.post_list);
// Get ALL posts
router.get("/all", postController.post_list_all);

// CREATE
router.post("/", middlewares.verifyToken, postController.post_create);

// READ one post
// May not be needed?
router.get("/:id", postController.post_read);

// READ COMMENTS for one post
router.get("/:id/comments", postController.post_read_comments);

// UPDATE
router.put("/:id", middlewares.verifyToken, postController.post_update);

// DELETE
router.delete("/:id", middlewares.verifyToken, postController.post_delete);
router.delete(
  "/:id/comments",
  middlewares.verifyToken,
  postController.post_comments_delete
);

module.exports = router;

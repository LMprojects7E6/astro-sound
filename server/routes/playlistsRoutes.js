//!IMPORT DEPENDENCIES
const express = require("express");
const router = express.Router();
const playlistsController = require("../controllers/playlistsController.js");

//!CRUD
router.get("/", playlistsController.getAllPlaylists);
router.get("/:playlistID", playlistsController.getPlaylistsByID);
router.post("/", playlistsController.createPlaylist);
router.put("/:playlistID", playlistsController.updatePlaylist);

module.exports = router;

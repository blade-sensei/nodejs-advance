const express = require('express');
const token = require('../../middlewares/token');
const userService = require('../../services/user.service');
const logger = require('../../utils/logger');

const router = express.Router();

router.get('',
  token.verifyToken,
  async (req, res) => {
  try {
    const users = await userService.findAll();
    res.send(users);
  } catch (e) {
    logger.info(e);
    return res.status(500).send('not found');
  }
});

module.exports = router;

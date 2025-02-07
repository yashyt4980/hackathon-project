const express = require('express');
const { getUrl, getFileUrl } = require('../handlers/bucketHandlers');
const { extractText, enrichText, saveDocumentDb, getDocuments } = require('../handlers/textHandlers');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();
router.route('/getUrl').post(protect, getUrl);
router.route('/getFileUrl').post(protect,getFileUrl);
router.route('/extract').post(protect, extractText);
router.route('/enrich').post(protect, enrichText);
router.route('/saveDb').post(protect, saveDocumentDb);
router.route('/getDocs').get(protect, getDocuments);
module.exports = router ;
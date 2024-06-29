const path = require("path");
const { extractData } = require("../services/extractTextPdf");
const { OCRPDF } = require("../services/ocr");
const { enrich } = require("../services/textEnrich");
const User = require('../models/User');
const Document = require('../models/Document');

const extractText = async (req, res) => {
  const url = req.body.url;
  const filename = req.body.filename;
  const { ok } = await OCRPDF(url, filename);
  const filePath = path.join(__dirname, '..', 'pdfs', filename);
  if (ok) {
    console.log(filePath);
    const data  = await extractData(`${filePath}`);
    // console.log(data);
    if (data) {
      res.send({
        ok: true,
        status: 200,
        data: {
            text: data.text,
            pages: data.pages, 
        },
      });
    } else {
      res.send({
        ok: false,
        status: 500,
        message: "Internal Server error!",
      });
    }
  } else {
    res.send({
        ok: false,
        status: 500,
    })
  }
};

const enrichText = async (req, res) => {
  const textInp = req.body.text;
  // const email = req.body.user.email;
  // console.log(req.user.email);
  try {
    const enrichedText = await enrich(textInp,req.user.email);
    // console.log("out", enrichedText);
    res.send({
      ok: true,
      status: 200,
      enrichedText,
    });
  } catch(Error) {
    res.status(500,{
      code: 500,
      ok: false,
      text: null,
    });
  }
}

const saveDocumentDb = async (req, res) => {
  const documentId = req.body.documentId;
  const userId = req.user._id;
  // console.log(documentId, userId);
  try {
    const user = await User.findById({_id:userId});
    // console.log(user);
    if (!user) {
      // console.log("Ok");
      return res.status(404).send({
        ok: false,
        status: 404,
        message: "User not found!",
      });
    }

    if (user.documents.includes(documentId)) {
      return res.send({
        ok: true,
        status: 200,
        message: "Document already exists for this user.",
      });
    }
    user.documents.push(documentId);
    // console.log(user);
    
    await user.save();

    res.send({
      ok: true,
      status: 200,
      message: "Document saved successfully.",
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      status: 500,
      message: "Internal Server Error!",
    });
  }
};

const getDocumentsOfUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('documents');
    if (!user) {
      return res.status(404).send({
        ok: false,
        status: 404,
        message: "User not found!",
      });
    }
    const documents = user.documents;
    res.send({
      ok: true,
      status: 200,
      documents,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      status: 500,
      message: "Internal Server Error!",
    });
  }
};

const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.send({
      ok: true,
      status: 200,
      documents,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      status: 500,
      message: "Internal Server Error!",
    });
  }
};

module.exports = { extractText, enrichText, saveDocumentDb, getDocumentsOfUser, getDocuments };

// module.exports = { extractText, enrichText, saveDocumentDb, getDocumentsOfUser };

// module.exports = { extractText, enrichText, saveDocumentDb };



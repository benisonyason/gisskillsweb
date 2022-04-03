import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Contact from '../models/contactModel.js';

const contactRouter = express.Router();


contactRouter.post(
  '/contact',
  expressAsyncHandler(async (req, res) => {
    const contact = new Contact({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      message: req.body.message,
    });
    const createdContact = await contact.save();
    res.send({
      _id: createdContact._id,
      firstname: createdContact.firstname,
      lastname: createdContact.lastname,
      email: createdContact.email,
      message: createdContact.message,
    });
    res.send({message: "Message Sent"});
  })
);

contactRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const contacts = await Contact.find({});
    res.send(contacts);
  })
);
export default contactRouter;

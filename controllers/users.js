const mongodb = require('../db/connect');
const objectId = require('mongodb').ObjectId;
const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
      });
  };

const getSingle = async (req, res) => {
    const userId = new objectId(req.params.id);
    const result = await mongodb.getDb().db().collection('users').find({_id: userId});
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
      });
}
  
  module.exports = { 
    getAll,
    getSingle 
};
const mongodb = require('../db/connect');
const objectId = require('mongodb').ObjectId;
const getAll = async (req, res) => {
  //#swagger .tags=['Users']
    const result = await mongodb.getDb().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
      });
  };

const getSingle = async (req, res) => {
  //#swagger .tags=['Users']
    const userId = new objectId(req.params.id);
    const result = await mongodb.getDb().db().collection('users').find({_id: userId});
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
      });
};

const  createUser = async(req, res) => {
  //#swagger .tags=['Users']
    const user = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      ipaddress: req.body.ipaddress
  };
  const response = await mongodb.getDb().db().collection('users').insertOne(user);
  if (response.acknowledged){
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the user.');
  }
};

const  updateUser = async(req, res) => {
  //#swagger .tags=['Users']
  console.log('update user');
  const userId = new objectId(req.params.id);
  const user = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    ipaddress: req.body.ipaddress
  };
  const response = await mongodb.getDb().db().collection('users').replaceOne({ _id: userId},user);
  if (response.modifiedCount > 0){
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user.');
  }
};

const deleteUser = async(req, res) => {
  //#swagger .tags=['Users']
  console.log('delete user');
  const userId = new objectId(req.params.id);
  const response = await mongodb.getDb().db().collection('users').deleteOne({ _id: userId},true);
  if (response.deletedCount > 0){
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the user.');
  }
};

  module.exports = { 
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser 
};
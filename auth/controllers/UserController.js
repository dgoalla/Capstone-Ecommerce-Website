const User = require('../models/User')
const env = require('../DB')
const jwt = require('jsonwebtoken')

exports.register = function (req, res) {

  let { username, email, password, passwordConfirmation, userrole } = req.body

  if(!userrole) {
    userrole = "Customer";
  }

  if (!email || !password) {
    return res.status(422).json({ 'error': 'Please provide email or password' })
  }

  if (password != passwordConfirmation) {
    return res.status(422).json({ 'error': 'Password does not match' })
  }
  User.findOne({ email }, function (err, existingUser) {
    if (err) {
      return res.status(422).json({ 'error': 'Oops! Something went Wrong' })
    }
    if (existingUser) {
      return res.status(422).json({ 'error': 'User already exists' })
    }
    else {
      const user = new User({
        username, email, password, userrole
      })

      user.save(function (err) {
        if (err) {
          return res.status(422).json({
            'error': 'Oops! Something went wrong'
          })
        }
        return res.status(200).json({ 'registered': true })
      })
    }
  })
}
exports.login = function (req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).json({ 'error': 'Please provide email or password' })
  }
  User.findOne({ email }, function (err, user) {
    if (err) {
      return res.status(422).json({
        'error': 'Oops! Something went wrong'
      })
    }

    if (!user) {
      return res.status(422).json({ 'error': 'Invalid user' })
    }

    if (user.hasSamePassword(password)) {
      json_token = jwt.sign(
        {
          userId: user._id,
          username: user.username,
          userrole : user.userrole
        },
        env.secret,
        { expiresIn: '1h' })

      return res.json(json_token)
    }
    else {
      return res.status(422).json({ 'error': 'Wrong email or password' })
    }
  })
}

exports.authMiddleware = function (req, res, next) {
  const json_token = req.headers.authorization
  try {
    if (json_token) {
      const user = parseToken(json_token)
      User.findById(user.userId, function (err, user) {
        if (err) {
          return res.status(422).json({
            'error': 'Oops! Something went wrong'
          })
        }
        if (user) {
          res.locals.user = user
          next()
        }
        else {
          return res.status(422).json({ 'error': 'Not authorized user' })
        }
      })
    }
    else {
      return res.status(422).json({ 'error': 'Not authorized user' })
    }
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err
    })
  }
}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], env.secret)
}


exports.createUser = (req,res)=> {
  const { username, email, password, userrole } = req.body;

  if (!email || !password) {
    return res.status(422).json({ 'error': 'Please provide email or password' })
  }

  User.findOne({ email }, function (err, existingUser) {
    if (err) {
      return res.status(422).json({ 'error': 'Oops! Something went Wrong' })
    }
    if (existingUser) {
      return res.status(422).json({ 'error': 'User already exists' })
    }
    else {
      const user = new User({
        username, email, password, userrole
      })

      user.save(function (err) {
        if (err) {
          return res.status(422).json({
            'error': 'Oops! Something went wrong'
          })
        }
        return res.status(200).json({ 'userCreated': true })
      })
    }
  })
}

exports.UpdateUser = (req,res)=> {       

  var userId = req.params.id;
  const {username, email, password, userrole } = req.body
  const updateUser = {
      "username" : username,
      "email" : email,
      "password" : password,
      "userrole" : userrole
  }
  User.updateOne({_id:userId}, {$set:updateUser}, (err,result) => {

      if(err) return res.status(422).json({"error":"User details not updated"});

      if(result.nModified > 0){
         return res.status(200).json({"Userupdated":true});
      }
      else {
          return res.status(422).json({"error":"User not updated"});
      }
  })
}

exports.DeleteUser = (req,res)=> {
      var userId = req.params.id;
      console.log(userId);
      User.deleteOne({_id: userId}, (err,result)=> {
         if(err) 
         {
          console.log("err");
          return res.status(422).json({"error" : "User not deleted"});
         }
         if(result.deletedCount>0)
         {
              return res.status(200).json({"userDeleted" : true});
         }
         else 
         {
          console.log(err);
          return res.status(422).json({"error" : "User not deleted"});
         }
      })   
}

exports.getUsers = function (req, res) {

  User.find({}, function (err, users) {
    if (err) {
      return res.status(422).json({
        'error': 'Oops! Something went wrong'
      })
    }
    else{
      return res.json(users)
    }
  })
}

exports.GetUserById = (req,res)=> {
  var idInfo = req.params.id;
  User.find({_id:idInfo},(err,data)=> {
          if(err) return res.status(422).json({'error': "Product with given Id not found"});
          else return res.json(data);
  })
}

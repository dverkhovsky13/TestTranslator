const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('../models/user');

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: "starting with user GET"
	})
});

router.post('/', (req, res, next) => {
	User.find({login: req.body.login})
		.exec()
		.then(user => {
			if (user.length >= 1) {
				res.status(409).json({
					message: "Mail exists"
				})
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(500).json({
							error: err
						});
					} else {
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							login: req.body.login,
							email: req.body.email,
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							password: hash
						});
						user
							.save()
							.then(result => {
								console.log(result);
								res.status(201).json({
									message: "User created"
								});
							})
							.catch(err => {
								console.log(err);
								res.status(500).json({
									error: err
								});
							})
					}
				});
			}
		});
});

router.post('/login', (req, res, next) => {
	User.find({login: req.body.login})
		.exec()
		.then(user => {
			if (user.length < 1) {
				return res.status(401).json({
					message: 'Auth failed'
				})
			}
			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				if (result) {
					const token = jwt.sign({
						userId: user[0].userId,
						login: user[0].login
						},
						"secret",
						{expiresIn: "1h"}
					);
					return res.status(200).json([
						{message: 'Auth successful'},
						{
							token: token,
							expires: token.expires
						},
						{
							_id: user[0]._id,
							login: user[0].login,
							email: user[0].email,
							firstName: user[0].firstName,
							lastName: user[0].lastName
						}
					])
				} else {
					return res.status(401).json({
						message: 'Auth failed'
					})
				}
			})
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		})
});

router.delete('/:userId', (req, res, next) => {
	User.remove({_id: req.params.userId})
		.exec()
		.then(result => {
			res.status(200).json({
				message: "User deleted"
			})
		})
		.catch(err => {
			res.status(500).json({
				error: err
			})
		})
});

router.get('/:userId', (req, res, next) => {
	const id = req.params.userId;

});

module.exports = router;
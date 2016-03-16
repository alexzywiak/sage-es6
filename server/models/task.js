var db = require('../config');
var mongoose = require('mongoose');
var User = require('./user');
var Project = require('./project');

//  db.tasksSchema.pre('init', function(next, data) {
//    Task.populate(data, {
//      path: 'users'
//    }, function(err, task) {
//      data = task;
//      next();
//   });
// });

// db.tasksSchema.pre('remove', function(next, done) {
//   User.update({}, {$pull: {task_list: this._id}}, function (err, user){
//     if (err) {
//       console.log(err);
//     }
//   });
  
//   Project.update({}, {$pull: {tasks: this._id}}, function (err, project){
//     if (err) {
//       console.log(err);
//     }
//   });
// });


var Task = mongoose.model('Task', db.tasksSchema);


module.exports = Task;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

console.log("=============");
console.log(process.env.MONGOLAB_URI);
console.log(process.env);
if (process.env.MONGOLAB_URI) {
  mongoose.connect(process.env.MONGOLAB_URI);
} else if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/doozytest');
} else {
  mongoose.connect('mongodb://localhost/doozy');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Tasks
var tasksSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    validate: [
      function(name) {
        return name.trim().length >= 3;
      },
      'Name too short'
    ]
  },
  description: {
    type: String,
    required: false,
    unique: false,
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  isAssigned: {
    type: Boolean,
    default: false
  },
  deadline: {
    type: Date,
    required: false,
    unique: false
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  },
  project_id: {
    type: Schema.ObjectId,
    ref: 'Project'
  },
  users: [{
    type: Schema.ObjectId,
    ref: 'User'
  }]
});

db.tasksSchema = tasksSchema;

// Projects
var projectsSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: [
      function(name) {
        return name.trim().length >= 3;
      },
      'Name too short'
    ]
  },
  description: {
    type: String,
    required: false,
  },
  teamLead: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  org_id: {
    type: Schema.ObjectId,
    ref: 'Org'
  },
  tasks: [{
    type: Schema.ObjectId,
    ref: 'Task'
  }],
  deadline: {
    type: Date
  },
  users: [{
    type: Schema.ObjectId,
    ref: 'User'
  }]
});

db.projectsSchema = projectsSchema;

// Users
var usersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  organization: [{
    type: Schema.ObjectId,
    ref: 'Org'
  }],
  project_list: [{
    type: Schema.ObjectId,
    ref: 'Project'
  }],
  task_list: [{
    type: Schema.ObjectId,
    ref: 'Task'
  }]
});

db.usersSchema = usersSchema;


// Organization
var orgSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  projects: [{
    type: Schema.ObjectId,
    ref: 'Project'
  }]
});

db.orgSchema = orgSchema;

module.exports = db;

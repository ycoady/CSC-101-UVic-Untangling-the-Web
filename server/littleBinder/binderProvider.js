var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

BinderProvider = function(host, port) {
  this.db= new Db('binderReports', new Server(host, port, {safe: true}, {auto_reconnect: true}, {}), {w:1});
  this.db.open(function(err, db){
  });
}

BinderProvider.prototype.getCollection = function(callback) {
  this.db.collection('binderReports', function(error, binder_collection) {
    if( error ) callback(error);
    else callback(null, binder_collection);
  });
};

//find all binderRecords
BinderProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, binder_collection) {
      if( error ) callback(error)
      else {
        binder_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//save new employee
BinderProvider.prototype.save = function(reports, callback) {
     this.getCollection(function(error, binder_collection) {
      if( error ) callback(error)
      else {
        if( typeof(reports.length)=="undefined")
          reports = [reports];

        for( var i =0;i< reports.length;i++ ) {
          report = reports[i];
          report.created_at = new Date();
        }

        binder_collection.insert(reports, function() {
          callback(null, reports);
        });
      }
    });
};

exports.BinderProvider = BinderProvider;

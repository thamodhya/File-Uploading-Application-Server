const express = require("express");
const File = express.Router();
const FileData = require('../Models/File.model.js');

File.route('/').get(function(req, res) {
    FileData.find(function(err, files) {
        if (err) {
            console.log(err);
        } else {
            res.json(files);
        }
    });
});

File.route('/:id').get(function(req, res) {
    let id = req.params.id;
    FileData.findById(id, function(err, files) {
        res.json([files]);
    });
});

File.route('/add').post(function(req, res) {
    let files = new FileData(req.body);
    files.save()
        .then(files => {
            res.status(200).json({'file': 'file added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new file failed');
        });
});

File.route('/update/:id').post(function(req, res) {
    FileData.findById(req.params.id, function(err, files) {
        if (!files)
            res.status(404).send('data is not found');
        else
        files.fileName = req.body.fileName;
        files.fileDesc = req.body.fileDesc;
        files.fileUrl = req.body.fileUrl;

        files.save().then(files => {
            res.status(200).json({'file': 'file updated successfully'});
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

File.route('/delete/:id').delete((req, res, next) => {
    FileData.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.status(200).json({
          msg: data,
        })
      }
    })
  });



module.exports = File;
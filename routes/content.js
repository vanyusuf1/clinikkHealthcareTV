const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Content = mongoose.model("Content");

router.get("/allcontent", (req, res) => {
  Content.find()
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .then((contents) => {
      res.json({ contents });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/mycontent", requireLogin, (req, res) => {
  Content.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((mycontent) => {
      res.json({ mycontent });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createcontent", requireLogin, (req, res) => {
  const { title, body, mediaurl } = req.body;
  if (!title || !body || !mediaurl) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  req.user.password = undefined;
  const content = new Content({
    title,
    body,
    media: mediaurl,
    postedBy: req.user,
  });
  content
    .save()
    .then((result) => {
      res.json({ content: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/like", requireLogin, (req, res) => {
  Content.findByIdAndUpdate(
    req.body.contentId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put("/unlike", requireLogin, (req, res) => {
  Content.findByIdAndUpdate(
    req.body.contentId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };

  Content.findByIdAndUpdate(
    req.body.contentId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.delete("/deletecontent/:contentId", requireLogin, (req, res) => {
  Content.findOne({ _id: req.params.contentId })
    .populate("postedBy", "_id")
    .exec((err, result) => {
      if (err || !result) {
        return res.status(422).json({ error: err });
      }
      if (result.postedBy._id.toString() === req.user._id.toString()) {
        result
          .remove()
          .then((finalresult) => {
            res.json(finalresult);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

module.exports = router;

import Comment from "../models/comment.js"
import JobPost from "../models/jobPost.js"
import Bid from "../models/bid.js"

export const addComment = async (req, res) => {
  try {
    const { content, userId, parentType, parentId } = req.body;

    const comment = new Comment({
      content,
      userId,
      parentType,
      parentId,
    });

    await comment.save();
    
    let updatedParent;
    //if comment parent is a jobpost
    if (parentType === 'JobPost') {
      const jobPost = await JobPost.findById(parentId);
      if (!jobPost) {
        return res.status(404).json({ error: 'Job post not found' });
      }
      jobPost.comments.push(comment._id);
      await jobPost.save();
    //fetch updated jobpost (w/ new comments n shit)
      updatedParent = await JobPost.findById(parentId).populate("comments");
    //if parents a bid   
    } else if (parentType === 'Bid') {
      const bid = await Bid.findById(parentId);
      if (!bid) {
        return res.status(404).json({ error: 'Bid not found' });
      }
      bid.comments.push(comment._id);
      await bid.save();
      // fetch updated bid
      updatedParent = await Bid.findById(parentId).populate("comments");
    
    }

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(500).json({ error: error.message });
  }
};

//  update comment
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.content = content;
    await comment.save();

   //return updated comment on job post or bid
    const updatedComment = await Comment.findById(commentId)
      .populate('userId')
      .populate('parentId');

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

   //delete from jobposts or bids
    if (comment.parentType === 'JobPost') {
      await JobPost.findByIdAndUpdate(comment.parentId, {
        $pull: { comments: commentId }
      });
    } else if (comment.parentType === 'Bid') {
      await Bid.findByIdAndUpdate(comment.parentId, {
        $pull: { comments: commentId }
      });
    }
    await Comment.findByIdAndDelete(commentId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// export const createComment = async (request, response) => {
//   console.log("hello");
//   try {
//     const newComment = await comment.create(request.body);
//     response.status(201).json(newComment);

//   }
//   catch (error) {
//     console.log('Error create comment:', error.message);
//     response.status(500).json({ error: error.message })

//   }
// };

//creating a comment on a job post
// export const addjobPostComment = async (req, res) => {
//   try {
//     const jobPost = await JobPost.findById(req.params.jobPostId);
//     if (jobPost) {
//       const comment = new Comment({
//         content: req.body.content,
//         userId: req.user._id,
//         parentType: 'JobPost',
//         parentId: req.params.jobPostId,
//       });
//       await comment.save();
//       //after saving comment, redirect to job post page to show jobpost and comment
//       res.redirect(`/jobPost/${req.params.jobPostId}`); 
//     }
//   } catch (error) {
//     console.log(error);
//     res.redirect("/");
//   }
// }

//creating a comment on a bid
// export const addBidComment = async (req, res) => {
//   try {
//       const { bidId } = req.params;
//       const { content, userId } = req.body;

//       const comment = new Comment({
//           content: req.body.content,
//           userId: req.user._id,
//           parentType: 'Bid',
//           parentId: req.params.bidId,
//           dateCreated: new Date(),
//       });
//       await comment.save();

//       const bid = await Bid.findById(bidId);
//       await bid.comments.push(comment._id);
//       await bid.save();

//       res.status(201).json(comment);
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// };


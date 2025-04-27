const express = require('express');
const router = express.Router();
const Data = require('../models/data');
const authenticateToken = require('../middleware/auth');

// router.post('/wishlist', authenticateToken, (req, res) => {
//   const userId = req.user.id; 
//   const gameId = String(req.body.gameId);
//     if (!gameId) {
//         return res.status(400).json({ error: 'Game ID is required' });
//     }
//     if (typeof gameId !== 'string' || !gameId.trim()) {
//       return res.status(400).json({ error: 'Invalid game ID' });
//     }

//   Wishlist.findOne({ userId: userId, gameId: gameId })
//     .then(existingItem => {
//         if (existingItem) {
//             res.status(400).json({ error: 'Game is already in wishlist' });
//             return null;
//         }
//         const wishlistItem = new Wishlist({
//           userId: userId,
//           gameId: gameId
//       });
//       wishlistItem.save()
//           .then(() => {
//               res.status(201).json({ message: 'Game added to wishlist' });
//           })
//           .catch(err => {
//               console.error(err);
//               res.status(500).json({ error: 'Internal server error' });
//           });
//     }
//   )
//     .catch(err => {
//         console.error(err);
//         return res.status(500).json({ error: 'Internal server error' });
//     });

    
// }   );

router.delete('/comments', authenticateToken, (req, res) => {
    
    const commentId = String(req.body.commentId); 
  
    if (!commentId) {
      return res.status(400).json({ error: 'commentId is required' });
    }

    if (typeof commentId !== 'string' || !commentId.trim()) {
      return res.status(400).json({ error: 'Invalid commentId' });
    }
  
    Data.findOneAndDelete({ _id: commentId})
      .then(deletedItem => {
        if (!deletedItem) {
          return res.status(404).json({ error: 'comment not found ' });
        }
        res.status(200).json({ message: 'comment removed ' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      });
  });

router.get('/comments', authenticateToken, (req, res) => {
//   const userId = req.user.id; 
//   console.log("Fetching wishlist for userId:", userId);

  Data.find({})
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;

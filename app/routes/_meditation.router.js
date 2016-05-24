import Meditation from '../models/meditation.model.js';

let ObjectId = require('mongoose').Types.ObjectId;

export default (app, router) => {

  /**
   * @api {get} /api/meditation Get meditation data of last two hours
   * @apiName ListMeditations
   * @apiGroup Meditation
   *
   * @apiSuccess {Object[]} meditations             List of recent sessions
   * @apiSuccess {Number}   meditations.walking     Time of walking
   * @apiSuccess {Number}   meditations.sitting     Time of sitting
   * @apiSuccess {Date}     meditations.end         End of meditation
   * @apiSuccess {Date}     meditations.createdAt   Start of meditation
   * @apiSuccess {Object}   meditations.user        The meditating User
   * @apiSuccess {Number}   meditations.walkingLeft Remaining minutes of walking
   * @apiSuccess {Number}   meditations.sittingLeft Remaining minutes of sitting
   * @apiSuccess {String}   meditations.status      "walking", "sitting" or "done"
   */
  router.get('/api/meditation', (req, res) => {
    Meditation
      .find({
        // two hours in ms
        end: { $gt: Date.now() - 7.2E6 }
      })
      .populate('user', 'local.username')
      .lean()
      .exec((err, result) => {
        if(err) {
          res.send(err);
          return;
        }

        // Add remaining walking and sitting time to entries
        result.map((entry) => {
          // calculate remaining time
          let timeElapsed = Math.floor((new Date().getTime() - entry.createdAt) / 1000 / 60);

          // calculate remaining walking time
          let walkingLeft = entry.walking - timeElapsed;
          if (walkingLeft < 0)
            walkingLeft = 0;
          entry.walkingLeft = walkingLeft;

          // calculate remaining sitting time
          let sittingLeft = walkingLeft === 0 ? entry.walking + entry.sitting - timeElapsed : entry.sitting;
          if (sittingLeft < 0)
            sittingLeft = 0;
          entry.sittingLeft = sittingLeft;

          // calculate current status
          if (walkingLeft > 0) {
            entry.status = 'walking';
          } else if (sittingLeft > 0) {
            entry.status = 'sitting';
          } else {
            entry.status = 'done';
          }

          return entry;
        });

        res.json(result);
      });
    });

  /**
   * @api {post} /api/meditation Start a new meditation session
   * @apiName AddMeditation
   * @apiGroup Meditation
   *
   * @apiParam {Number} sitting Sitting time
   * @apiParam {Number} walking Walking time
   */
  router.post('/api/meditation', (req, res) => {
      let total = parseInt(req.body.sitting, 10) + parseInt(req.body.walking, 10);

      Meditation.create({
        sitting: req.body.sitting,
        walking: req.body.walking,
        end: new Date(new Date().getTime() + total * 60000),
        user: req.user._doc
      }, (err, message) => {
        if (err) {
          res.status(400).send(err);
        }

        res.json(message);
      });
    });
};
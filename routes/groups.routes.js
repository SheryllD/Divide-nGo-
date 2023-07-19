const {Schema, model} = require("mongoose")

const Group = require('/model/group.model'); // Import the group model file

// Route: GET api/groups
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find({ "members": { $elemMatch: { id: req.user.id } } })
      .populate('members.id', ['name']);
    
    if (groups.length) {
      res.json(groups);
    } else {
      res.status(400).json({ msg: "No groups found" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error", err });
  }
});

// Route: POST api/groups
router.post('/', async (req, res) => {
  try {
    const newGroup = new Group({
      title: req.body.title,
      description: req.body.description,
      members: req.body.members,
    });

    await newGroup.save();
    res.json({ msg: "Group Created Successfully", group: newGroup });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error", err });
  }
});


module.exports = router;

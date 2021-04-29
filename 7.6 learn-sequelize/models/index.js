const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const { Op } = require('sequelize');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

User.create({
    name: 'zero',
    age: 24,
    married: false,
    comment: '자기소개1',
});
User.findAll({});
User.findOne({});


test(User);

User.findAll({
    attributes: ['name', 'married'],
});
User.findAll({
    attributes: ['name', 'age'],
    where: {
        married: true,
        age: { [Op.gt]: 30 },
    },
});
User.findAll({
    attributes: ['id', 'name'],
    where: {
        [Op.or]: [{ married: false }, {age: { [Op.gt]: 30 } }],
        married: true,
    },
});
User.findAll({
    attributes: ['id', 'name'],
    order: [['age', 'DESC']],
});
User.findAll({
    attributes: ['id', 'name'],
    order: [['age', 'DESC']],
    limit: 1,
});
User.findAll({
    attributes: ['id', 'name'],
    order: ['age', 'DESC'],
    limit: 1,
    offset: 1,
});
User.update({
    comment: '바꿀 내용',
}, {
    where: { id: 2 },
});
User.destroy({
    where: { id: 2 },
});

module.exports = db;


async function test(User) {
    const user = await User.findOne({
        include: [{
            model: Comment,
        }]
    });
    console.log("1111111111111111111 "+user.nick);
    console.log("2222222222222222222 "+user.Comments);
}
const bcrypt = require('bcrypt');

const { User } = require('../configs/dbConfig');

const viewProfile = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    const error = new Error('Unauthorized');
    error.statusCode = 401;
    throw error;
  }

  return user;
};

const editProfile = async (id, updateData, profilePictureUrl) => {
  const user = await User.findByPk(id);

  if (!user) {
    const error = new Error('Unauthorized');
    error.statusCode = 401;
    throw error;
  }

  if (profilePictureUrl) {
    updateData.profile_picture = profilePictureUrl;
  }

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  const updatedUser = await user.update(updateData, {
    attributes: { exclude: ['password'] },
  });

  return updatedUser;
};

module.exports = {
  viewProfile,
  editProfile,
};

import userShare from '../models/userShare';

// @desc Get All User data
// @route GET /api/v1/userdata/getdata
// @access Public
export const getUserData = async (req, res) => {
  try {
    // feching all usershare data from MongoDB Database
    const data = await userShare.find({});
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting products',
      error: error.message,
    });
  }
};

// @desc Create a userShare entry
// @route POST /api/v1/userdata/
// @access Public
export const postUserData = async (req, res) => {
  try {
    const { url, chainAddress } = req.body;
    const usershare = new userShare({
      url: url,
      chainAddress: chainAddress,
    });

    // Creating a new Entry in MongoDB Database
    // and sending the created entry back in response.
    const createdUserShare = await usershare.save();
    res.status(200).json(createdUserShare);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in Creating UserShare Entry',
    });
  }
};

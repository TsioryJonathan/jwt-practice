export const getUsername = (req, res) => {
    const { username } = req.user;
    return res.json({
      username,
    });
  };
  
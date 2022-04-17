import axios from 'axios';

const location = async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://realty-in-us.p.rapidapi.com/locations/auto-complete',
    params: { input: req.query.keyword },
    headers: {
      'x-rapidapi-host': 'realty-in-us.p.rapidapi.com',
      'x-rapidapi-key': apiKey,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export { location };

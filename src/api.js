import axios from 'axios';
const apiKey = '680ec0ce0amshb5094a6d52a0d98p1f34efjsn538a7176f19f';

// https://rapidapi.com/blog/axios-react-api-tutorial/

export const PropertyClient = axios.create({
  baseURL: 'https://realty-in-us.p.rapidapi.com/properties',
  headers: {
    'x-rapidapi-host': 'realty-in-us.p.rapidapi.com',
    'x-rapidapi-key': apiKey,
  },
});

export default {
  getProperties: async (state_code, city, sort, beds) => {
    const response = await PropertyClient({
      method: 'GET',
      url: '/list-for-sale',
      params: {
        state_code: state_code,
        city: city,
        offset: '0',
        limit: '20',
        sort: sort,
        beds_min: beds,
      },
    });

    return response.data;
  },
};
// export default {
//   getProperties: async (state_code, city, sort, beds) => {
//     instance({
//       method: 'GET',
//       url: '/list-for-sale',
//       params: {
//         state_code: state_code,
//         city: city,
//         offset: '0',
//         limit: '20',
//         sort: sort,
//         beds_min: beds,
//       },
//     });
//   },
// };

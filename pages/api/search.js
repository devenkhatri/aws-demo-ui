import sendRequest from '../../components/utils/send-request';

export default async function handler(req, res) {
  // const { q } = await req.body;  
  const { q } = await req.query;
  if (process.env.NEXT_PUBLIC_SEARCH_API_URL && q) {
    // const url = 'https://8lxcog4t6i.execute-api.ap-south-1.amazonaws.com/Dev/search?search=';
    const url = `${process.env.NEXT_PUBLIC_SEARCH_API_URL}${q}`;

    const response = await sendRequest("GET", url);
    res.status(200).json(response)
  } else {
    res.status(200).json({})
  }
}

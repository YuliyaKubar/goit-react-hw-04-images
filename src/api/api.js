import axios from 'axios';

const API_KEY = '35069907-16ee8141b79ba130abf84928c';

const BASIC_URL = `https://pixabay.com/api/?key=${API_KEY}&q=`;
const searchParams = '&image_type=photo&orientation=horizontal';

export const getImages = async (page, query) => {
  const serverDataURL = `${BASIC_URL}${query}${searchParams}&page=${page}&per_page=12`;
  try {
    const server = await axios.get(serverDataURL);
    const data = await server.data;
    const length = data.hits.length;
    const dataHits = {
      images: data.hits,
      total: length,
      totalHits: data.totalHits,
    };
    return dataHits;
  } catch (error) {}
};

import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: '*', // Changez pour l'origine souhaitée
});

export function middleware(req, res) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });
}

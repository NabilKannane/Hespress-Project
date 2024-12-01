import Cors from 'cors';

// Initialiser CORS avec les paramètres désirés
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: '*', // Remplacez '*' par l'URL de votre frontend si vous voulez limiter l'accès
});

// Appliquer CORS comme middleware
function runCors(req, res, next) {
  cors(req, res, (result) => {
    if (result instanceof Error) {
      return next(result);
    }
    next();
  });
}

export default function handler(req, res) {
  runCors(req, res, () => {
    if (req.method === 'POST') {
      // Votre logique d'API ici
      res.status(200).json({ message: 'Données traitées' });
    } else {
      res.status(405).json({ message: 'Méthode non autorisée' });
    }
  });
}

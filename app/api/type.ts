export interface ResponseData {
    scraped_data: ScrapedData[]; // Liste des articles récupérés
    sentiment_statistics: SentimentStatistics; // Statistiques globales des sentiments
    time_based_sentiments: TimeBasedSentiment[]; // Évolution temporelle des sentiments
    top_positively_reacted_comments: TopReactedComment[]; // Top des commentaires avec réactions positives
    top_negatively_reacted_comments: TopReactedComment[]; // Top des commentaires avec réactions négatives
    most_commented_posts: MostCommentedPost[]; // Articles les plus commentés
  }
  
 export interface ScrapedData {
    post_id: number; // Identifiant unique de l'article
    post_link: string; // Lien vers l'article
    category: string; // Catégorie de l'article
    title: string; // Titre de l'article
    post_date: string; // Date de publication de l'article
    tags: string[]; // Liste des tags associés à l'article
    comments_count: number; // Nombre total de commentaires
    comments: Comment[]; // Liste des commentaires de l'article
  }
  
 export interface Comment {
    post_id: number; // ID du post auquel le commentaire est associé
    comment_id: number; // Identifiant unique du commentaire
    comment_link_id: string; // Identifiant du lien associé au commentaire
    comment: string; // Texte du commentaire
    comment_reaction: number; // Réactions au commentaire (positives/négatives)
    comment_timestamp: string; // Date et heure du commentaire
    label: string; // Sentiment du commentaire (positive, negative, neutral)
    probability: number; // Probabilité associée au sentiment
  }
  
 export interface SentimentStatistics {
    total_comments: number; // Nombre total de commentaires
    positive_comments: number; // Nombre de commentaires positifs
    negative_comments: number; // Nombre de commentaires négatifs
    neutral_comments: number; // Nombre de commentaires neutres
    positive_percentage: number; // Pourcentage de commentaires positifs
    negative_percentage: number; // Pourcentage de commentaires négatifs
    neutral_percentage: number; // Pourcentage de commentaires neutres
  }
  
 export interface TimeBasedSentiment {
    time: string; // Horaire ou intervalle de temps
    Positive: number; // Nombre de sentiments positifs à ce moment
    Neutral: number; // Nombre de sentiments neutres à ce moment
    Negative: number; // Nombre de sentiments négatifs à ce moment
  }
  
 export interface TopReactedComment {
    comment_id: number; // Identifiant unique du commentaire
    post_id: number; // Identifiant unique du post auquel il est lié
    comment: string; // Texte du commentaire
    comment_reaction: number; // Nombre de réactions (positives ou négatives)
    comment_timestamp: string; // Date et heure du commentaire
    label: string; // Sentiment du commentaire (positive, negative, neutral)
    probability: number; // Probabilité associée au sentiment
  }
  
 export interface MostCommentedPost {
    post_id: number;
    title: string;
    post_link: string;
    post_date: string;
    category: string;
    tags: string[];
    comments_count: number;
  }
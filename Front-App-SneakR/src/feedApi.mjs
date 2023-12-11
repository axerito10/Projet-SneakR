import cron from 'node-cron';
import fetch from 'node-fetch';

const API_EXT_URL = 'http://54.37.12.181:1337/api/sneakers';
const STRAPI_API_URL = 'http://127.0.0.1:1337/api/sneakers';

async function importData(start = 0) {
  try {
    const response = await fetch(`${API_EXT_URL}?pagination[page]=${start}`);
    const responseData = await response.json();

    console.log(`Start ${start} : `, responseData);

    const sneakers = Array.isArray(responseData.data) ? responseData.data : [];

    // Arrêtez l'importation si la page est vide
    if (sneakers.length === 0) {
      console.log(`La page ${start} est vide. Arrêt de l'importation.`);
      return;
    }

    // Utilisation de Promise.all pour paralléliser les requêtes
    await Promise.all(
      sneakers.map(async (sneaker) => {
        try {
          // Vérifier l'existence de la sneaker par UID
          const existingSneakerResponse = await fetch(`${STRAPI_API_URL}?UID=${sneaker.attributes.UID}`);
          const existingSneakerData = await existingSneakerResponse.json();

          if (existingSneakerData.length > 0) {
            console.log(`La sneaker avec UID ${sneaker.attributes.UID} existe déjà. Mise à jour au lieu de création.`);
            // Ajoutez ici la logique pour mettre à jour la sneaker existante
          } else {
            const postData = {
              ...sneaker.attributes,
              image: JSON.stringify(sneaker.attributes.image),
              links: JSON.stringify(sneaker.attributes.links),
            };

            const postResponse = await fetch(STRAPI_API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ data: postData }),
            });

            if (!postResponse.ok) {
              const errorResponse = await postResponse.json();

              if (
                errorResponse &&
                errorResponse.error &&
                errorResponse.error.name === 'ValidationError' &&
                errorResponse.error.details &&
                errorResponse.error.details.errors
              ) {
                // Ajoutez ici la logique spécifique pour gérer la duplication basée sur les erreurs de validation
              } else {
                throw new Error(`Erreur HTTP lors de la publication : ${postResponse.status} - ${postResponse.statusText}\n${JSON.stringify(errorResponse)}`);
              }
            } else {
              const postDataResponse = await postResponse.json();
              console.log(`Sneaker importée avec succès, ID Strapi: ${postDataResponse.data.id}`);
            }
          }
        } catch (error) {
          console.error('Erreur lors de la publication ou de la mise à jour du sneaker :', error.message);
        }
      })
    );

    // Récupérer et importer la page suivante si elle existe
    const totalItems = responseData.meta.pagination.total || 0;
    if (start + 1 < totalItems) {
      await importData(start + 1);
    } else {
      console.log('Fin de l\'importation. Toutes les pages ont été traitées.');
    }
  } catch (error) {
    console.error('Erreur lors de l\'importation :', error);
  }
}

importData();

cron.schedule('0 1 * * 1', async () => {
  console.log('Exécution de importData planifiée.');
  await importData();
});

const fetch = require('node-fetch');
const FormData = require('form-data');
const { Prediction, NutritionDetail, User } = require('../configs/dbConfig');

// Request to ML API
const predict = async (image) => {
  const formData = new FormData();
  formData.append('image', image.buffer, {
    filename: image.originalname,
    contentType: image.mimetype,
  });

  const predictionResponse = await fetch(
    `${process.env.ML_API_ENDPOINT}/predict`,
    {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders(),
    }
  );

  const response = await predictionResponse.json();

  return response;
};

/*
Prediction Data received from ML API :
{
  name: string,
  detail: string,
  nutrition_detail: object
  }
  
  name & detail stored in prediction table
  nutrition_detail object values stored in nutrition detail table with prediction_id as foreign key
  */

const createPrediction = async (user_id, imageUrl, predictionResult) => {
  const { name, detail, nutrition_detail } = predictionResult;

  const prediction = await Prediction.create({
    user_id,
    name,
    image: imageUrl,
    detail,
  });

  let predictionDetail = null;

  if (nutrition_detail) {
    predictionDetail = await NutritionDetail.create({
      prediction_id: prediction.id,
      ...nutrition_detail,
    });

    await prediction.update({ nutrition_detail_id: predictionDetail.id });
  }

  return { prediction, predictionDetail };
};

const getPredictionsByUserId = async (user_id) => {
  const predictions = await Prediction.findAll({
    where: { user_id },
  });

  const predictionsWithDetails = await Promise.all(
    predictions.map(async (prediction) => {
      let nutrition_detail = null;

      if (prediction.nutrition_detail_id) {
        nutrition_detail = await NutritionDetail.findByPk(
          prediction.nutrition_detail_id
        );
      }

      return {
        ...prediction.toJSON(),
        nutrition_detail,
      };
    })
  );

  return predictionsWithDetails;
};

const getPredictionDetail = async (prediction_id) => {
  // Can be optimized using prediction relation with nutrition detail but somehow still bugged
  const prediction = await Prediction.findByPk(prediction_id);

  let nutrition_detail = null;

  if (prediction?.nutrition_detail_id) {
    nutrition_detail = await NutritionDetail.findByPk(
      prediction.nutrition_detail_id
    );
  }

  if (!prediction) {
    const error = new Error('Prediction not found');
    error.statusCode = 404;
    throw error;
  }

  return { prediction, nutrition_detail };
};

module.exports = {
  predict,
  createPrediction,
  getPredictionsByUserId,
  getPredictionDetail,
};

const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError");

async function predictClassification(model, image) {
  try {
    const tensor = tf.node.decodeJpeg(image).resizeNearestNeighbor([224, 224]).expandDims().toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();

    const label = score[0] < 0.5 ? "Non-cancer" : "Cancer";

    let suggestion;

    if (label === "Cancer") {
      suggestion = "Konsultasikan kepada dokter anda !";
    } else {
      suggestion = "Jagalah Pola hidup bersih dan sehat !";
    }

    return { label, suggestion };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;

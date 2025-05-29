export const emotionToAnimation: { [key: string]: any } = {
  '😄': require('../assets/animations/sonrisaAni.json'),
  '😡': require('../assets/animations/enojadaAnim.json'),
  '🥺': require('../assets/animations/angustiaAni.json'),
};

export const getAnimationFromMessage = (message: string): any => {
  for (let emoji of Object.keys(emotionToAnimation)) {
    if (message.includes(emoji)) {
      return emotionToAnimation[emoji];
    }
  }

  return require('../assets/animations/NormalAni.json');
};

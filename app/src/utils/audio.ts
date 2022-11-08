export const playAudio = (path: string) => {
  const audio = new Audio();
  audio.src = path;

  return audio.play();
};

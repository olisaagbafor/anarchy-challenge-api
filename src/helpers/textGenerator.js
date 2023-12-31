import { LoremIpsum } from "lorem-ipsum";

const textGenerator = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

// lorem.generateWords(1);
// lorem.generateSentences(5);
// lorem.generateParagraphs(7);

export const getRandomNumber = (max) => Math.floor(Math.random() * max) + 1;

export default textGenerator;

/**
 * Check if hand1 beats hand2
 * @param {string} hand1 5 cards seperated by comma (example: `2H,5D,6H,QH,AS`)
 * @param {string} hand2 5 cards seperated by comma
 * @returns {boolean} true if hand1 beats hand2, false if hand2 beats hand1. (Tie isn't dealt with)
 */
const hand1WinsOverHand2 = (hand1, hand2) => {
  return scoreHand(hand1) > scoreHand(hand2);
};

/**
 * Assign score to given hand
 * @param {string} handStr 5 cards seperated by comma (example: `2H,5D,6H,QH,AS`)
 * @returns {number} number 0-8
 */
const scoreHand = (handStr) => {
  const hand = convertToArrayOfCards(handStr);
  const groupedHand = groupByRank(hand);

  if (isStraightFlush(hand)) return 8;
  if (isFourOfAKind(groupedHand)) return 7;
  if (isFullHouse(groupedHand)) return 6;
  if (isFlush(hand)) return 5;
  if (isStraight(hand)) return 4;
  if (isThreeOfAKind(groupedHand)) return 3;
  if (isTwoPair(groupedHand)) return 2;
  if (isOnePair(groupedHand)) return 1;
  return 0;
};

/**
 * Convert string of cards to array of card objects.
 * @param {string} cardsString - 5 cards seperated by comma (example: `2H,5D,6H,QH,AS`)
 * @returns {Array} - array of 5 card objects, card object has a rank (2-14) and a suit ('D','H','S','C')
 */
const convertToArrayOfCards = (cardsStr) => {
  const cardsArray = cardsStr
    .replace(/J/g, "11") // replace all instances of 'J' with '11
    .replace(/Q/g, "12")
    .replace(/K/g, "13")
    .replace(/A/g, "14")
    .split(",")
    .map((card) => {
      const suit = card.slice(-1);
      const rank = Number(card.slice(0, -1));
      return { suit, rank };
    });

  return cardsArray;
};

/**
 * Group cards into arrays by rank.
 * @param {Array} hand array of 5 card objects
 * @returns {Array} - and array of arrays. Inner arrays contain cards of same rank.
 */
const groupByRank = (hand) => {
  // sort cards into rank groups in an object
  const groupedHandObj = hand.reduce((acc, card) => {
    if (acc[card.rank]) acc[card.rank].push(card);
    else acc[card.rank] = [card];
    return acc;
  }, {});

  //extract groups from objects and return as array
  return Object.values(groupedHandObj);
};

const isStraightFlush = (hand) => isStraight(hand) && isFlush(hand);

const isFourOfAKind = (groupedHand) =>
  groupedHand.some((group) => group.length === 4);

const isFullHouse = (groupedHand) =>
  groupedHand.every((group) => group.length === 2 || group.length === 3);

const isFlush = (hand) =>
  hand.every((card, i, array) => card.suit === array[0].suit);

const isStraight = (hand) =>
  hand
    .sort((a, b) => (a.rank < b.rank ? -1 : 0))
    .every((card, i, array) => card.rank === array[0].rank + i);

const isThreeOfAKind = (groupedHand) =>
  groupedHand.length === 3 && groupedHand.some((group) => group.length === 3);

const isTwoPair = (groupedHand) =>
  groupedHand.length === 3 && groupedHand.some((group) => group.length === 2);

const isOnePair = (groupedHand) =>
  groupedHand.length === 4 && groupedHand.some((group) => group.length === 2);

module.exports = hand1WinsOverHand2;

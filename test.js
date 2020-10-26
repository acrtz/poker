const hand1WinsOverHand2 = require("./poker");

describe("hand1WinsOverHand2", () => {
  const hands = [
    "6C,7C,8C,9C,10C", //straight flush
    "AC,AS,AH,AD,9D", // four of a kind
    "AC,AS,AH,9H,9D", // fullhouse
    "2H,5H,6H,9H,QH", // flush
    "2H,3H,4H,5D,6H", // straight
    "2H,2D,2S,5D,6H", // three of a kind
    "2H,2D,5S,5D,6H", // two pair
    "2H,2D,4S,5D,7H", // one pair
  ];

  let hand1Index = 0;
  let hand2Index = 0;

  for (const hand1 of hands) {
    // reset hand2Index before comarisons with new hand1;
    hand2Index = 0;

    for (const hand2 of hands) {
      // strength of hand decreases as index increases
      // so the hand with the lower index should win
      if (hand1Index < hand2Index) {
        it(`${hand1} beats ${hand2}`, () => {
          expect(hand1WinsOverHand2(hand1, hand2)).toBe(true);
        });
      }
      if (hand1Index > hand2Index) {
        it(`${hand1} does not beat ${hand2}`, () => {
          expect(hand1WinsOverHand2(hand1, hand2)).toBe(false);
        });
      }
      // increment hand2Index before moving on to next hand
      hand2Index += 1;
    }
    // increment hand1Index before moving on to next hand
    hand1Index += 1;
  }
});

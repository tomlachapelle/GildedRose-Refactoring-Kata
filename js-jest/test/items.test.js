const {Shop, Item} = require("../src/gilded_rose");

// Helper function
// this will test a shop of 1 item (the item to be tested, for simplicity)
incrementOneDayOnItem = (item) => {
  const gildedRose = new Shop([item]);
  const items = gildedRose.updateQuality();
  return items[0];
}

describe("normal item", () => {
    it("should decrease quality by 1 and sellIn by 1", () => {
      const item = new Item("normal", 10, 9);
      const updatedItem = incrementOneDayOnItem(item);

      expect(updatedItem.sellIn).toBe(9);
      expect(updatedItem.quality).toBe(8);
    });

    it("should decrease quality by 1 and sellIn by 1", () => {
      const item = new Item("normal", 1, 1);
      const updatedItem = incrementOneDayOnItem(item);

      expect(updatedItem.sellIn).toBe(0);
      expect(updatedItem.quality).toBe(0);
    });

    it("should decrease quality by 2 and sellIn by 1", () => {
      const item = new Item("normal", 0, 9);
      const updatedItem = incrementOneDayOnItem(item);

      expect(updatedItem.sellIn).toBe(-1);
      expect(updatedItem.quality).toBe(7);
    });

    it("should decrease quality by 2 and sellIn by 1", () => {
      const item = new Item("normal", -2, 9);
      const updatedItem = incrementOneDayOnItem(item);

      expect(updatedItem.sellIn).toBe(-3);
      expect(updatedItem.quality).toBe(7);
    });

    it("should not decrease quality below 0", () => {
      const item = new Item("normal", 10, 0);
      const updatedItem = incrementOneDayOnItem(item);

      expect(updatedItem.sellIn).toBe(9);
      expect(updatedItem.quality).toBe(0);
    });

    it("should not decrease quality below 0", () => {
      const item = new Item("normal", 10, 1);
      const updatedItem = incrementOneDayOnItem(item);

      expect(updatedItem.sellIn).toBe(9);
      expect(updatedItem.quality).toBe(0);
    });

    // Interesting, if quality is below 0, it won't update but it won't set it to limit of 0 either.
});

describe("backstage pass", () => {
    it("should increase quality by 1 if over 10 days before sell date", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 20, 9);
      const updatedItem = incrementOneDayOnItem(item);

      expect(updatedItem.quality).toBe(10);
    });

    it("should increase quality by 2 if between 10 and 5 days before sell date", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 9);
      const updatedItem = incrementOneDayOnItem(item);
      
      expect(updatedItem.sellIn).toBe(9);
      expect(updatedItem.quality).toBe(11);
    });

    it("should increase quality by 3 between 5 and 3 days before sell date", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 9);
      const updatedItem = incrementOneDayOnItem(item);

      expect(updatedItem.sellIn).toBe(4);
      expect(updatedItem.quality).toBe(12);
    });

    it("should set quality to 0 on sell date", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 9);
      const updatedItem = incrementOneDayOnItem(item);

      expect(updatedItem.sellIn).toBe(-1);
      expect(updatedItem.quality).toBe(0);
    });

    it("should set quality to 0 after sell date", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", -1, 9);
      const updatedItem = incrementOneDayOnItem(item);

      expect(updatedItem.sellIn).toBe(-2);
      expect(updatedItem.quality).toBe(0);
    });

    it("should not increase quality above 50 more than 10 days before sell date", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 20, 50);
      const updatedItem = incrementOneDayOnItem(item);

      expect(updatedItem.sellIn).toBe(19);
      expect(updatedItem.quality).toBe(50);
    });

    it("should not increase quality above 50 between 10 and 5 days before sell date", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49);
      const updatedItem = incrementOneDayOnItem(item);
      
      expect(updatedItem.sellIn).toBe(9);
      expect(updatedItem.quality).toBe(50);
    });

    it("should not increase quality above 50 between 5 and 3 days before sell date", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 3, 49);
      const updatedItem = incrementOneDayOnItem(item);

      expect(updatedItem.sellIn).toBe(2);
      expect(updatedItem.quality).toBe(50);
    });
});

// Note: sellin date for sulfuras never goes below 0
describe("sulfuras", () => {
    it("should not decrease quality before sell date", () => {
      const item = new Item("Sulfuras, Hand of Ragnaros", 10, 80);
      const updatedItem = incrementOneDayOnItem(item);

      expect(updatedItem.sellIn).toBe(10);
      expect(updatedItem.quality).toBe(80);
    });

    it("should not decrease quality on sell date", () => {
      const item = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
      const updatedItem = incrementOneDayOnItem(item);

      // Interesting - the sellIn date seems to not be getting updated properly here
      //
      expect(updatedItem.sellIn).toBe(0);
      expect(updatedItem.quality).toBe(80);
    });

    it("should not decrease quality after sell date", () => {
      const item = new Item("Sulfuras, Hand of Ragnaros", -1, 80);
      const updatedItem = incrementOneDayOnItem(item);

      // Interesting - the sellIn date seems to not be getting updated properly here
      //
      expect(updatedItem.sellIn).toBe(-1);
      expect(updatedItem.quality).toBe(80);
    });
});

describe("brie", () => {
    it("should increase quality by 1 before sell date", () => {
      const item = new Item("Aged Brie", 10, 9);
      const updatedItem = incrementOneDayOnItem(item);

      expect(updatedItem.sellIn).toBe(9);
      expect(updatedItem.quality).toBe(10);
    });

    it("should increase quality by 2 on sell date", () => {
      const item = new Item("Aged Brie", 0, 9);
      const updatedItem = incrementOneDayOnItem(item);

      expect(updatedItem.sellIn).toBe(-1);
      expect(updatedItem.quality).toBe(11);
    });

    it("should increase quality by 2 after sell date", () => {
      const item = new Item("Aged Brie", -1, 9);
      const updatedItem = incrementOneDayOnItem(item);

      expect(updatedItem.sellIn).toBe(-2);
      expect(updatedItem.quality).toBe(11);
    });

    it("should not increase quality above 50", () => {
      const item = new Item("Aged Brie", 10, 50);
      const updatedItem = incrementOneDayOnItem(item);

      expect(updatedItem.sellIn).toBe(9);
      expect(updatedItem.quality).toBe(50);
    });

    it("should not increase quality above 50 if it's near on sell date", () => {
      const item = new Item("Aged Brie", 0, 49);
      const updatedItem = incrementOneDayOnItem(item);

      expect(updatedItem.sellIn).toBe(-1);
      expect(updatedItem.quality).toBe(50);
    });

    /// add conjured items here
});



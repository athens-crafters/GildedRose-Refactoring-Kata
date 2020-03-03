var {expect, assert} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("a Random item should decrease in quality every day", function() {
    const gildedRose = new Shop([ new Item("Random", 5, 40) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(39);
  });

  it("a Random item should decrease it sellIn value by one every day", function() {
    const gildedRose = new Shop([ new Item("Random", 5, 40) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(4);
  });

  it("the quality of an item can never be negative", function() {
    const gildedRose = new Shop([ new Item("Random", 5, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("an item degrades twice as fast after its sellIn passes", function() {
    const gildedRose = new Shop([ new Item("Random", 1, 40) ]);

    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(39);

    const itemsAfterSellIn = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(37);
  });

  it("Aged Brie increases in value every day", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 5, 40) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(41);
  });

  it("the quality can never be more than 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 5, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("Sulfuras never decrease in quality", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 5, 35) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(35);
  });

  it("Sulfuras can have quality more than 50", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 5, 100) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(100);
  });

  it("Sulfuras never has to be sold", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 1000, 35) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(1000);
  });

  it("Backstage passes increase in quality when more than 10 days left to sellIn", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 15, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(31);
  });

  it("Backstage passes increase in quality x2 when 10 days left to sellIn", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(32);
  });

  it("Backstage passes increase in quality x2 when 6 days left to sellIn", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 8, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(32);
  });

  it("Backstage passes increase in quality x3 when 5 days left to sellIn", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(33);
  });

  it("Backstage passes increase in quality x3 when 1 days left to sellIn", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 1, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(33);
  });

  it("Backstage passes quality is 0 after sellIn", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });
});

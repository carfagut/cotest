import { expect } from 'chai';
import 'chai/register-should';
import CarInsurance from '../src/models/CarInsurance';
import Product from '../src/models/Product';

const NAME_RANDOM = 'Some Random Product';
const NAME_MEDIUM_COVERAGE = 'Medium Coverage';
const NAME_MEGA_COVERAGE = 'Mega Coverage';
const NAME_SUPER_SALE = 'Super Sale';
const NAME_FULL_COVERAGE = 'Full Coverage';
const NAME_SPECIAL_FULL_COVERAGE = 'Special Full Coverage';
const SELL_IN_10 = 10;
const SELL_IN_11 = 11;
const SELL_IN_3 = 3;
const SELL_IN_0 = 0;
const SELL_IN_1_NEG = -1;
const PRICE_20 = 20;
const PRICE_50 = 50;
const PRICE_80 = 80;
const PRICE_0 = 0;
const PRICE_1 = 0;
const TO_DEFAULT_1 = [new Product(NAME_MEDIUM_COVERAGE, SELL_IN_10, PRICE_20)];
const TO_DEFAULT_2 = [new Product(NAME_MEDIUM_COVERAGE, SELL_IN_10, PRICE_0)];
const TO_DEFAULT_3 = [new Product(NAME_MEDIUM_COVERAGE, SELL_IN_1_NEG, PRICE_20)];
const TO_DEFAULT_4 = [new Product(NAME_RANDOM, SELL_IN_10, PRICE_20)];
const TO_MEGA_COVERAGE = [new Product(NAME_MEGA_COVERAGE, SELL_IN_1_NEG, PRICE_80)];
const TO_SUPER_SALE_1 = [new Product(NAME_SUPER_SALE, SELL_IN_10, PRICE_1)];
const TO_SUPER_SALE_2 = [new Product(NAME_SUPER_SALE, SELL_IN_1_NEG, PRICE_20)];
const TO_FULL_COVERAGE_1 = [new Product(NAME_FULL_COVERAGE, SELL_IN_10, PRICE_20)];
const TO_FULL_COVERAGE_2 = [new Product(NAME_FULL_COVERAGE, SELL_IN_10, PRICE_50)];
const TO_FULL_COVERAGE_3 = [new Product(NAME_FULL_COVERAGE, SELL_IN_1_NEG, PRICE_20)];
const TO_SPECIAL_FULL_COVERAGE_1 = [new Product(NAME_SPECIAL_FULL_COVERAGE, SELL_IN_11, PRICE_20)];
const TO_SPECIAL_FULL_COVERAGE_2 = [new Product(NAME_SPECIAL_FULL_COVERAGE, SELL_IN_10, PRICE_20)];
const TO_SPECIAL_FULL_COVERAGE_3 = [new Product(NAME_SPECIAL_FULL_COVERAGE, SELL_IN_3, PRICE_20)];
const TO_SPECIAL_FULL_COVERAGE_4 = [new Product(NAME_SPECIAL_FULL_COVERAGE, SELL_IN_0, PRICE_20)];

describe('DEFAULT UPDATE ', () => {
  it('default_1 should be sell in 9 and price 19', () => {
    const coTest = new CarInsurance(TO_DEFAULT_1);
    const products = coTest.updatePrice();
    expect(products[0].name).equal(NAME_MEDIUM_COVERAGE);
    expect(products[0].price).equal(PRICE_20 - 1);
    expect(products[0].sellIn).equal(SELL_IN_10 - 1);
  });

  it('default_2 should be same price "0" and sell in 9 day', () => {
    const coTest = new CarInsurance(TO_DEFAULT_2);
    const products = coTest.updatePrice();
    expect(products[0].name).equal(NAME_MEDIUM_COVERAGE);
    expect(products[0].price).equal(PRICE_0);
    expect(products[0].sellIn).equal(SELL_IN_10 - 1);
  });
  it('default_3 should be twice less price "18" and sell in -2 day', () => {
    const coTest = new CarInsurance(TO_DEFAULT_3);
    const products = coTest.updatePrice();
    expect(products[0].name).equal(NAME_MEDIUM_COVERAGE);
    expect(products[0].price).equal(PRICE_20 - 2);
    expect(products[0].sellIn).equal(SELL_IN_1_NEG - 1);
  });
  it('default_4 Diferent product should be same price "0" and sell in 9 day', () => {
    const coTest = new CarInsurance(TO_DEFAULT_4);
    const products = coTest.updatePrice();
    expect(products[0].name).equal(NAME_RANDOM);
    expect(products[0].price).equal(PRICE_20 - 1);
    expect(products[0].sellIn).equal(SELL_IN_10 - 1);
  });
});
describe('MEGA COVERAGE', () => {
  it(' MEGA COVERAGE_1 it never has to be sold -1 or decreases in price (80))', () => {
    const coTest = new CarInsurance(TO_MEGA_COVERAGE);
    const products = coTest.updatePrice();
    expect(products[0].name).equal(NAME_MEGA_COVERAGE);
    expect(products[0].price).equal(PRICE_80);
    expect(products[0].sellIn).equal(SELL_IN_1_NEG);
  });
});
describe('SUPER SALE', () => {
  it(' TO_SUPER_SALE_1 it never has to be MINUS THAN ZERO price )', () => {
    const coTest = new CarInsurance(TO_SUPER_SALE_1);
    const products = coTest.updatePrice();
    expect(products[0].name).equal(NAME_SUPER_SALE);
    expect(products[0].price).equal(PRICE_1);
    expect(products[0].sellIn).equal(SELL_IN_10 - 1);
  });
  it(' TO_SUPER_SALE_2 it decreases price (16) twice  on neg sellin (-2) )', () => {
    const coTest = new CarInsurance(TO_SUPER_SALE_2);
    const products = coTest.updatePrice();
    expect(products[0].name).equal(NAME_SUPER_SALE);
    expect(products[0].price).equal(PRICE_20 - 4);
    expect(products[0].sellIn).equal(SELL_IN_1_NEG - 1);
  });
});
describe('FULL_COVERAGE', () => {
  it(' TO_FULL_COVERAGE_1 it WOULD BE INCREASE price 21 )', () => {
    const coTest = new CarInsurance(TO_FULL_COVERAGE_1);
    const products = coTest.updatePrice();
    expect(products[0].name).equal(NAME_FULL_COVERAGE);
    expect(products[0].price).equal(PRICE_20 + 1);
    expect(products[0].sellIn).equal(SELL_IN_10 - 1);
  });
  it(' TO_FULL_COVERAGE_2 it never has to be MORE THAN 50 price )', () => {
    const coTest = new CarInsurance(TO_FULL_COVERAGE_2);
    const products = coTest.updatePrice();
    expect(products[0].name).equal(NAME_FULL_COVERAGE);
    expect(products[0].price).equal(PRICE_50);
    expect(products[0].sellIn).equal(SELL_IN_10 - 1);
  });
  it(' TO_FULL_COVERAGE_3 it increase twice price 22 and sellin 9)', () => {
    const coTest = new CarInsurance(TO_FULL_COVERAGE_3);
    const products = coTest.updatePrice();
    expect(products[0].name).equal(NAME_FULL_COVERAGE);
    expect(products[0].price).equal(PRICE_20 + 2);
    expect(products[0].sellIn).equal(SELL_IN_1_NEG - 1);
  });
});
describe('SPECIAL_FULL_COVERAGE', () => {
  it(' TO_SPECIAL_FULL_COVERAGE_1 PRICE 21 AND DAY 10  )', () => {
    const coTest = new CarInsurance(TO_SPECIAL_FULL_COVERAGE_1);
    const products = coTest.updatePrice();
    expect(products[0].name).equal(NAME_SPECIAL_FULL_COVERAGE);
    expect(products[0].price).equal(PRICE_20 + 1);
    expect(products[0].sellIn).equal(SELL_IN_11 - 1);
  });
  it(' TO_SPECIAL_FULL_COVERAGE_2 INCREASES 2 PRICE when SELLIN  )', () => {
    const coTest = new CarInsurance(TO_SPECIAL_FULL_COVERAGE_2);
    const products = coTest.updatePrice();
    expect(products[0].name).equal(NAME_SPECIAL_FULL_COVERAGE);
    expect(products[0].price).equal(PRICE_20 + 2);
    expect(products[0].sellIn).equal(SELL_IN_10 - 1);
  });
  it(' TO_SPECIAL_FULL_COVERAGE_3 INCREASES 3 PRICE WHEN 5 DAYS OR LESS )', () => {
    const coTest = new CarInsurance(TO_SPECIAL_FULL_COVERAGE_3);
    const products = coTest.updatePrice();
    expect(products[0].name).equal(NAME_SPECIAL_FULL_COVERAGE);
    expect(products[0].price).equal(PRICE_20 + 3);
    expect(products[0].sellIn).equal(SELL_IN_3 - 1);
  });
  it(' TO_SPECIAL_FULL_COVERAGE_4 PRICE DROPS 0 WHEN 0 DAYS )', () => {
    const coTest = new CarInsurance(TO_SPECIAL_FULL_COVERAGE_4);
    const products = coTest.updatePrice();
    expect(products[0].name).equal(NAME_SPECIAL_FULL_COVERAGE);
    expect(products[0].price).equal(PRICE_0);
    expect(products[0].sellIn).equal(SELL_IN_0 - 1);
  });
});

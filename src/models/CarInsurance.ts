import Product from './Product';

class CarInsurance {
  constructor(public products:Product[]) {
    this.products = products;
  }

  updatePrice(): Product[] {
    const tempProducts = this.products;
    for (let i = 0; i < tempProducts.length; i += 1) {
      switch (tempProducts[i].name) {
        case 'Full Coverage': {
          tempProducts[i] = this.defaultPriceUpdate(tempProducts[i], +1);
          tempProducts[i] = this.defaultPriceUpdateTwice(tempProducts[i], 1, 1);
          tempProducts[i] = this.defaultDateUpdate(tempProducts[i]);
          break;
        }
        case 'Mega Coverage':
          break;
        case 'Special Full Coverage': {
          if (tempProducts[i].sellIn <= 0) {
            tempProducts[i].price = 0;
            tempProducts[i] = this.defaultDateUpdate(tempProducts[i]);
            break;
          }
          if (tempProducts[i].sellIn < 11) {
            tempProducts[i] = this.defaultPriceUpdate(tempProducts[i], +1);
            if (tempProducts[i].sellIn < 6) {
              tempProducts[i] = this.defaultPriceUpdate(tempProducts[i], +1);
            }
          }

          tempProducts[i] = this.defaultPriceUpdate(tempProducts[i], +1);
          tempProducts[i] = this.defaultDateUpdate(tempProducts[i]);

          break;
        }
        case 'Super Sale':
          tempProducts[i] = this.defaultPriceUpdate(tempProducts[i], -2);
          tempProducts[i] = this.defaultPriceUpdateTwice(tempProducts[i], -1, 2);
          tempProducts[i] = this.defaultDateUpdate(tempProducts[i]);

          break;
        default: {
          tempProducts[i] = this.defaultPriceUpdate(tempProducts[i], -1);
          tempProducts[i] = this.defaultPriceUpdateTwice(tempProducts[i], -1, 1);
          tempProducts[i] = this.defaultDateUpdate(tempProducts[i]);
          break;
        }
      }
    }
    this.products = tempProducts;
    return this.products;
  }

  /* eslint class-methods-use-this:
  ["error", { "exceptMethods": ["defaultPriceUpdate","defaultDateUpdate"] }] */
  defaultPriceUpdateTwice(product:Product, value:number, factor:number):Product {
    let productTmp = product;
    const factorTmp = factor;
    const valueTmp = value;
    if (productTmp.sellIn <= 0) {
      productTmp = this.defaultPriceUpdate(productTmp, valueTmp * factorTmp);
    }

    return productTmp;
  }

  defaultPriceUpdate(product:Product, value:number):Product {
    const productTmp = product;
    const valueTmp = value;
    productTmp.price += valueTmp;
    if (productTmp.price < 0) {
      productTmp.price = 0;
    }
    if (productTmp.price >= 50) {
      productTmp.price = 50;
    }
    return productTmp;
  }

  defaultDateUpdate(product:Product):Product {
    const productTmp = product;
    productTmp.sellIn -= 1;
    return productTmp;
  }
}

export default CarInsurance;

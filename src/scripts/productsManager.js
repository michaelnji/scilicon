import db from "./dbManager";
import products from "../store/products";
import { v4 as uuidv4 } from "uuid";
import timeFunctions from "./timeFunctions";
import { addToast } from "../store/toast.js";

function addProduct(
  name,
  amt,
  unitName,
  unitPrice,
  isMeasurable,
  cp,
  remainingProducts
) {
  let productId, productCreationDate, productProjectedGain, productSP;
  productId = uuidv4();
  // FIXME : change format of date to : dd/mm/yyyy
  productCreationDate = timeFunctions.today();
  productSP = amt * unitPrice;
  productProjectedGain = productSP - cp;
  let finalProduct = {
    name: name,
    index: db.getItemValue("PI"),
    costPrice: cp,
    sellingPrice: productSP,
    grossGain: productProjectedGain,
    creationDate: productCreationDate,
    id: productId,
    amount: amt,
    initialStock: amt,
    totalSold: 0,
    totalUnitsSold: 0,
    amtLeftForSale: amt,
    unitName: unitName,
    unitPrice: unitPrice,
    isMeasurable: isMeasurable ? isMeasurable : false,
  };
  products.update((value) => {
    return db.setItemValue("SC_PRODUCTS", [finalProduct, ...remainingProducts]);
  });
  // updating global account details
  let accountInfo = db.getItemValue("SC_GENERAL_ACCOUNT");
  accountInfo.totalProductsStock = accountInfo.totalProductsStock + amt;
  if (accountInfo.productsLeftInStock > 0) {
    accountInfo.productsLeftInStock = accountInfo.productsLeftInStock + amt;
  } else {
    accountInfo.productsLeftInStock = amt;
  }
  accountInfo.projectedSales = amt * unitPrice;
  accountInfo.projectedProfit = accountInfo.projectedProfit + (productSP - cp);
  db.setItemValue("SC_GENERAL_ACCOUNT", accountInfo);
  let message = ` ${name}  created`;
  let timeout = 2000;
  let type = "success";
  let dismissable = false;
  addToast({ message, type, dismissable, timeout });

  db.setItemValue("PI", db.getItemValue("PI") + 1);
}
export default {
  addProduct,
  //
};

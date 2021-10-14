import tf from "./timeFunctions";
import db from "./dbManager";
import { addNotification } from "../store/notifications";
let generalAccount = {
  capital: 0,
  currentAccountBalance: 0,
  totalProductsStock: 0,
  totalProductsSold: 0,
  totalProfitMade: 0,
  totalCredit: 0,
  projectedProfit: 0,
  projectedSales: 0,
  productsLeftInStock: 0,
  totalAmountFromSales: 0,
};
function createArchive() {
  let scArchive = db.getItemValue("SC_ARCHIVE");
  let val = db.getItemValue("SC_ARCHIVE_ACCOUNT");
  let products = db.getItemValue("SC_PRODUCTS");
  let archive = {};
  archive.totalAmountFromSales = val.totalAmountFromSales;
  archive.totalCredit = val.totalCredit;
  archive.totalProfitMade = val.totalProfitMade;
  archive.totalProductsSold = val.totalProductsSold;
  archive.products = products;
  archive.date = tf.today();
  scArchive.today = archive;

  scArchive.data = [...scArchive.data, archive];
  db.setItemValue("SC_ARCHIVE", scArchive);
  db.setItemValue("SC_ARCHIVE_ACCOUNT", generalAccount);
  let message = `Please do not press the create archive button again till tomorrow <br> Also, re enter your capital`;
  let type = "success";
  let timeout = 6000;
  let title = "success!";
  let dismissible = true;
  addNotification({ message, type, timeout, title, dismissible });
}
export default {
  createArchive,
};

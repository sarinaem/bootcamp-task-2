//http://localhost:3000/transactions

const button = document.querySelector(".btn");
const searchInput = document.querySelector("#search");
const transactionContent = document.querySelector(".transaction-content");


button.addEventListener("click", () => {
  creatTable(allTransactionDta);
  getTransactions();
});

let allTransactionDta = [];

function getTransactions() {
  // console.log("loaded..");
  axios
    .get("http://localhost:3000/transactions")
    .then((res) => {
      allTransactionDta = res.data;
      //  console.log(res.data);
      creatTable(allTransactionDta);
    })
    .catch((err) => console.log(err));
}

function creatTable(transactions) {
  const transactionDta = document.querySelector(".transaction-data");
  transactionDta.innerHTML = "";

  transactions.forEach((transaction) => {
    let typeClass = "";
    switch (transaction.type) {
      case "برداشت از حساب":
        typeClass = "red";
        break;
      case "افزایش اعتبار":
        typeClass = "green";
        break;
      default:
        typeClass = "";
    }
    transactionDta.innerHTML += `<tr>
        <td>${transaction.id}</td>
        <td class="${typeClass}">${transaction.type}</td>
        <td>${transaction.price}</td>
        <td>${transaction.refId}</td>
        <td>${transaction.date}</td>
      </tr>`;
  });
}
getTransactions();

searchInput.addEventListener("input", (e) => {
  const query = e.target.value;
  console.log(query);
  axios

    .get(`http://localhost:3000/transactions?refId_like=${query}`)
    .then((res) => {
      console.log(res.data);
      creatTable(res.data);
    })
    .catch((err) => console.log(err));
});


let order = "desc";

function sortPrice() {
  if (order === "desc") {
    order = "asc";
  } else {
    order = "desc";
  }
    axios
  .get(`http://localhost:3000/transactions?_sort=price&_order=${order}`)
  .then((res) =>   {
    allTransactionDta = res.data;
    creatTable(allTransactionDta);
  })
    .catch((err) => console.log(err));

}

const priceSort = document.querySelector("#price-sort");
priceSort.addEventListener("click", sortPrice);
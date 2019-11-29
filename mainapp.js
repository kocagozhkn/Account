// axios.get("https://hakan-29a5e.firebaseio.com/hakan.json", {
//     timeout: 5000
// }).then(res => {

//     console.log(res)
// })
var showChart = false;
var myLi = [];
var totalAmount = 0;
var tableData = "";
var db = [];
var bd = [];
var companyList = "";
var companyChartTotalVal = [];
var compLsit = [];
var amountList = [];
var mal;
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";

  if(cityName=="Chart"){
    drawChart();
    
  }
}

var firebaseConfig = {
  apiKey: "AIzaSyD3h2ZWrQ_PADjpXOIIzCr_OszyZMjnFi4",
  authDomain: "hakan-29a5e.firebaseapp.com",
  databaseURL: "https://hakan-29a5e.firebaseio.com",
  projectId: "hakan-29a5e",
  storageBucket: "hakan-29a5e.appspot.com",
  messagingSenderId: "866079851973",
  appId: "1:866079851973:web:d68e7d5423b2808fc2b7ac",
  measurementId: "G-HEDBYNED2M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var messagesRef = firebase.database().ref("invoices");
var messagesRef2 = firebase.database().ref("companies");

// var data = {

//   firstname: "senem",
//   username:"senem75",
//   email:"senemyasar75@outlook.com",
//   edit:""
// }

//messagesRef2.push(data)

messagesRef.on("value", gotData, errData);

function gotData(data) {
  //console.log(data.val())
  //getData(data.val())
  $.each(data.val(), function(index, key) {
    //console.log(key)

    companyChartTotalVal.push(key);
    db.push(key.company);
    bd.push(key.amount);
    
    

    //selectListCompany(key.company)

    //console.log(db)
    totalAmount += parseInt(key.amount);
    //console.log(totalAmount)
    tableData += `<tr class=odun id=${index}>`;
    tableData += "<td>" + key.invoiceno + "</td>";
    tableData += "<td>" + key.date + "</td>";
    tableData += "<td>" + key.company + "</td>";
    tableData += "<td>" + key.country + "</td>";
    tableData += "<td>" + key.netweight + "</td>";
    tableData += "<td>" + key.grossweight + "</td>";
    tableData += "<td>" + key.amount + "</td>";
    tableData += `<td><button value="X" class="erase">X</button></td>`;
    tableData += "</tr>";
  });
  var result = [];
    companyChartTotalVal.reduce(function(res, value) {
      if (!res[value.company]) {
        res[value.company] = { company: value.company, amount: 0 };
        result.push(res[value.company]);
      }
      res[value.company].amount += parseInt(value.amount);
      return res;
    }, {});
    mal = result.forEach(function(a) {
      compLsit.push(a.company);
      amountList.push(a.amount);
    });
  //console.log(data.val())
  $(".table").append(tableData);
  $(".total").text("Total Amount: " + totalAmount);

  tableData = "";
  //console.log(tableData)

  //console.log(companyChartTotalVal)
}

function errData(data) {
  // console.log(data.val())
}

$(".addButton").click(() => {
  var inputData = {
    invoiceno: $(".invoiceno").val(),
    date: $(".date").val(),
    company: $(".selectcompany").val(),
    country: $(".country").val(),
    netweight: $(".netweight").val(),
    grossweight: $(".grossweight").val(),
    amount: $(".amount").val()
  };

  // console.log(messagesRef)

  if ($(".invoiceno").val() != "") {
    $(".odun").remove();
    db = [];
    bd = [];
    //console.log(messagesRef)
    messagesRef.push(inputData);

    //drawChart()
  }
  $("input").val("");
});

//console.log(myLi)

$(document).ready(() => {
  $(".motor").on("click", ".erase", function() {
    //$(this).parent().parent().remove();
    var myId = $(this)
      .parent()
      .parent()
      .attr("id");
    $(".odun").remove();
    messagesRef.child(myId).remove();

    //console.log(firebase.database.collection("invoices"))
  });
  $(".motor").on("click", "[data-erasespan]", function() {
    //$(this).parent().parent().remove();
    var myId = $(this)
      .parent()
      .attr("id");
    $(".list-group").empty();
    messagesRef2.child(myId).remove();

    //console.log(firebase.database.collection("invoices"))
  });
});

//console.log(bd)

var ctx = document.getElementById("myChart").getContext("2d");

function drawChart() {
  //console.log(companyChartTotalVal)





  

  ///console.log(compLsit)

  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [...compLsit],
      datasets: [
        {
          label: "Sales",
          data: [...amountList],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
  db = [];
  bd = [];
  compLsit = []
  amountList = []
}

function selectListCompany(company) {
  var selectData = "";
  selectData += `<option value=${company}>${company}</option>`;

  $(".selectcompany").append(selectData);
}

//drawChart()

messagesRef2.on("value", gotData2, errData2);

$("#button-addon2").click(() => {
  $(".list-group").empty();
  messagesRef2.push($("#addcompany").val());
});

function gotData2(data) {
  //console.log(data.val())
  //getData(data.val())
  $.each(data.val(), function(index, key) {
    selectListCompany(key);
    companyList +=
      `<li id=${index} class="list-group-item d-flex justify-content-between align-items-center">` +
      key +
      "<span data-erasespan='eraseme' style='cursor:pointer'  class='badge badge-primary badge-pill'>X</span></li>";
  });

  $(".list-group").append(companyList);
  companyList = "";
  //$(".list-group").remove()
}

function errData2(data) {
  //console.log(data.val())
}


setTimeout(() => {
  var accountDivs =+ `<div class="accounty">`+compLsit+ `</div>` 

for(var i=0;i<compLsit.length;i++){
  $(".container.accountinfo").append(`<div class="accounty">
  
  
  Company Name:${compLsit[i]} Amount: ${amountList[i]} $
  </div>`)

}


console.log(compLsit)

}, 1000);


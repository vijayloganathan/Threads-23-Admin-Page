const date13 = new Date();
let day13 = date13.getDate();
let month13 = date13.getMonth() + 1;
let year13 = date13.getFullYear();
let hour13 = date13.getHours();
let min13 = date13.getMinutes();
let sec13 = date13.getSeconds();
let currentDate13 = `${day13}-${month13}-${year13}  ${hour13}-${min13}-${sec13}`;

var databas = firebase.database();
function workshop3fun()
{ 
  let size=1;
  let i=0;
  let codigoid=[];
  databas.ref("userdata").child("workshop3").on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var data = childSnapshot.val();
      codigoid[i]=data.id;
      i=i+1;
    })
  })
      var table = document.getElementById("workshop3_table");
      let a=1;
      databas.ref("userdata").child("user").once("value", function(snapshot) {
        table.querySelector("#workshop3_tbody").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
          var data = childSnapshot.val();
          const ifevent=data.workshop;
          if(ifevent=="cyber_security")
          {
            const codigoidch=data.id;
            
          var row = table.insertRow();
          var cell1 = row.insertCell();
          cell1.innerHTML = data.id;
          var cell2 = row.insertCell();
          cell2.innerHTML = data.Name;
          var cell3 = row.insertCell();
          cell3.innerHTML = data.Email;
          var cell4 = row.insertCell();
          cell4.innerHTML = data.Phoneno;
          var cell5 = row.insertCell();
          cell5.innerHTML = '<button class="btncheck" name="btn">Check In</button>';
          cell5.addEventListener("click", function() {
             const id=data.id;
             databas.ref("userdata").child("user").child(id).get().then((snapshot)=>{
              if (snapshot.exists()) {
                const sydata = snapshot.val();
                strings=sydata.v;
                const id=sydata.id;
                const name=sydata.Name;
                const email=sydata.Email;
                const phone=sydata.Phoneno;
                const clg=sydata.college;
                const Dept=sydata.Dept;
                const Year=sydata.Year;

                database.ref("userdata").child("workshop3").child(id).set({
                  id : id,
                  Name : name,
                  Phoneno : phone,
                  college : clg ,
                  Email : email ,
                  Year:Year,
                  Dept:Dept
              })
              database.ref("userdata").child("user").child(id).update({
                workshop:"cyber security"
            })
              .catch(error =>{
                console.log(error);
              })
              }
             }) 
             row.style.color = "white";
             row.style.backgroundColor = "green";
            
          
          });

        const tr = table.getElementsByTagName("tr");
        const td = tr[size].getElementsByTagName("td");
        for(var c=0;c<codigoid.length;c++)
        { 
          if(codigoidch==codigoid[c])
          {
            tr[size].style.color = "white";
            tr[size].style.backgroundColor = "green";
          }
          
        }
        size=size+1;
        }
          
        });
      });

const user_workshop3btn = document.getElementById("user_workshop3btn");
user_workshop3btn.addEventListener('click' , event => {
  event.preventDefault()
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("user_workshop3");
        filter = input.value.toUpperCase();
        table = document.getElementById("workshop3_table");
        tr = table.getElementsByTagName("tr");
      
        // Loop through all table rows, and hide those that don't match the search query
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td");
          for (j = 0; j < td.length; j++) {
            txtValue = td[j].textContent || td[j].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
              break;
            } else {
              tr[i].style.display = "none";
            }
          }
        }
      })

    }

    const report_workshop3btn = document.getElementById("report_workshop3btn");
report_workshop3btn.addEventListener('click' , event => {

  var ref = firebase.database().ref("userdata").child("workshop3");
  ref.once('value', function(snapshot) {
    var data = snapshot.val();

    // Create an array to store the column headings
    var headings = ['ID', 'Username', 'Email','College','Department','Year', 'Phone'];

    // Create an array to store the data rows
    var rows = [];

    // Loop through the data and push each row into the rows array
    for (var key in data) {
        var row = [
            data[key].id,
                    data[key].Name,
                    data[key].Email,
                    data[key].college,
                    data[key].Dept,
                    data[key].Year,
                    data[key].Phoneno,

        ];
        rows.push(row);
    }

    // Add the column headings row to the beginning of the data array
    rows.unshift(headings);

    // Create a new Excel workbook and worksheet
    var workbook = XLSX.utils.book_new();
    var worksheet = XLSX.utils.aoa_to_sheet(rows);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, 'CYBERSECURITY report on '+currentDate13+'.xlsx');
});

})
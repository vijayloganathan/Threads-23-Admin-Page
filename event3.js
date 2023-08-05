const date3 = new Date();
let day3 = date3.getDate();
let month3 = date3.getMonth() + 1;
let year3 = date3.getFullYear();
let hour3 = date3.getHours();
let min3 = date3.getMinutes();
let sec3 = date3.getSeconds();
let currentDate3 = `${day3}-${month3}-${year3}  ${hour3}-${min3}-${sec3}`;


var databas = firebase.database();
function event3fun()
{ 
  let size=1;
  let i=0;
  let codigoid=[];
  databas.ref("userdata").child("event3").on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var data = childSnapshot.val();
      codigoid[i]=data.id;
      i=i+1;
    })
  })
      var table = document.getElementById("event3_table");
      let a=1;
      databas.ref("userdata").child("user").once("value", function(snapshot) {
        table.querySelector("#event3_tbody").innerHTML = "";
        let rownum=0;
        snapshot.forEach(function(childSnapshot) {
          rownum=rownum+1;
          var data = childSnapshot.val();
          const ifevent=data.Event;
          if(ifevent=="yes")
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
          var text = row.insertCell();
          text.innerHTML =  `<input type="number" class="teambox" id="${rownum}">`;
          var cell5 = row.insertCell();
          cell5.innerHTML = '<button class="btncheck" name="btn">Check In</button>';
          cell5.setAttribute('data-id', rownum);
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

                const no = cell5.getAttribute('data-id');
                const rown=document.getElementById(no).value;

                database.ref("userdata").child("event3").child(id).set({
                  id : id,
                  Name : name,
                  Phoneno : phone,
                  college : clg ,
                  Email : email ,
                  Year:Year,
                  Dept:Dept,
                  team:rown,
              })
              database.ref("userdata").child("user").child(id).update({
                event3:"yes"
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

const user_event3btn = document.getElementById("user_event3btn");
user_event3btn.addEventListener('click' , event => {
  event.preventDefault()
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("user_event3");
        filter = input.value.toUpperCase();
        table = document.getElementById("event3_table");
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

    const report_event3btn = document.getElementById("report_event3btn");
report_event3btn.addEventListener('click' , event => {

  var ref = firebase.database().ref("userdata").child("event3");
  ref.once('value', function(snapshot) {
    var data = snapshot.val();

    // Create an array to store the column headings
    var headings = ['ID', 'Username', 'Email','College','Department','Year', 'Phone','Team Number'];

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
                    data[key].team,
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
    XLSX.writeFile(workbook, 'PAPER PRESENTATION report on '+currentDate3+'.xlsx');
});

})
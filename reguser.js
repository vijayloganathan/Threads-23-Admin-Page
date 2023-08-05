const date15 = new Date();
let day15 = date15.getDate();
let month15 = date15.getMonth() + 1;
let year15 = date15.getFullYear();
let hour15 = date15.getHours();
let min15 = date15.getMinutes();
let sec15 = date15.getSeconds();
let currentDate15 = `${day15}-${month15}-${year15}  ${hour15}-${min15}-${sec15}`;


var databas = firebase.database();
function reguserfun()
{
        var table = document.getElementById("my_table");
        databas.ref("userdata").child("user").once("value", function(snapshot) {
        table.querySelector("#superadmintbody").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
          var data = childSnapshot.val();
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
          cell5.innerHTML = data.college;
        });
      });
      const user_reguserbtn = document.getElementById("user_reguserbtn");
      user_reguserbtn.addEventListener('click' , event => {
        
        event.preventDefault()
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("user_reguser");
        filter = input.value.toUpperCase();
        table = document.getElementById("my_table");
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
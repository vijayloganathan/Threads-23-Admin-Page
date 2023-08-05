const date14 = new Date();
let day14 = date14.getDate();
let month14 = date14.getMonth() + 1;
let year14 = date14.getFullYear();
let hour14 = date14.getHours();
let min14 = date14.getMinutes();
let sec14 = date14.getSeconds();
let currentDate14 = `${day14}-${month14}-${year14}  ${hour14}-${min14}-${sec14}`;


var databas = firebase.database();
function paymentverifyfun()
{ 
      var table = document.getElementById("paymentverify_table");
      databas.ref("userdata").child("unregister").once("value", function(snapshot) {
        table.querySelector("#paymentverify_tbody").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
          var data = childSnapshot.val();
          const ifevent=data.Event;
          var row = table.insertRow();
          var cell1 = row.insertCell();
          cell1.innerHTML = data.transactionid;
          var cell2 = row.insertCell();
          cell2.innerHTML = data.name;
          var cell3 = row.insertCell();
          cell3.innerHTML = data.email;
          var cell4 = row.insertCell();
          cell4.innerHTML = data.phone;
          var cell5 = row.insertCell();
          cell5.innerHTML = '<button class="btncheck" name="btn">Check In</button>';
          cell5.addEventListener("click", function() {
             const id1=data.transactionid;
             databas.ref("userdata").child("unregister").child(id1).get().then((snapshot)=>{
              console.log(id1)
              if (snapshot.exists()) {
                const sydata = snapshot.val();
                const id=sydata.id;
                const dept=sydata.dept;
                const name=sydata.name;
                const email=sydata.email;
                const phone=sydata.phone;
                const clg=sydata.clg;
                const Year=sydata.year;
                const event=sydata.event;
                const transactionid=sydata.transactionid;
                const workshop = sydata.workshop;
             
                const dbRef = firebase.database().ref()
                console.log(id1)
                databas.ref("userdata").child("unregister").child(id1).remove()

                databas.ref("userdata").child("findid").once("value", function(snapshot) {
                  
                  let ifevent=""
                  snapshot.forEach(function(childSnapshot) {
                    var data = childSnapshot.val();
                    ifevent=data.emailid;
                   
                  })

                    if(ifevent==email)
                    {
                     
                      databas.ref("userdata").child("findid").once("value", function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {
                          var data = childSnapshot.val();
                      const idch=data.id;
                      if(event=="no")
                      {
                        databas.ref("userdata").child("user").child(idch).update({
                          workshop:workshop,
                          transactionid1:transactionid
                      }).then(()=>{
                        swal({
                            title : "Data Added Successfully",
                            icon : 'success'
                        })
                    })
                      }
                      else if(workshop=="not intrested")
                      {
                        databas.ref("userdata").child("user").child(idch).update({
                          Event:event,
                          transactionid1:transactionid
                      }).then(()=>{
                        swal({
                            title : "Data Added Successfully",
                            icon : 'success'
                        })
                    })
                      }
                    })
                    })
                     
                    }
                    else
                    {
                     
                      let length="";
                      dbRef.child("userdata").child("value").get().then((snapshot) => { 
                          if (snapshot.exists()) {
                              let sydat = snapshot.val();
                              length=sydat.value+1;
                          }
                      }).then(()=>{
                          databas.ref("userdata").child("user").child("THCSE"+length).set({
                              id : "THCSE"+length,
                              Name : name,
                              college : clg ,
                              Email : email ,
                              Phoneno : phone,
                              Year:Year,
                              Dept:dept,
                              Event:event,
                              workshop:workshop,
                              transactionid:transactionid
                
                          })
                          databas.ref("userdata").child("findid").child("THCSE"+length).set({
                            id : "THCSE"+length,
                            emailid:email
                        })
                          .then(()=>{
                              databas.ref("userdata").child("value").set({
                                  value:length
                              }).then(()=>{
                                  swal({
                                      title : "Data Added Successfully",
                                      icon : 'success'
                                  })
                              })
                          })
                      })
                    }
                  
                })

     
              }
             }) 
            
          });
          
        });
      });

const user_paymentverifybtn = document.getElementById("user_paymentverifybtn");
user_paymentverifybtn.addEventListener('click' , event => {
  event.preventDefault();

        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("user_paymentverify");
        filter = input.value.toUpperCase();
        table = document.getElementById("paymentverify_table");
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

    const paymentverify_btn = document.getElementById("paymentverify_btn");
    paymentverify_btn.addEventListener('click' , Event => {
      Event.preventDefault();
    
      var ref = firebase.database().ref("userdata").child("unregister");
      ref.once('value', function(snapshot) {
        var data = snapshot.val();
    
        // Create an array to store the column headings
        var headings = ['Transaction ID', 'Username', 'Email','College','Department','Year', 'Phone','Event','Workshop'];
    
        // Create an array to store the data rows
        var rows = [];
    
        // Loop through the data and push each row into the rows array
        for (var key in data) {
            var row = [
                        data[key].transactionid,
                        data[key].name,
                        data[key].email,
                        data[key].clg,
                        data[key].dept,
                        data[key].year,
                        data[key].phone,
                        data[key].event,
                        data[key].workshop,

    
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
        XLSX.writeFile(workbook, 'PAYMENT VERIFY REGESTER report on '+currentDate14+'.xlsx');
    });
    
    })
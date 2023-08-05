const auth = firebase.auth()
const db = firebase.firestore()
const database = firebase.database()
const container_mt_5 = document.querySelector('#container_mt_5')
const add_data = document.querySelector('#add_data')
const back_to_add = document.querySelector('#back_to_add')
const loginForm = document.querySelector('.container1')
const dashboard = document.querySelector('.dashboard')
const loginbut = document.querySelector('#loginbt')
const logout = document.querySelector('.logout')
const forget = document.querySelector('#forget')
const reguser = document.querySelector('#reguser')
const orginazer = document.querySelector('#orginazer')
const report = document.querySelector('#report')
const aforget = document.querySelector('#aforget')

const dbRef = firebase.database().ref()

const event1= document.querySelector('#event1')
const event2= document.querySelector('#event2')
const event3= document.querySelector('#event3')
const event4= document.querySelector('#event4')
const event5= document.querySelector('#event5')
const event6= document.querySelector('#event6')
const event7= document.querySelector('#event7')
const event8= document.querySelector('#event8')
const event9= document.querySelector('#event9')
const event10= document.querySelector('#event10')
const workshop1= document.querySelector('#workshop1')
const workshop2= document.querySelector('#workshop2')
const workshop3= document.querySelector('#workshop3')
const paymentverify= document.querySelector('#paymentverify')
const onspot_page = document.querySelector('.onspot_page')

const reguserbtn = document.querySelector('#reguserbtn')
const orginazerbtn = document.querySelector('#orginazerbtn')
const reportbtn = document.querySelector('#reportbtn')

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let hour = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();
let currentDate = `${day}-${month}-${year}  ${hour}-${min}-${sec}`;

var list = document.getElementById("org_list");
reguserbtn.addEventListener('click' , event => {
    orginazer.style.display='none'
    report.style.display='none'
    reguser.style.display='block'
    
})

orginazerbtn.addEventListener('click' , event => {
   
    report.style.display='none'
    reguser.style.display='none'
    orginazer.style.display='block'
})

reportbtn.addEventListener('click' , event => {
    orginazer.style.display='none'
    reguser.style.display='none'
    report.style.display='block'
})


const userdetails = id => {


   loginForm.style.display='none'
    window.localStorage.setItem('currently_loggedIn',id)
    const docRef =db.collection('organiser').doc(id)
    docRef.get().then(doc => {
       const eventname = `${doc.data().eventname}`
       const orgname = `${doc.data().name}`
       window.localStorage.setItem('orgname',orgname)
       if(eventname == "admin"){
        reguserfun();
        dashboard.style.display = 'block'
        
       }
       else if(eventname == "event1"){
        event1fun()
        event1.style.display='block'
       }
       else if(eventname == "event2"){
        event2fun()
        event2.style.display='block'
       }
       else if(eventname == "event3"){
        event3fun()
        event3.style.display='block'
       }
       else if(eventname == "event4"){
        event4fun()
        event4.style.display='block'
       }
       else if(eventname == "event5"){
        event5fun()
        event5.style.display='block'
       }
       else if(eventname == "event6"){
        event6fun()
        event6.style.display='block'
       }
       else if(eventname == "event7"){
        event7fun()
        event7.style.display='block'
       }
       else if(eventname == "event8"){
        event8fun()
        event8.style.display='block'
       }
       else if(eventname == "event9"){
        event9fun()
        event9.style.display='block'
       }
       else if(eventname == "event10"){
        event10fun()
        event10.style.display='block'
       }
       else if(eventname == "workshop1"){
        workshop1fun()
        workshop1.style.display='block'
       }
       else if(eventname == "workshop2"){
        workshop2fun()
        workshop2.style.display='block'
       }
       else if(eventname == "workshop3"){
        workshop3fun()
        workshop3.style.display='block'
       }
       else if(eventname == "paymentverify"){
        paymentverifyfun()
        paymentverify.style.display='block'
       }
       else if(eventname == "onspotreg"){
        onspot_page.style.display='block'
       }
    })

}

try{
    const currentUser = window.localStorage.getItem('currently_loggedIn')
    if(currentUser == null){
        throw new Error('No Current User')
    } else {
        userdetails(currentUser)
    }
}catch(err){
    
    loginForm.style.display = 'block'
}


function orglist()
{
    db.collection("organiser").onSnapshot((querySnapshot) => {
        const organiser = [];
        querySnapshot.forEach(doc => {
            organiser.push(doc.data());
        }); 
    
        organiser.forEach(element => {
           
            if(element.name != "admin"){
                const uid=element.uid;
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var node1 = document.createTextNode(element.name);
            var td2 = document.createElement("td");
            var node2 = document.createTextNode(element.mailid);
            var td3 = document.createElement("td");
            var node3 = document.createTextNode(element.eventname);
            var td4 = document.createElement("td");

            var docRef = db.collection("organiser").doc(element.uid);
            
            var node4 = document.createElement("button");
            node4.innerHTML = "Delete";
            node4.addEventListener("click", function() {
                docRef.delete().then(function() {
                    var user = firebase.auth().currentUser;
                    user.delete().then(function() {
    
                        var rowCount = list.rows.length;
                        for (var i = rowCount - 1; i >= 0; i--) {
                            list.deleteRow(i);
                        }
                        orglist()
                      console.log("User account was successfully deleted.");
                    }).catch(function(error) {
                      console.error("Error deleting user:", error);
                    });
            }).catch(function(error) {
                console.error("Error deleting document: ", error);
            });
            });
    
            td1.appendChild(node1);
            td2.appendChild(node2);
            td3.appendChild(node3);
            td4.appendChild(node4);
           
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
           
            list.appendChild(tr);
            }
           
            
        })
        
    })
}


aforget.addEventListener('click' , () => {
    swal({
        title : 'Reset Password',
        content : {
            element : 'input',
            attributes : {
                placeholder : 'Type your Email',
                type : 'email'
            }
        }
    }).then(val => {
        auth.sendPasswordResetEmail(val).then(() => {
            swal({
                title : 'Check Your Email',
                icon : 'success'
            })
        }).catch(err => {
            swal({
                title : err,
                icon : 'error'
            })
        })
    })
  })



loginbut.addEventListener('click' , event => {

        var namev = document.getElementById("ausername").value;
        var emailv = document.getElementById("apassword").value;
        event.preventDefault()
        if (namev == "" || emailv == "") {
          alert("Name and email are required");
          return false;
        }
    
    
    loginbut.style.display = 'none'
    const email = document.querySelector('#ausername').value
    const password = document.querySelector('#apassword').value
    
    
    
    auth.signInWithEmailAndPassword(email,password).then(cred => {
        loginbut.style.display = 'block'
        
            userdetails(cred.user.uid)
            loginForm.style.display = 'none'
            
    }).catch(err => {
        swal({
            title : err ,
            icon :'error'
        }).then(() => {
            loginForm.style.display = 'block'
            loginbut.style.display = 'block'
            
        })
    })
})


logout.addEventListener('click' , event => {
    window.localStorage.removeItem('currently_loggedIn')
    loginForm.style.display = 'block'
        dashboard.style.display = 'none'
        document.querySelector('#alogin').reset()
})





back_to_add.addEventListener('click' , event =>{

    container_mt_5.style.display='none'
    var rowCount = list.rows.length;

    for (var i = rowCount - 1; i >= 0; i--) {
        list.deleteRow(i);
    }
    add_data.style.display='block'
})

const orgsubmit=document.querySelector("#orgsubmit");
orgsubmit.addEventListener('click', event =>{
    orgsubmit.style.display='none'
    const event_selector = document.querySelector('#event_selector').value
    const name = document.querySelector('#org_name').value
    const email = document.querySelector('#org_mail').value
    const password = document.querySelector('#org_password').value

    auth.createUserWithEmailAndPassword(email,password).then(cred => {

        document.getElementById('event_selector').value = "";
        document.getElementById('org_name').value = "";
        document.getElementById('org_mail').value = "";
        document.getElementById('org_password').value = "";

        swal({
            title : 'Account Created Successfully',
            icon : 'success'
        }).then(() => {
            db.collection('organiser').doc(cred.user.uid).set({
                uid : cred.user.uid,
                eventname:event_selector,
                mailid:email,
                name:name,
               
            }).then(() => {
                orgsubmit.style.display='block'
                
            }).catch(err => {
                swal({
                    title : err,
                    icon : 'error'
                }).then(() => {
                    orgsubmit.style.display='block'
                })
    })
        })
    }).catch(err => {
        swal({
            title : err,
            icon : 'error'
        }).then(()=>
        {
            orgsubmit.style.display='block'
        })
    })
})



const delsubmit=document.querySelector("#delsubmit");
delsubmit.addEventListener('click', event =>{

    add_data.style.display='none'
    orglist()
    var rowCount = list.rows.length;
    for (var i = rowCount - 1; i >= 0; i--) {
        list.deleteRow(i);
    }
    container_mt_5.style.display='block'
   
})




//the indivudal user data

const event1_logout = document.querySelector('#event1_logout')
const event2_logout = document.querySelector('#event2_logout')
const event3_logout = document.querySelector('#event3_logout')
const event4_logout = document.querySelector('#event4_logout')
const event5_logout = document.querySelector('#event5_logout')
const event6_logout = document.querySelector('#event6_logout')
const event7_logout = document.querySelector('#event7_logout')
const event8_logout = document.querySelector('#event8_logout')
const event9_logout = document.querySelector('#event9_logout')
const event10_logout = document.querySelector('#event10_logout')
const workshop1_logout = document.querySelector('#workshop1_logout')
const workshop2_logout = document.querySelector('#workshop2_logout')
const workshop3_logout = document.querySelector('#workshop3_logout')
const paymentverify_logout = document.querySelector('#paymentverify_logout')
const logout_btn_onspot = document.querySelector('.logout_btn_onspot')
const org=document.querySelector('#org')




event1_logout.addEventListener('click' , event => {
    window.localStorage.removeItem('currently_loggedIn')
    loginForm.style.display = 'block'
    org.style.display = 'none'
        document.querySelector('#alogin').reset()
})
event2_logout.addEventListener('click' , event => {
    window.localStorage.removeItem('currently_loggedIn')
    loginForm.style.display = 'block'
    org.style.display = 'none'
        document.querySelector('#alogin').reset()
})
event3_logout.addEventListener('click' , event => {
    window.localStorage.removeItem('currently_loggedIn')
    loginForm.style.display = 'block'
    org.style.display = 'none'
        document.querySelector('#alogin').reset()
})
event4_logout.addEventListener('click' , event => {
    window.localStorage.removeItem('currently_loggedIn')
    loginForm.style.display = 'block'
    org.style.display = 'none'
        document.querySelector('#alogin').reset()
})
event5_logout.addEventListener('click' , event => {
    window.localStorage.removeItem('currently_loggedIn')
    loginForm.style.display = 'block'
    org.style.display = 'none'
        document.querySelector('#alogin').reset()
})
event6_logout.addEventListener('click' , event => {
    window.localStorage.removeItem('currently_loggedIn')
    loginForm.style.display = 'block'
    org.style.display = 'none'
        document.querySelector('#alogin').reset()
})
event7_logout.addEventListener('click' , event => {
    window.localStorage.removeItem('currently_loggedIn')
    loginForm.style.display = 'block'
    org.style.display = 'none'
        document.querySelector('#alogin').reset()
})
event8_logout.addEventListener('click' , event => {
    window.localStorage.removeItem('currently_loggedIn')
    loginForm.style.display = 'block'
    org.style.display = 'none'
        document.querySelector('#alogin').reset()
})
event9_logout.addEventListener('click' , event => {
    window.localStorage.removeItem('currently_loggedIn')
    loginForm.style.display = 'block'
    org.style.display = 'none'
        document.querySelector('#alogin').reset()
})
event10_logout.addEventListener('click' , event => {
    window.localStorage.removeItem('currently_loggedIn')
    loginForm.style.display = 'block'
    org.style.display = 'none'
        document.querySelector('#alogin').reset()
})
workshop1_logout.addEventListener('click' , event => {
    window.localStorage.removeItem('currently_loggedIn')
    loginForm.style.display = 'block'
    org.style.display = 'none'
        document.querySelector('#alogin').reset()
})
workshop2_logout.addEventListener('click' , event => {
    window.localStorage.removeItem('currently_loggedIn')
    loginForm.style.display = 'block'
    org.style.display = 'none'
        document.querySelector('#alogin').reset()
})
workshop3_logout.addEventListener('click' , event => {
    window.localStorage.removeItem('currently_loggedIn')
    loginForm.style.display = 'block'
    org.style.display = 'none'
        document.querySelector('#alogin').reset()
})
paymentverify_logout.addEventListener('click' , event => {
    window.localStorage.removeItem('currently_loggedIn')
    loginForm.style.display = 'block'
    org.style.display = 'none'
        document.querySelector('#alogin').reset()
})
logout_btn_onspot.addEventListener('click' , event => {
    window.localStorage.removeItem('currently_loggedIn')
    loginForm.style.display = 'block'
    org.style.display = 'none'
        document.querySelector('#alogin').reset()
})


   
  
    function downloadExcel() {
        const report_selector = document.querySelector('#report_selector').value
    var ref = firebase.database().ref("userdata").child(report_selector);

    if(report_selector=="user")
    {
        ref.once('value', function(snapshot) {
            var data = snapshot.val();
        
            // Create an array to store the column headings
                     var headings = ['ID', 'Username', 'Email','College','Department','Year', 'Phone','Events','workshop','Technical quiz','Code Revamp','Paper Presentation','Technical Debate','Match The Code','Quizaholic','AD Zap','Treasure Hunt','Mini Game','Karaoke','transaction1','transaction2','cash1','case2','case receved by'];
        
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
                            data[key].Event,
                            data[key].workshop,
                            data[key].event1,
                            data[key].event2,
                            data[key].event3,
                            data[key].event4,
                            data[key].event5,
                            data[key].event6,
                            data[key].event7,
                            data[key].event8,
                            data[key].event9,
                            data[key].event10,
                            data[key].transactionid,
                            data[key].transactionid1,
                            data[key].cash,
                            data[key].cash1,
                            data[key].reciver

        
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
            XLSX.writeFile(workbook, 'ONSPOT REGESTER report on '+currentDate+'.xlsx');
        });
    }
    else
    {
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
            XLSX.writeFile(workbook, 'ONSPOT REGESTER report on '+currentDate+'.xlsx');
        });
    }

   
    }


                  var onspot_pack = document.getElementById("onspot_pack");
                  var paymentpage = document.getElementById("paymentpage");

                  var eventqr = document.getElementById("eventqr");
                  var workshopqr = document.getElementById("workshopqr");
                  var eventworkqr = document.getElementById("eventworkqr");

                  var payment_type = document.getElementById("payment_type");
                  var textboxContainer = document.getElementById("textboxContainer");
                  var paymentContainer = document.getElementById("paymentContainer");
                  payment_type.addEventListener("change", function() {
                    if (payment_type.value === "option1") {
                      textboxContainer.style.display = "block";
                    } else {
                      textboxContainer.style.display = "none";
                    }
        
                    if (payment_type.value === "option2") {
                      paymentContainer.style.display = "block";
                    } else{
                      paymentContainer.style.display = "none";
                    }
                  });

                  var onspot_Submit = document.getElementById("onspot_Submit");
                  onspot_Submit.addEventListener("click", Event=> {
                    onspot_Submit.style.display="none"
                    Event.preventDefault();

                      var name = document.getElementById("name").value;
                      var email = document.getElementById("email").value;
                      var dept = document.getElementById("dept").value;
                      var year = document.getElementById("year").value;
                      var clg = document.getElementById("clg").value;
                      var phone = document.getElementById("phone").value;
                      var event = document.getElementById("event").value;
                      var workshop = document.getElementById("workshop").value;
                      var cashentery = document.getElementById("cashentery").value;
                      var orgname = window.localStorage.getItem('orgname');
                      console.log(orgname);
                      console.log(email)
                    if (name == "" || email == "" || dept == "" || year == "" || clg == "" || phone == "" || cashentery=="")
                    {
                      swal("Enter all the field")
                      onspot_Submit.style.display="block"
                      onspot_pack.style.display="block";
                    }
                    else
                    {
                        if(event == "yes" || workshop!="not_interested")
                        {
                            
                            database.ref("userdata").child("findid").once("value", function(snapshot) {
                  
                                let ifevent=""
                                snapshot.forEach(function(childSnapshot) {
                                  var data = childSnapshot.val();
                                  ifevent=data.emailid;
                                })  
                              
                                  if(ifevent==email)
                                  {
                                    
                                    database.ref("userdata").child("findid").once("value", function(snapshot) {
                                      snapshot.forEach(function(childSnapshot) {
                                        var data = childSnapshot.val();
                                    const idch=data.id;
                                   
                                    if(event=="no")
                                    {
                                    
                                      database.ref("userdata").child("user").child(idch).update({
                                        workshop:workshop,
                                        cash1:cashentery,
                                        reciver:orgname
                                    }).then(()=>{
                                      swal({
                                          title : "Data Added Successfully",
                                          icon : 'success'
                                      })
                                      document.querySelector('#onspot_class').reset()
                                      onspot_Submit.style.display="block"
                                    onspot_pack.style.display="block";
                                  })
                                    }
                                    else if(workshop=="not_interested")
                                    {
                                   
                                      database.ref("userdata").child("user").child(idch).update({
                                        Event:event,
                                        cash1:cashentery,
                                        reciver:orgname
                                    }).then(()=>{
                                      swal({
                                          title : "Data Added Successfully",
                                          icon : 'success'
                                      })
                                      document.querySelector('#onspot_class').reset()
                                      onspot_Submit.style.display="block"
                                    onspot_pack.style.display="block";
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
                                        database.ref("userdata").child("user").child("THCSE"+length).set({
                                            id : "THCSE"+length,
                                            Name : name,
                                            college : clg ,
                                            Email : email ,
                                            Phoneno : phone,
                                            Year:year,
                                            Dept:dept,
                                            Event:event,
                                            workshop:workshop,
                                            cash:cashentery,
                                            reciver:orgname
                                
                                        })
                                        database.ref("userdata").child("findid").child("THCSE"+length).set({
                                            id : "THCSE"+length,
                                            emailid:email
                                        })
                                        .then(()=>{
                                            database.ref("userdata").child("value").set({
                                                value:length
                                            }).then(()=>{
                                                swal({
                                                    title : "Data Added Successfully",
                                                    icon : 'success'
                                                })
                                            })
                                        })
                                    })
                                    document.querySelector('#onspot_class').reset()
                                    onspot_Submit.style.display="block"
                                    onspot_pack.style.display="block";
                                    
                                  }
                                
                              })    
                            }   
                         else
                            {
                             swal("Select either \"Event\" Or \"workshop\" ")
                             onspot_Submit.style.display="block"
                             }
                }
                  })

                  var onspot_next = document.getElementById("onspot_next");
                  onspot_next.addEventListener("click", Event=> {

                    onspot_Submit.style.display="none"
                    Event.preventDefault();

                      var name = document.getElementById("name").value;
                      var email = document.getElementById("email").value;
                      var dept = document.getElementById("dept").value;
                      var year = document.getElementById("year").value;
                      var clg = document.getElementById("clg").value;
                      var phone = document.getElementById("phone").value;
                      var event = document.getElementById("event").value;
                      var workshop = document.getElementById("workshop").value;
                     

                      if (name == "" || email == "" || dept == "" || year == "" || clg == "" || phone == "")
                      {
                        swal("Enter all the field")
                        onspot_Submit.style.display="block"
                        onspot_pack.style.display="block";
                      }
                      else
                    {
                        if(event == "yes" || workshop!="not_interested")
                        {
                            if(event=="yes"&&workshop!="not_interested")
                            {
                                workshopqr.style.display="none";
                                eventqr.style.display="none";
                                eventworkqr.style.display="block"
                            }
                            else if(event=="yes"&&workshop=="not_interested")
                            {
                                eventworkqr.style.display="none";
                                workshopqr.style.display="none";
                                eventqr.style.display="block"
                            }
                            else if(event=="no"&&workshop!="not_interested")
                            {
                                eventworkqr.style.display="none";
                                eventqr.style.display="none";
                                workshopqr.style.display="block"
                            }

                            onspot_pack.style.display="none";
                            paymentpage.style.display="block"

                            var onspotsubmitbtn = document.getElementById("onspotsubmitbtn");
                            onspotsubmitbtn.addEventListener("click", Event=> {
                                Event.preventDefault();
                                onspotsubmitbtn.style.display="none"
                                var transactionid = document.getElementById("transactionid").value;

                                if(transactionid == "")
                                {
                                    swal("Enter UPI transaction ID")
                                    onspotsubmitbtn.style.display="block"
                                }
                                else
                                {   
                                    database.ref("userdata").child("findid").once("value", function(snapshot) {
                  
                                        let ifevent=""
                                        snapshot.forEach(function(childSnapshot) {
                                          var data = childSnapshot.val();
                                          ifevent=data.emailid;
                                         
                                         
                                        })
                                        
                                          if(ifevent==email)
                                          {
                                            
                                            database.ref("userdata").child("findid").once("value", function(snapshot) {
                                              snapshot.forEach(function(childSnapshot) {
                                                var data = childSnapshot.val();
                                            const idch=data.id;
                                          
                                            if(event=="no")
                                            {
                                              database.ref("userdata").child("user").child(idch).update({
                                                workshop:workshop,
                                                transactionid1:transactionid
                                            }).then(()=>{
                                              swal({
                                                  title : "Data Added Successfully",
                                                  icon : 'success'
                                              })
                                              document.querySelector('#onspot_class').reset()
                                              onspot_Submit.style.display="block"
                                              onspotsubmitbtn.style.display="block"
                                              paymentpage.style.display="none"
                                              onspot_pack.style.display="block";
                                              textboxContainer.style.display = "block";

                                              
                                          })
                                            }
                                            else if(workshop=="not_interested")
                                            {
                                              database.ref("userdata").child("user").child(idch).update({
                                                Event:event,
                                                transactionid1:transactionid
                                            }).then(()=>{
                                              swal({
                                                  title : "Data Added Successfully",
                                                  icon : 'success'
                                              })
                                              document.querySelector('#onspot_class').reset()
                                              onspot_Submit.style.display="block"
                                              onspotsubmitbtn.style.display="block"
                                              paymentpage.style.display="none"
                                              onspot_pack.style.display="block";
                                              textboxContainer.style.display = "block";


                                              
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
                                                database.ref("userdata").child("user").child("THCSE"+length).set({
                                                    id : "THCSE"+length,
                                                    Name : name,
                                                    college : clg ,
                                                    Email : email ,
                                                    Phoneno : phone,
                                                    Year:year,
                                                    Dept:dept,
                                                    Event:event,
                                                    workshop:workshop,
                                                    transactionid:transactionid
                                      
                                                })
                                                database.ref("userdata").child("findid").child("THCSE"+length).set({
                                                  id : "THCSE"+length,
                                                  emailid:email
                                              })
                                                .then(()=>{
                                                    database.ref("userdata").child("value").set({
                                                        value:length
                                                    }).then(()=>{
                                                        swal({
                                                            title : "Data Added Successfully",
                                                            icon : 'success'
                                                        })
                                                    })
                                                })
                                            })
                                            document.querySelector('#onspot_class').reset()
                                              onspot_Submit.style.display="block"
                                              onspotsubmitbtn.style.display="block"
                                              paymentpage.style.display="none"
                                              onspot_pack.style.display="block";
                                              textboxContainer.style.display = "block";

                                          }
                                        
                                      })
                                }

                            })

                            

                        }
                        else
                        {
                            swal("Select either \"Event\" Or \"workshop\" ")
                            onspot_Submit.style.display="block" 
                        }
                    }

                  })
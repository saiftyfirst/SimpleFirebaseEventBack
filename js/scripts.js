 var config_fb = {
 	apiKey: "AIzaSyBMyBPii67BVhjEGQi_3DIjcgN_UPTyNlM",
    authDomain: "summer-app-605e6.firebaseapp.com",
    databaseURL: "https://summer-app-605e6.firebaseio.com",
    projectId: "summer-app-605e6",
    storageBucket: "summer-app-605e6.appspot.com",
    messagingSenderId: "454230371300"
 };

 var database = null;
 var current_tab = 'Events';

function addEvent(){
	database.ref('/Events').push().set({
  	"Id" : $("#events-list > div").length + 1,
  	"Date" : $("#date_modal").val(),
  	"Desc" : $("#desc_modal").val(),
  	"End" : $("#et_modal").val(),
  	"Speaker" : $("#speaker_modal").val(),
  	"Start" : $("#st_modal").val(),
  	"Title" : $("#title_modal").val()
	});
	consoleMessage("New Events Added!");
}

function addFacultyMember(){
  database.ref('/Faculty').push().set({
    "Id" : $("#faculty-list > div").length + 1,
    "Name" : $("#name_modal").val(),
    "Info" : $("#minfo_modal").val(),
    "ImageUrl" : $("#imageFac_modal").val()
  });
  consoleMessage("New Faculty Member Added!");
}

function addFAQ(){
  console.log("here");
  database.ref('/FAQ').push().set({
    "Id" : $("#FAQ-list > div").length + 1,
    "Question" : $("#question_modal").val(),
    "Answer" : $("#answer_modal").val(),
  });
  consoleMessage("New FAQ Added!");
}

function updateEvent(idx){
	var id = idx.substring(7,);
	database.ref('/Events/'+id).update({
  	"Date" : $("#date_" + id).val(),
  	"Desc" : $("#desc_" + id).val(),
  	"End" : $("#et_" + id).val(),
  	"Speaker" : $("#speaker_" + id).val(),
  	"Start" : $("#st_" + id).val(),
  	"Title" : $("#title_" + id).val()
	});
	consoleMessage("Update Complete!");
}

function updateFaculty(idx){
  var id = idx.substring(10,);
  database.ref('/Faculty/'+id).update({
    "Name" : $("#name_" + id).val(),
    "Info" : $("#info_" + id).val(),
    "ImageUrl" : $("#imageUrl_" + id).val()
  });
  consoleMessage("Update Complete!");
}

function updateFAQ(idx){
  var id = idx.substring(10,);
  database.ref('/Faculty/'+id).update({
    "Question" : $("#question_" + id).val(),
    "Answer" : $("#answer_" + id).val()
  });
  consoleMessage("Update Complete!");
}

function updateAboutUs(){
  database.ref().update({ "AboutUs" : $("#aboutUs").val() });
  consoleMessage("Update Complete!");  
}

function deleteItem(idx){
  var meta = idx.split('_');
  database.ref('/' + meta[0] + '/' + meta[1]).remove();
  consoleMessage(meta[0] + " Deleted!");
}


function toggleFooter(){
  $("#footer").toggle();
}

function consoleMessage(message){
	toggleFooter();
  $("#footer-data").text(message);
  setTimeout(toggleFooter,1000);
}



function createEventDiv(idx, data){
	return '<div class="event-item col-sm-4"><div class="eItem-container"><label for="title_' + idx + '">Title</label><input type="text" class="form-control" id="title_' + idx + '" value="' + data.Title + '"><label for="desc_' + idx + '">Description</label><input type="text" class="form-control" id="desc_' + idx + '" value="' + data.Desc + '"><label for="speaker_' + idx + '">Speaker</label><input type="text" class="form-control" id="speaker_' + idx + '" value="' + data.Speaker + '"><label for="date_' + idx + '">Date</label><input type="text" class="form-control" id="date_' + idx + '" value="' + data.Date + '"><div class="row"><div class="col-sm-6"><label for="st_' + idx + '">Start Time</label><input type="text" class="form-control" id="st_' + idx + '" value="' + data.Start + '"></div><div class="col-sm-6"><label for="et_' + idx + '">End Time</label><input type="text" class="form-control" id="et_' + idx + '" value="' + data.End + '"></div></div><div class="row"><div class="col-sm-4 btn-event"><button type="button" class="btn btn-warning btn-block" id="upBtn_' + idx + '">Image</button></div><div class="col-sm-4 btn-event"><button type="button" class="btn btn-success btn-block" id="updBtn_' + idx + '" onclick="updateEvent(this.id)">Update</button></div><div class="col-sm-4 btn-event"><button type="button" class="btn btn-danger btn-block" id="Events_' + idx + '" onclick="deleteItem(this.id)">Delete</button></div></div></div></div>';
}

function createFacultyDiv(idx, data){
  return '<div class="event-item col-sm-4"><div class="eItem-container"><label for="name_' + idx + '">Name</label><input type="text" class="form-control" id="name_' + idx + '" value="' + data.Name + '"><label for="info_' + idx + '">More Info</label><input type="text" class="form-control" id="info_' + idx + '" value="' + data.Info + '"><label for="imageUrl_' + idx + '">Image Url</label><input type="text" class="form-control" id="imageUrl_' + idx + '" value="' + data.ImageUrl + '"><div class="row"><div class="col-sm-4 btn-event"><button type="button" class="btn btn-success btn-block" id="updFacBtn_' + idx + '" onclick="updateFaculty(this.id)">Update</button></div><div class="col-sm-4 btn-event"><button type="button" class="btn btn-danger btn-block" id="Faculty_' + idx + '" onclick="deleteItem(this.id)">Delete</button></div></div></div></div>';
}

function createFAQDiv(idx, data){
  return '<div class="col-sm-6"><div class="eItem-container"><label for="question_' + idx + '">Question</label><input type="text" class="form-control" id="question_' + idx + '" value="' + data.Question + '"><label for="answer_' + idx + '">Answer</label><input type="text" class="form-control" id="answer_' + idx + '" value="' + data.Answer + '"><div class="row justify-content-center"><div class="col-sm-4 btn-event"><button type="button" class="btn btn-success btn-block" id="updBtnFAQ_' + idx + '" onclick="updateFAQ(this.id)">Update</button></div><div class="col-sm-4 btn-event"><button type="button" class="btn btn-danger btn-block" id="FAQ' + idx + '" onclick="deleteItem(this.id)">Delete</button></div></div></div></div>';
}

function handleTabClick(tab){
  $("#"+current_tab+"TabContent").hide();
  $("#"+tab+"TabContent").show();
  current_tab=tab;
}

function initializeFirebase(){
  // Initialize Firebase
 	firebase.initializeApp(config_fb);
 	database = firebase.database();
}

function populate(title,divCreator){
  firebase.database().ref("/"+title).orderByChild("Id").on("value", function(snapshot) {
      $("#" + title + "-list").empty();
      snapshot.forEach(function(childSnapshot) {
          var data = childSnapshot.val();
          $("#" + title + "-list").append(divCreator(childSnapshot.key, data));
      });
  });
}

function populateAboutUs(){
  firebase.database().ref("/AboutUs").on("value", (snapshot) => $("#aboutUs").val(snapshot.val()) );
}

function setUp(){
  $("#mainContentArea").children().hide();
  initializeFirebase();
  populate('Events',createEventDiv);
  populate('Faculty',createFacultyDiv);
  populate('FAQ',createFAQDiv);
  populateAboutUs();
}


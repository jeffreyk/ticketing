var tasks;

tasks = localStorage["tasks"]===undefined?[]:JSON.parse(localStorage["tasks"]);

$(document).ready(
  function(){
    displayArrayAsList(tasks,"#list-task");
    $("#input-title").focus();
    $(document).on("click", ".expandable", function(event){
      $(event.target).siblings(".ticket-description").toggle();
      $(event.target).text($(event.target).text()==="+" ? "-" : "+");
    });
    $(document).on("click", ".checkbox", function(event){
      tasks[this.id].complete = this.checked ? true : false;
      localStorage.setItem("tasks",JSON.stringify(tasks));
    });
});

$("form").submit(
  function(event){
    event.preventDefault();
    tasks.push(new Task($("#input-title").val(), $("#input-description").val()));
    localStorage.setItem("tasks",JSON.stringify(tasks));
    displayArrayAsList(tasks, "#list-task");
    return false;
});

$("#clear-button").click(function(){
  localStorage.clear();
  tasks = [];
  $("#list-task").empty();
});

function displayArrayAsList(array, listid){
  $(listid).empty();
  for(var i = 0; i<array.length;i++){
    $(listid).append([
    '<li>',
        array[i].complete?
        '<input class="checkbox" type="checkbox" id="'+i+'" checked/>':
        '<input class="checkbox" type="checkbox" id="'+i+'"/>',
        array[i].description?
        '<span class="expandable">+</span>':'<span class="notExpandable"/>',
        '<label for="' +i+'">'+array[i].title+'</label>',
        '<div class="ticket-description">',
            array[i].description,
        '</div>',
    '</li>'].join(''));
  }
};

function Task(title, description) {
  this.title       = title;
  this.description = description;
  this.complete    = false;
};

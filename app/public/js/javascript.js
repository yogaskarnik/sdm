$(document).ready(function() {
    function searchDevice(phoneNumber) {
        $.get("/searchDevice", phoneNumber, function(response) {
            console.log(response);
        });
    }
    $(".device").submit(function(event) {
        event.preventDefault();
        searchDevice(); 
      });
  });
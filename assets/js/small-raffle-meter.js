google.load('visualization', 1.0);
google.setOnLoadCallback(test);
function test() {
  var opts = {sendMethod: 'auto'};
  var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1X8Ba3bd-JEhASUNs5VDcA18dTPyxIS5lwxRKBBKWKqs/edit#gid=0', opts);
  query.setQuery('select F');
  query.send(handleQueryResponse);
}
function handleQueryResponse(response){
  if(response.isError()){
    console.log('Error: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
  var data = response.getDataTable();
  var base = 0;
  var sold = 0;
  var out = 0;
  for(var i = 0; i < data.getNumberOfRows(); i++){
    if(data.getValue(i,0) == 0) {
      base += 1;
    } else if(data.getValue(i,0) == 1) {
       out += 1;
    } else if(data.getValue(i,0) == 2) {
       sold += 1;
    }
  }        

  var soldPercent = sold / (sold + out + base) * 100;
  var outPercent = (out + sold) / (sold + out + base) * 100;

  
  var deadline = new Date(2015, 11, 10, 18, 0, 0); // note: month is 0-11 but date starts at 1
  var numDays = Math.ceil((deadline - new Date())/86400000);

  $("#percent").html("Tickets sold: " + soldPercent + "% | " + numDays + " days left! | <a href='/raffle'>About the raffle >></a>");

  var sheet = new StyleSheet();
  var widthSold = new StyleSheetElement("width", soldPercent + '%');
  var tagA = sheet.addElementToTag("#raffle-meter-sold", widthSold);
  var widthOut = new StyleSheetElement("width", outPercent + '%');
  var tagD = sheet.addElementToTag("#raffle-meter-out", widthOut);
  console.log(sheet);
  addInlineStyleSheet(sheet);
  $("#raffle-meter-container-s").show(1000);
  $("#raffle-meter-out").show(1000);
  $("#raffle-meter-sold").show(1000);
}


//var Tabulator = require('tabulator-tables');


var tabledata = [
    {id:1, name:"Oli Bob", location:"United Kingdom",progress: 1, gender:"male", rating:1, col:"red", dob:"14/04/1984"},
    {id:2, name:"Mary May", location:"Germany", progress: 1,gender:"female", rating:2, col:"blue", dob:"14/05/1982"},
    {id:3, name:"Christine Lobowski", location:"France", progress: 1,gender:"female", rating:0, col:"green", dob:"22/05/1982"},
    {id:4, name:"Brendon Philips", location:"USA", progress: 1,gender:"male", rating:1, col:"orange", dob:"01/08/1980"},
    {id:5, name:"Margret Marmajuke", location:"Canada", progress: 1,gender:"female", rating:5, col:"yellow", dob:"31/01/1999"},
    {id:6, name:"Frank Harbours", location:"Russia", progress: 1,gender:"male", rating:4, col:"red", dob:"12/05/1966"},
    {id:7, name:"Jamie Newhart", location:"India", progress: 1,gender:"male", rating:3, col:"green", dob:"14/05/1985"},
    {id:8, name:"Gemma Jane", location:"China", progress: 1,gender:"female", rating:0, col:"red", dob:"22/05/1982"},
    {id:9, name:"Emily Sykes", location:"South Korea", progress: 1,gender:"female", rating:1, col:"maroon", dob:"11/11/1970"},
    {id:10, name:"James Newman", location:"Japan", progress: 1,gender:"male", rating:5, col:"red", dob:"22/03/1998"},
];
var dateEditor = function(cell, onRendered, success, cancel){
    //cell - the cell component for the editable cell
    //onRendered - function to call when the editor has been rendered
    //success - function to call to pass the successfuly updated value to Tabulator
    //cancel - function to call to abort the edit and return to a normal cell

    //create and style input
    var cellValue = moment(cell.getValue(), "DD/MM/YYYY").format("YYYY-MM-DD"),
    input = document.createElement("input");

    input.setAttribute("type", "date");

    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";

    input.value = cellValue;

    onRendered(function(){
        input.focus();
        input.style.height = "100%";
    });

    function onChange(){
        if(input.value != cellValue){
            success(moment(input.value, "YYYY-MM-DD").format("DD/MM/YYYY"));
        }else{
            cancel();
        }
    }

    //submit new value on blur or change
    input.addEventListener("blur", onChange);

    //submit new value on enter
    input.addEventListener("keydown", function(e){
        if(e.keyCode == 13){
            onChange();
        }

        if(e.keyCode == 27){
            cancel();
        }
    });

    return input;
};


//Build Tabulator
var table = new Tabulator("#example-table", {
	data:tabledata,
    height:"311px",
    layout:"fitColumns",
    columns:[
        {title:"Name", field:"name", width:150, editor:"input"},
       {title:"Favourite Color", field:"col", formatter:"color",width:150, widthGrow:3},
        //{title:"Location", field:"location", width:130, editor:"autocomplete", editorParams:{allowEmpty:true, showListOnEmpty:true, values:true}},
		
        {title:"Progress", field:"progress", sorter:"number", align:"left",  width:140, editor:true},
        {title:"Gender", field:"gender", editor:"select", editorParams:{values:{"male":"Male", "female":"Female", "unknown":"Unknown"}}},
        {title:"Rating", field:"rating",  formatter:"star", align:"center", width:100, editor:true},
        {title:"Date Of Birth", field:"dob", align:"center", sorter:"date", width:140, editor:dateEditor},
        {title:"Driver", field:"car", align:"center", editor:true, formatter:"tickCross"},
		
		// {title:"Progress", field:"progress", sorter:"number", align:"left", formatter:"progress", width:140, editor:true},
		// {title:"Gender", field:"gender", widthGrow:2},
		// {title:"Rating", field:"rating", align:"center"},
		// {title:"Date Of Birth", field:"dob", align:"center", sorter:"date", widthGrow:2},
		// {title:"Driver", field:"car", align:"center"},
    ],
});


// var table = new Tabulator("#example-table", {
	// data:tabledata,
    // height:"311px",
    // layout:"fitColumns",
    // columns:[
    // {title:"Name", field:"name", width:200},
    // {title:"Favourite Color", field:"col", widthGrow:3},
    // {title:"Progress", field:"progress", align:"right", sorter:"number"},
    // {title:"Gender", field:"gender", widthGrow:2},
    // {title:"Rating", field:"rating", align:"center"},
    // {title:"Date Of Birth", field:"dob", align:"center", sorter:"date", widthGrow:2},
    // {title:"Driver", field:"car", align:"center"},
    // ],
// });

// var table = new Tabulator("#example-table", {
	// data:tabledata,
    // height:"311px",
    // columns:[
    // {title:"Name", field:"name"},
    // {title:"Progress", field:"progress", align:"right", sorter:"number"},
    // {title:"Gender", field:"gender"},
    // {title:"Rating", field:"rating", align:"center"},
    // {title:"Favourite Color", field:"col"},
    // {title:"Date Of Birth", field:"dob", align:"center", sorter:"date"},
    // {title:"Driver", field:"car", align:"center"},
    // ],
// });



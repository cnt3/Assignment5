function MenuChoice()
{
     if (document.getElementById("menu").value == "Display Customer List")
    {
        document.getElementById("CustomerList").style.visibility = "visible";
        document.getElementById("OrderHistory").style.visibility = "hidden";
        document.getElementById("OrderList").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Display Customer Order History")
    {
        document.getElementById("CustomerList").style.visibility = "hidden";
        document.getElementById("OrderHistory").style.visibility = "visible";
        document.getElementById("OrderList").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Display List of Orders")
    {
        document.getElementById("CustomerList").style.visibility = "hidden";
        document.getElementById("OrderHistory").style.visibility = "hidden";
        document.getElementById("OrderList").style.visibility = "visible";
    }
    else
    {
        document.getElementById("CustomerList").style.visibility = "hidden";
        document.getElementById("OrderHistory").style.visibility = "hidden";
        document.getElementById("OrderList").style.visibility = "hidden";
    }
}

function GetCustomers()
{
    var XMLRequest = new XMLHttpRequest();  // Create AJAX request object
    var url = " http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCustomers"; // Create URL
    
    // Checks that the object has reutrned data
    XMLRequest.onreadystatechange=function()
    {
        if (XMLRequest.readyState == 4 && XMLRequest.status == 200)
        {
            var output = JSON.parse(XMLRequest.responseText);
            GenerateOutput(output);
        }
    }
    
    // Initiate the server request
    XMLRequest.open("GET", url, true);
    
    //Send the data
    XMLRequest.send();
    
}

function GetOrderHistory()
{
    var objRequest = new XMLHttpRequest();  // Create AJAX request object
    var url = " http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/"; // Create URL
    url += document.getElementById("customerID").value;
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            DisplayOrderHistory(output);
        }
    }
    
    // Initiate the server request
    objRequest.open("GET", url, true);
    
    //Send the data
    objRequest.send();
}

function GetOrdersForCustomer()
{
    var objRequest = new XMLHttpRequest();  // Create AJAX request object
    var url = " http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/"; // Create URL
    url += document.getElementById("custID").value;
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            DisplayOrdersService(output);
        }
    }
    
    // Initiate the server request
    objRequest.open("GET", url, true);
    
    //Send the data
    objRequest.send();
}

function GenerateOutput(result)
{
   var count = 0;
   var displaytext = "<table><tr><th>Customer ID</th><th>Customer Name</th><th>Customer City</th></tr>";
   
   // Loop to  extract data from the response object
   for (count = 0; count < result.GetAllCustomersResult.length; count++)
   {
        displaytext += "<tr><td>" + result.GetAllCustomersResult[count].CustomerID + "</td><td>" + result.GetAllCustomersResult[count].CompanyName + "</td><td>" + result.GetAllCustomersResult[count].City + "</td></tr>";
   }
   displaytext += "</table>";
   document.getElementById("listdisplay").innerHTML = displaytext;
}

function DisplayOrderHistory(result)
{
    var count = 0;
    var displaytext = "<table><tr><th>Product Name</th><th>Total Product Quantity Ordered</th></tr>";
    
    // Loop to extract data from the response object
    for (count = 0; count < result.length; count++)
    {
        displaytext += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";
    }
    displaytext += "</table>";
    document.getElementById("customerhistory").innerHTML = displaytext;
}

function DisplayOrdersService(result)
{
    var count = 0;
    var displaytext = "<table><tr><th>Order Date</th><th>Order ID</th><th>Shipping Address</th><th>Shipping City</th><th>Shipping Name</th><th>Shipping Postal Code</th><th>Shipped Date</th></tr>";
    
    // Loop to extract data from the response object
    for (count = 0; count < result.GetOrdersForCustomerResult.length; count++)
    {
        displaytext += "<tr><td>" + result.GetOrdersForCustomerResult[count].OrderDate + "</td><td>" + result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress
        + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipName + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td><td>"
        + result.GetOrdersForCustomerResult[count].ShippedDate + "</td></tr>";
    }
    displaytext += "</table>";
    document.getElementById("listOforders").innerHTML = displaytext;
}
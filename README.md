# IssuesDetails

IssueDetails is an application used to know the total number of open issues and number of issues opened within 24 hours, within a week and above one week in the github project.

This application is written in Node.js, html and angular.js. Web pages are written in html and angular.js and server is node.js.

Home page(localhost:3000/home) will have a search option where user can give github project url and "Go" button to search. Example for searching url: "https://github.com/Shippable/support", URL must contain owner name followed by project name. When "Go" button is pressed, to the given url "/issues" is added and then calls the restapi "localhost:3000/issuesDetails" POST method running in node server.

REST api /issuesDetails will parse the json body and gets github url. By using http request method github url is called and html page is fetched by cheerio module. Then by traversing the DOM of web page to get the details.

In the web page, Class "table-list-header-toggle" contains the total number of open issues. From jquery data from class is fetched and formatted from javascirpt to get total number of issues.

Once total number of issues are found, number of web pages  for storing the issues is calculated and each web page is requested. From each page, the time and date of issue opened  is found from the attribute "datetime" in  tag "time" and pushed in to the array.

Number of hours difference is calculated and Stored in the Json variable according to hour difference. Response is sent with JSON body which contains the open issues opened in a 24 hours, week and above one week. In the web page this response is parsed and displayed in the table.

#Requirements:
  -Node.js

#Node server set up Steps
  -downlaod the project zip file and unzip it.
  
  -run the command prompt and go to the project folder.
  
  -run the command "npm install"(required node modules will be downloaded)
  
  -"node ./bin/www" runs the server listening at the port 3000.
  
  -Home page(localhost:3000/home) can be called from browser.
  

#Improvement
  - UI would have been made better.
  - Given solution takes some time to fetch details if more issues are there. I would have tried to minimize that time     if more time was there.

#Application URL
  https://rocky-ocean-1593.herokuapp.com/home

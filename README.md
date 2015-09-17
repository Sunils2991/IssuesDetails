# IssuesDetails

IssueDetails is an application used to know the total number of open issues and number of issues opened today, within a week and above one week  in the github project.

This application is written in Node.js, html and angular.js. Web pages are written in html and angular.js and server is node.js.

UI will have a search option where user can give github project url and "Go" button to search. Example for searching url: "https://github.com/Shippable/support", URL must contain owner name followed by project name. When "Go" button is pressed, to the given url "/issues" is added and then calls the restapi "localhost:3000/scrape" POST method running in node server.

Restapi /scrape will parse the json body and gets github url. By using http request method github url is called and html page is fetched by cheerio module. Then by traversing the DOM of web page to get the details.

In the web page, Class "table-list-header-toggle" contains the total number of open issues. From jquery data from class is fetched and formatted from javascirpt to get total number of issues.

Once total number of issues are found, number of web pages  for storing the issues is calculated and each web page is requested. From each page the date of issue opened from all issues is found from the class "issue-meta" and pushed in to the array.

Number of days difference is calculated and Stored in the Json variable according to day difference. Response is sent with JSON body which contains the open issues opened in a day, week and above one week. In the web page this response is parsed and displayed in the table.
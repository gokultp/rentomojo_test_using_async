# rentomojo_test_using_async
A scraper for scraping https://medium.com


Here I have async queue  in async library and each of the requests are executing as a job.

We can set a maximum cuncurrency value for the job, and only that much jobs will be running in parallel at a time.

Have used an npm module called html-to-json for parsing links from htmlString.

for running the code run 
    `npm install`
    `npm start`

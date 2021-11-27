let http = require("http"); // Import http module
let fs = require("fs"); // Import fs module
let logFile = fs.createWriteStream("log.txt", { flags: "a" }); //create log file
let date; // Create a variable for timestamp

// Declare a function to log requests into the log.txt
function log(url) {
  date = new Date().toTimeString(); // Get time and convert it to a string before writing it into the log.txt
  if (url === "/" || url === "/home") url = "/homepage"; // all three of them return /homepage
  logFile.write(`${date} ----> ${url}\n`); // Write date and url into the log.txt
}

let server = http.createServer(function (req, res) {
  // Create web server

  switch (
    req.url // Where is the user trying to access?
  ) {
    case "/":
    case "/homepage":
    case "/home": // if it is the homepage then;
      log(req.url);
      res.write("<html><body><p>Now you are on the Homepage</p></body></html>");
      res.end();
      break;
    case "/aboutus": // if it is the aboutus page
      log(req.url);
      res.write("<html><body><p>About Us!</p></body></html>");
      res.end();
      break;
    case "/contact": // if it is the contact page
      log(req.url);
      res.write("<html><body><p>Contact Us:</p></body></html>");
      res.end();
      break;
    case "/settings": // if it is the settings page
      log(req.url);
      res.write("<html><body><p>Page Settings:</p></body></html>");
      res.end();
      break;
    default:
      // everything else goes for 404
      if (req.url !== "/favicon.ico") {
        // Except for favicon.ico. For some reason it is requested all the time
        log(req.url + " (unknown_url)");
      }
      res.write("<html><body><p>404 Page can not be found!</p></body></html>");
      res.end();
  }
});

server.listen(8000); // listen for requests

console.log("Web server is running at port 8000.");

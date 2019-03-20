let index = 0;
var links = [];//['https://www.youtube.com/watch?v=M-P4QBt-FWw', 'https://www.youtube.com/watch?v=7wtfhZwyrcc']
//let link = links[index];
let len = links.length;

chrome.runtime.onInstalled.addListener(function() {
  /*  
    link = links[index];
    chrome.storage.sync.set({link: link}, function() {
      console.log("The link is stored");
    });
  */

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            //pageUrl: {hostEquals: 'developer.chrome.com'},
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
      });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      console.log("background.js got a message")
      //console.log(request);
      console.log(sender);

      // get correct list
      chrome.storage.local.get({key:[]}, function(data) {
        
        //debug
        console.log("data ");
        console.log(data.key);
        //!debug

        // update links
        links = data.key;

        //debug
        console.log(links);
        console.log(request);
        console.log("index = " + index);
        //!debug

        if(request == "reset") {            // Reset the index
          index = 0;
        }
        else if(request == "ended" && links[index] == sender.url) {   // Play next video
          if(links.length < index) {
            index = links.length-2;
          }
          let id = sender.tab.id;
          chrome.tabs.remove(id);
          console.log(links);
          index = (index + 1)%(Math.max(links.length,1));
          console.log("index = " + index);
          let gotolink = links[index];
          chrome.tabs.create({active : false, url : gotolink});
        }
        
        else if(request.match("addList") != null) {
          /*
          console.log(request);
          //console.log(sender);
          let value = request.substring(8);
          console.log("link = " + value);
          links.push(value);
          */
          //chrome.storage.local.get({'key':[]}, function(data){
           //   link = data.key;
          //})
        }
        
        else if(request.match("removeList") != null) {
          /*
          console.log(request);
          console.log(sender);
          let value = request.substring(11);
          let ind = links.indexOf(value);
          if(ind > -1) {
            if(ind == index) index = index - 1;
            links.splice(ind,1);
          }
          */
           // chrome.storage.local.get({'key':[]}, function(data){
           // link = data.key;
          //})
        }
      })
      //let link = sender.url + "/";
     //else {
       //index = 0;
     //}
     return Promise.resolve("Dummy response to keep the console quiet");
  }
);


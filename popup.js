//alert("popup called");
//<reference path="~/Desktop/Personal Stuff/JavaScript" ></reference>

//chrome.storage.local.clear();

// global variables
var links = [];//['https://www.youtube.com/watch?v=M-P4QBt-FWw', 'https://www.youtube.com/watch?v=7wtfhZwyrcc']
//getUrlListAndRestoreInDom();
//var bkg = chrome.extension.getBackgroundPage();
var map = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log("dom called");
    chrome.storage.local.get({mapkey:[]}, function(data) {
        map = data.mapkey;
        console.log(map);
        getUrlListAndRestoreInDom();
    })
});

function getUrlListAndRestoreInDom(){
    chrome.storage.local.get({key:[]},function(data){
        console.log(data);
        links = data.key;
        console.log("links = ");
        //alert(links);
        let index = 0;
        links.forEach(function(link){
            //alert('lnk = ' + link);
            addUrlToDom(link, index);
            index = index + 1;
        });
    });
}

function addUrlToDom(link, index) {
   
   // Extract the title of video
   // = loadInfo(link);
  //s $.get({async:false,url:"https://www.youtube.com/oembed?url=" + link + "&format=json"}, function(data, status, xhr){
   // console.log("sucess = " + status);    
   // console.log("data = " + data);
        let title = map[index];
        /*
        if(status.match("success")) {
            console.log("hurrah!");
            console.log(data.title);
            title = data.title;
        }
        else {
            title = status;
        }
        */
        console.log("title = ")
        console.log(title);
        // Replace link with title if you wanna title in list view
        var ol = document.getElementById("dynamic-list");
        var li = document.createElement("li");
        li.setAttribute('id',link);
        //li.setAttribute('value', title);
        //map[title] = link;
        li.appendChild(document.createTextNode(title));

        // Add delete button
        var btn = document.createElement("button");
        btn.innerHTML = 'Delete';
        li.appendChild(btn);
        btn.addEventListener("click", function(e){
            let value = this.parentNode.id;
            //DEBUG
            //alert(value);
            //!DEBUG
            let ind = links.indexOf(value);
            if(ind != -1) {
                links.splice(ind,1);
                map.splice(ind,1);
                chrome.storage.local.set({key:links});
                chrome.storage.local.set({mapkey:map});
                chrome.runtime.sendMessage("removeList");
            }
            this.parentNode.parentNode.removeChild(this.parentNode);
        })

        //alert("Adding " + link);
        ol.appendChild(li);
        //links.push(link);
        //chrome.storage.local.set({key:links});
        //chrome.runtime.sendMessage(
        //    "addList " + candidate.value
        //);
   // } /*, "json"*/);
   //alert(title);
}

let playbtn = document.getElementById('goto');
var gotolink;

playbtn.onclick = function(event) {
    if(links.length > 0) {
        gotolink = links[0] + "|?&autoplay=1";
        console.log("goto " + gotolink);
        chrome.tabs.create({active : false, url : gotolink});
        chrome.runtime.sendMessage(
            "reset"
        );
    }
}

document.addEventListener('DOMContentLoaded', function(){
    var addlink = document.getElementById('addlist');
    addlink.addEventListener('click', function() {
        var ol = document.getElementById("dynamic-list");
        var candidate = document.getElementById("candidate");
        var link = candidate.value;
        $.get("https://www.youtube.com/oembed?url=" + link + "&format=json", function(data, status, xhr){
        let title;
        if(status == "success") {
            title = data.title;
        }
        else {
            title = "Cannot fetch title";
        }
        let ind = links.indexOf(candidate.value);
        if(ind == -1 && candidate.value != "") {
            var li = document.createElement("li");
            li.setAttribute('id',candidate.value);
            li.appendChild(document.createTextNode(title));
            //chrome.extension.getBackgroundPage();
            // Add delete button
            var btn = document.createElement("button");
            btn.innerHTML = 'Delete';
            li.appendChild(btn);
            btn.addEventListener("click", function(e){
                let value = this.parentNode.id;
                console.log(value);
                let ind = links.indexOf(value);
                if(ind != -1) {
                    links.splice(ind,1);
                    map.splice(ind,1);
                    chrome.storage.local.set({key:links});
                    chrome.storage.local.set({mapkey:map});
                    chrome.runtime.sendMessage("removeList " + value);
                }
                this.parentNode.parentNode.removeChild(this.parentNode);
            })

            ol.appendChild(li);
            links.push(candidate.value);
            map.push(title);
            chrome.storage.local.set({key:links});
            chrome.storage.local.set({mapkey:map});
            chrome.runtime.sendMessage(
                "addList " + candidate.value
            );
            candidate.value="";
        }
    });
    })
})

/*
document.addEventListener('DOMContentLoaded', function(){
    var link = document.getElementById('removelist');
    link.addEventListener('click', function() {
        var ol = document.getElementById("dynamic-list");
        var candidate = document.getElementById("candidate");
        var item = document.getElementById(candidate.value);
        if(item) {
            ol.removeChild(item);
            chrome.runtime.sendMessage(
                "removeList " + candidate.value
            );
            let ind = links.indexOf(candidate.value);
            if(ind != -1) {
                links.splice(ind,1);
            }
            chrome.storage.local.set({key:links});
        }
    })
})
*/
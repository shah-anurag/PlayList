//alert("popup called");
//<reference path="~/Desktop/Personal Stuff/JavaScript" ></reference>

//chrome.storage.local.clear();

// global variables
var links = [];//['https://www.youtube.com/watch?v=M-P4QBt-FWw', 'https://www.youtube.com/watch?v=7wtfhZwyrcc']
//getUrlListAndRestoreInDom();
var bkg = chrome.extension.getBackgroundPage();
document.addEventListener('DOMContentLoaded', function() {
    console.log("dom called");
    getUrlListAndRestoreInDom();
});

function getUrlListAndRestoreInDom(){
    chrome.storage.local.get({key:[]},function(data){
        console.log(data);
        links = data.key;
        console.log("links = ");
        //alert(links);
        links.forEach(function(link){
            //alert('lnk = ' + link);
            addUrlToDom(link);
        });
    });
}

function addUrlToDom(link) {
   /*
   // Extract the title of video
   $content = file_get_contents("http://youtube.com/get_video_info?video_id=".$id);
   parse_str($content, $ytarr);
   let title = $ytarr['title'];
   console.log("title = " + title);
    */

   // Replace link with title if you wanna title in list view
    var ul = document.getElementById("dynamic-list");
    var li = document.createElement("li");
    li.setAttribute('id',link);
    li.appendChild(document.createTextNode(link));

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
            chrome.storage.local.set({key:links});
            chrome.runtime.sendMessage("removeList");
        }
        this.parentNode.parentNode.removeChild(this.parentNode);
    })

    //alert("Adding " + link);
    ul.appendChild(li);
    //links.push(link);
    //chrome.storage.local.set({key:links});
    //chrome.runtime.sendMessage(
    //    "addList " + candidate.value
    //);
}

let playbtn = document.getElementById('goto');
var gotolink;

playbtn.onclick = function(event) {
    if(links.length > 0) {
        gotolink = links[0];
        console.log("goto " + gotolink);
        chrome.tabs.create({active : false, url : gotolink});
        chrome.runtime.sendMessage(
            "reset"
        );
    }
}

document.addEventListener('DOMContentLoaded', function(){
    var link = document.getElementById('addlist');
    link.addEventListener('click', function() {
        var ul = document.getElementById("dynamic-list");
        var candidate = document.getElementById("candidate");
        let ind = links.indexOf(candidate.value);
        if(ind == -1 && candidate.value != "") {
            var li = document.createElement("li");
            li.setAttribute('id',candidate.value);
            li.appendChild(document.createTextNode(candidate.value));
            
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
                    chrome.storage.local.set({key:links});
                    chrome.runtime.sendMessage("removeList " + value);
                }
                this.parentNode.parentNode.removeChild(this.parentNode);
            })

            ul.appendChild(li);
            links.push(candidate.value);
            chrome.storage.local.set({key:links});
            chrome.runtime.sendMessage(
                "addList " + candidate.value
            );
        }
    })
})

/*
document.addEventListener('DOMContentLoaded', function(){
    var link = document.getElementById('removelist');
    link.addEventListener('click', function() {
        var ul = document.getElementById("dynamic-list");
        var candidate = document.getElementById("candidate");
        var item = document.getElementById(candidate.value);
        if(item) {
            ul.removeChild(item);
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
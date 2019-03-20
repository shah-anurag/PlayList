var links = [];//['https://www.youtube.com/watch?v=M-P4QBt-FWw', 'https://www.youtube.com/watch?v=7wtfhZwyrcc'];
//chrome.storage.local.clear();
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
            ul.appendChild(li);
            links.push(candidate.value);
            chrome.storage.local.set({key:links});
            chrome.runtime.sendMessage(
                "addList " + candidate.value
            );
        }
    })
})

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
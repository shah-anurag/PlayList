//alert('Hello');
//$('video').get(0).pause();
//document.body.style.background = 'yellow';
//document.getElementsByClassName('ytp-play-button')[0].click();
//$("#player-api .html5-video-controls .ytp-button-pause").trigger("click");
//document.getElementsByName("video")[0].click();
console.log("Hello from content script!");
var video = document.getElementsByTagName("video")[0];
if(video) {
  video.addEventListener("ended", function() {
    console.log("Video ended");
    //alert('Ended');
    chrome.runtime.sendMessage(
        "ended"
    );
  })
} else {
  //console.error("Video element not found");
}
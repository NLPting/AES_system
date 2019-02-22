last = "";
spanned = true;
//api = "http://writeahead.nlpweb.org/"
API_URL = "http://thor.nlplab.cc:7779/write_call"

function _showHint(str, hover) {
  if (str.length == 0) {
    str = last
    } else {
    last = str = str.replace(/(\s+)|(&nbsp;)/g," ");
    }

    if (hover != undefined) {
      var query="add?text=" + str + "&hover="+hover;
      } else {
      var query="add?text=" + str;
    }

    $.ajax({
      type: "POST",
      url: API_URL,
      data: query,
      dataType: 'text',
      success: function (data) {
        $("#entries")[0].innerHTML=data;
          //console.log(data)
      }, 
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
          
          console.log("Status: " + textStatus); 
          console.log("Error: " + errorThrown); 
      } 
  })

  
}





$( "#write-aes" ).on("keyup", function(e){

  if($("#write-aes")[0].innerText == "\n") {
    $("#write-aes")[0].innerHTML = "";
    }
  str = searchText();
  if (!(str.length==0 || str == last)) {
    spanned = false;
    showHint();
  }

});

$( "#write-aes" ).mousemove(function(e) {
  if (!spanned && $("#write-aes").text().length > 0) {
    spanText(e);
  }
});

function spanText(event) {
  spanned = true;
  var str = searchText()
  if (str.slice(-1) == '\n') {
  str = str.substring(0, str.length - 1)
  }
  $("#write-aes")[0].innerHTML = "<span>" + str.replace(/[\xa0 ]*\n/g," <br>").split(/[\xa0\ ]/g).join("</span><span>&nbsp;") + "</span>";
  setCaretLast();
  $("#write-aes span").mouseenter(onHover);
}



function onHover(e) {
  node = e.currentTarget;
  showHint(getIndex(node));
}

function showHint(hover) {
  _showHint(searchText(), hover);
}


function getIndex(node) {
  i = 0;
  while( (node = node.previousSibling) != null ) i++;
  return i
}

function searchText() {
  if ($("#write-aes")[0].innerText == undefined) {
  return $("#write-aes")[0].innerHTML.replace(/<br>/gi,"\n").replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g," ");
  } else {
  return $("#write-aes")[0].innerText;
  }
}


function setCaretLast() {
  var el = $("#write-aes")[0]
  var range = document.createRange();
  var sel = window.getSelection();
  range.setStartAfter(el.childNodes[el.childNodes.length-1]);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  el.focus();
}






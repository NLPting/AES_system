
last = "";
spanned = true;
api = "http://writeahead.nlpweb.org/"
function _showHint(str, hover) {
    if (str.length == 0) {
    str = last
    } else {
    last = str = str.replace(/(\s+)|(&nbsp;)/g," ");
    }
    xmlHttp=new XMLHttpRequest();
    if (hover != undefined) {
    var url=api+"add?text=" + str + "&hover="+hover;
    } else {
    var url=api+"add?text=" + str;
    }
    
    if ($.cookie("corp")!=undefined)
        url = url + '&corp=' + $.cookie("corp");
    
    

    xmlHttp.open("GET",url,true);
    xmlHttp.send();
    xmlHttp.onreadystatechange=function() {
    if(xmlHttp.readyState==4) {
        $("#entries")[0].innerHTML=xmlHttp.responseText;
        console.log(xmlHttp.responseText)
    }
    }
}
function searchText() {
    if ($("#search")[0].innerText == undefined) {
    return $("#search")[0].innerHTML.replace(/<br>/gi,"\n").replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g," ");
    } else {
    return $("#search")[0].innerText;
    }
}
function showHint(hover) {
    _showHint(searchText(), hover);
}
function threeOrMore(tag) {
    if ($.cookie(tag) == "false") {
    $.cookie(tag, "true");
    } else {
    $.cookie(tag, "false");
    }
    showHint();
}
function changeLang(lang) {
    $.cookie("lang", lang);
    showHint();
}
function changeCorp(corp) {
    $.cookie("corp", corp);
    $(".nav li a").each(function() {
    if ($(this).attr('title') == corp) {
        $(this).addClass('sel');
    } else {
        $(this).removeClass('sel');
    }
    });
    if (last.length!=0) {
    showHint();
    }
}
function getIndex(node) {
    i = 0;
    while( (node = node.previousSibling) != null ) i++;
    return i
}
function spanText(event) {
    spanned = true;
    var str = searchText()
    if (str.slice(-1) == '\n') {
    str = str.substring(0, str.length - 1)
    }
    $("#search")[0].innerHTML = "<span class='atsign'>" + str.replace(/[\xa0 ]*\n/g," <br>").split(/[\xa0\ ]/g).join("</span><span>&nbsp;") + "</span>";
    setCaretLast();
    $("#search span").mouseenter(onHover);
}
function setCaretLast() {
    var el = $("#search")[0]
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStartAfter(el.childNodes[el.childNodes.length-1]);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
}
function onHover(e) {
    node = e.currentTarget;
    showHint(getIndex(node));
}
function onKey(e) {
    if($("#search")[0].innerText == "\n") {
    $("#search")[0].innerHTML = "";
    }
    str = searchText();
    if (!(str.length==0 || str == last)) {
    spanned = false;
    showHint();
    }
}


function onMouse(e) {
    if (!spanned && $("#search").text().length > 0) {
    spanText(e);
    }
}
function patternType(to, fr) {
    $(fr).removeClass('hdtb_msel');
    $(to).addClass('hdtb_msel');
    $(fr+"_block").css("display",'none')
    $(to+"_block").css("display",'block')
    $.cookie("sgp", fr=="#gp");
}
  
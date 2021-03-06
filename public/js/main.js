const send = $("#send");
const aes_content = $("#write-aes");
var word_number = 0;
$('#score-feeback').hide();
$("#try-aes").hide()
document.getElementById('send-aes').disabled=true;
document.getElementById('try-aes').disabled=true;


API_URL = "http://thor.nlplab.cc:7777/aes"
API_URL_d = "http://thor.nlplab.cc:7777/aes_dect"
API_URL_d_sen = "http://thor.nlplab.cc:7777/dect_sen"







function score_it_post(query){
    
    $.ajax({
        type: "POST",
        url: API_URL,
        data: JSON.stringify({courpus: query}),
        dataType: 'json',
        success: function (data) {
            cerf_show(data)
        }, 
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            
            console.log("Status: " + textStatus); 
            console.log("Error: " + errorThrown); 
        } 
    })
}

function dect_it_post(query){
    
    $.ajax({
        type: "POST",
        url: API_URL_d,
        data: JSON.stringify({courpus: query}),
        dataType: 'json',
        success: function (data) {
            revise_content(data.sen_arry , data.score_arry)
            console.log(data)
        }, 
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            
            console.log("Status: " + textStatus); 
            console.log("Error: " + errorThrown); 
        } 
    })
}


function sen_dect(query){
    
    $.ajax({
        type: "POST",
        url: API_URL_d_sen,
        data: JSON.stringify({courpus: query}),
        dataType: 'json',
        success: function (data) {
            revise_sentence(data.sen_arry , data.tag_arry)
            console.log(data)
        }, 
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            
            console.log("Status: " + textStatus); 
            console.log("Error: " + errorThrown); 
        } 
    })
}

function revise_content(data , score){
    var content = ''
    for(i=0;i<data.length;i++){
        s = data[i].join(' ').replace(' ,',',').replace(' .','.').replace(' ?','?')
        
        grade = score[i]
        if (grade > 0.0 && grade < 0.15){
            content += '<span class="sen-notok"'+'id='+i +'>'+' '+s+'</span>'
        }
        else if(grade >= 0.15){
            content += '<span class="sen-bad"'+'id='+i+'>'+' '+s+'</span>'
        }
        else {
            content += ' '+s
        }
        
    }
    document.getElementById('feedback-dectect').innerHTML =content;
    $('#feedback-dectect').show();
}





function cerf_show(data){
    document.getElementById("cerf-leve").innerHTML = data['cerf'];
    document.getElementById("cerf-score").innerHTML = data['score'];
    document.getElementById("score-bar").innerHTML = data['score']+'%';
    $('#score-bar').outerWidth(data['score']+'%')
    

    if (data['cerf'] == 'A1'){
        
        $('#a2').css("background-color",'#e9ecef');
        $('#b1').css("background-color",'#e9ecef');
        $('#b2').css("background-color",'#e9ecef');
        $('#c1').css("background-color",'#e9ecef');
        $('#c2').css("background-color",'#e9ecef');

    }
    else if(data['cerf'] == 'A2'){
        
        $('#b1').css("background-color",'#e9ecef');
        $('#b2').css("background-color",'#e9ecef');
        $('#c1').css("background-color",'#e9ecef');
        $('#c2').css("background-color",'#e9ecef');
    
    }
    else if(data['cerf'] == 'B1'){
        
        $('#b2').css("background-color",'#e9ecef');
        $('#c1').css("background-color",'#e9ecef');
        $('#c2').css("background-color",'#e9ecef');
    }
    else if(data['cerf'] == 'B2'){
        
        $('#c1').css("background-color",'#e9ecef');
        $('#c2').css("background-color",'#e9ecef');

    }
    else if(data['cerf'] == 'C1'){
        $('#c2').css("background-color",'#e9ecef');
    }
    $('#score-feeback').show();

}

function applyHighlights(text) {
    return text
        .replace(/\n$/g, '\n\n')
        .replace(/[A-Z].*?\b/g, '<mark>$&</mark>');
}

$("#send-aes").click(function(){
    var sentence = aes_content.val()
    
    

    $('#a1').css("background-color",'#17a2b8');
    $('#a2').css("background-color",'#17a2b8');
    $('#b1').css("background-color",'#17a2b8');
    $('#b2').css("background-color",'#17a2b8');
    $('#c1').css("background-color",'#17a2b8');
    $('#c2').css("background-color",'#17a2b8');
    setTimeout(function() {
    score_it_post(sentence);
    dect_it_post(sentence);
    },2000)
    $("#send-aes").hide()
    $("#try-aes").show()
})

$("#try-aes").click(function(){
    

    $("#try-aes").hide()
    $('#score-feeback').hide();
    $('#feedback-dectect').hide();
    $('#suggest-info').hide();

    $('#a1').css("background-color",'#17a2b8');
    $('#a2').css("background-color",'#17a2b8');
    $('#b1').css("background-color",'#17a2b8');
    $('#b2').css("background-color",'#17a2b8');
    $('#c1').css("background-color",'#17a2b8');
    $('#c2').css("background-color",'#17a2b8');
    
    setTimeout(function() {
    var sentence = aes_content.val()
    score_it_post(sentence);
    dect_it_post(sentence);
    } , 2000)
    $("#send-aes").show()

})

$( "#write-aes" ).on("keyup", function(e){
    //console.log($("#mes").val());
    word_number = countWords(aes_content.val())
    document.getElementById("word_count").innerHTML =word_number+' ';
    if (word_number>=5){
        document.getElementById('send-aes').disabled=false;
    }else{document.getElementById('send-aes').disabled=true;}
    if (word_number>=5){
        document.getElementById('try-aes').disabled=false;
    }else{document.getElementById('try-aes').disabled=true;}
  });

function countWords(s){
	s = s.replace(/(^\s*)|(\s*$)/gi,"");
	s = s.replace(/[ ]{2,}/gi," ");
	s = s.replace(/\n /,"\n");
    return s.split(' ').length
}



$(document).on('click','.sen-notok',function(){
    $('.linggle.search-result').hide()
    $('#suggest-info').show();
    //$('.linggle.search-result').show()
    // code here
    //var tag = $('.sen-notok').html();
    document.getElementById('suggest-info').innerHTML = ''
    console.log($(this))
    look_data = $(this).text()
    //document.getElementById('suggest-info').innerHTML =look_data;
    sen_dect(look_data)

});

$(document).on('click','.sen-bad',function(){
    $('.linggle.search-result').hide()
    // code here
    //var tag = $('.sen-notok').html();
    document.getElementById('suggest-info').innerHTML = ''
    //$('.linggle.search-result').show()
    console.log($(this))
    look_data = $(this).text()
    //document.getElementById('suggest-info').innerHTML =look_data;
    sen_dect(look_data)

});

$(document).on('click','.B-R',function(){
    
    $('.linggle.search-result').hide()
    index = $(this).attr('id')
    console.log(sen , tag)
    var query = ''
    var tmp = []
    index_arry = [parseInt(index)-1 , parseInt(index) , parseInt(index)+1]
    console.log(index_arry)
    
    for(i=0;i<index_arry.length;i++){
        if (index_arry[i] > 0 && index_arry[i] < tag.length+1){
            tmp.push(index_arry[i])
        }
    }
    for(i=0;i<tmp.length;i++){
        console.log(sen[5])
        if (tmp[i] == index){
            query+='_ '
        }else{
            query+= sen[[tmp[i]]]+' '
        }
    }
    linggle_it_post(query)

});

$(document).on('click','.B-II',function(){
    
    $('.linggle.search-result').hide()
    index = $(this).attr('id')
    console.log(sen , tag)
    var query = ''
    var tmp = []
    index_arry = [parseInt(index)-1 , parseInt(index) , parseInt(index)+1,parseInt(index)+2]
    console.log(index_arry)
    
    for(i=0;i<index_arry.length;i++){
        if (index_arry[i] > 0 && index_arry[i] < tag.length+1){
            tmp.push(index_arry[i])
        }
    }
    for(i=0;i<tmp.length;i++){
        console.log(sen[5])
        if (tmp[i] == index){
            query+='_ '+ sen[[tmp[i]]]+' '
        }else{
            query+= sen[[tmp[i]]]+' '
        }
    }
    linggle_it_post(query)

});




var sen = [];
var tag = [];
function revise_sentence(data , tag_token){
    sen = data[0]
    tag = tag_token[0]
    var content = '<div>'
    for(i=0;i<sen.length;i++){
        
        if (tag[i] == 'O'){
            content += ' '+sen[i]
        }
        else if(tag[i] == 'B-I'){
            //add = '<button type="button" class="btn btn-warning" id="B-I">Insert</button>'
            add = ' '+'<span class="B-II"'+'id='+i+'>'+'Insert Word '+'</span>'
            content += add + sen[i]
            //content += ' '+add+sen[i]+'</span>'
        }
        else if (tag[i]=='B-R') {
          //replace = '<button type="button" class="btn btn-success" id="B-R">Replace</button>'
            content += ' '+'<span class="B-R"'+'id='+i+'>'+sen[i]+'</span>'
        }
        else if (tag[i]=='B-D') {
            content += ' '+'<span class="B-D"'+'id='+i+'>'+sen[i]+'</span>'
        }
    }
    content+='</div>'
    console.log(content)
    
    document.getElementById('suggest-info').innerHTML =content.replace(' ,',',').replace(' .','.');
    
}





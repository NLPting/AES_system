
API_URL_linggle = 'http://thor.nlplab.cc:7777/linggle_call'


$('.linggle.search-result').hide();

function linggle_it_post(query){
    
    $.ajax({
        type: "POST",
        url: API_URL_linggle,
        data: query,
        dataType: 'json',
        success: function (data) {
            console.log(data)
            $('.linggle.search-result').show()
            search_sucess(data)
        }, 
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            
            console.log("Status: " + textStatus); 
            console.log("Error: " + errorThrown); 
        } 
    })
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function search_sucess(data){
    console.log(data.ngrams)
    if (data.ngrams.length > 0) {
        $('.linggle.search-result tbody').html(data.ngrams.map(function(ngramData) {
            var ngram = ngramData[0];
            var count = ngramData[1];
            var percent = Math.round(count/data.total * 1000) / 10;
            return renderNgramRowHtml(ngram, count, percent);
          }).join(''));
    }else {
        $('.linggle.search-result tbody').html('<tr><td colspan=4>No result</td></tr>');
    }
}
function renderNgramRowHtml(ngram, count, percent) {
    var countStr = numberWithCommas(count)
    var ngramIdstr = ngram.replace(/\ /g , '_');
    // TODO: template literals is in ES6, which is not compatible with IE11
    return `<tr>
      <td class="ngram">${ngram}
        <div class="progress">
          <div class="progress-bar" role="progressbar" style="width: ${percent}%;">
        </div>
      </td>
      <td class="percent text-right">${percent} &percnt;</td>
      <td class="count text-right">${countStr}</td>
    </tr>
    `;
  }
  
const board_number = window.location.pathname.split('/board/')[1]

$.ajax({
    "url": `/api/v1/boards/board/${board_number}`,
    "method": "GET",
    "timeout": 0,
}).done(function (board) {
    console.log(board);
    $('#author').text(board.author === null ? 'anonymous' : board.author.username);
    $('#title').val(board.title);
    $('#contents').val(board.contents);
    $('#loaded_file').attr('src', board.image_link);
    $('#created_at').val(board.created_at);
    $('#modified_at').val(board.modified_at);
    if (board.image_link !== ''){
        $('#board-image-converter').append(`
        <div id="convert-checkbox">
            <input type="checkbox" id="lang" name="lang" value="kor">kor
            <input type="checkbox" id="lang" name="lang" value="eng">eng
            <input type="checkbox" id="lang" name="lang" value="fra">fra
            <input type="checkbox" id="lang" name="lang" value="jpn">jpn
            <button id="bnt">이미지 변환</button>
        </div>
        `)
    }
});

$(document).ready(function() {
    $('#bnt').click(function(event) {
        event.preventDefault();
        var pk = "{{ board.pk }}";
        
        // 체크된 언어 체크박스 가져오기
        var lang = [];
        $('input[name="lang"]:checked').each(function(){
            lang.push($(this).attr('value'));
        });

        // Ajax POST 요청 보내기
        $.ajax({
            type: "POST",
            url: "api/v1/boards/text/<int:pk>/<str:lang>",
            data: {
                csrfmiddlewaretoken: "{{ csrf_token }}",
                lang:lang
            },
            success: function(result){
                console.log(result);
            },
            error: function(request,status,error){
                console.log(error);
            }
        });
    });
});
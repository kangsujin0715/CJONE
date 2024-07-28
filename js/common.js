$(document).ready(function() {
	selectBox();
    popupClose();
    click();
    dropdownMenu();
    datePickerStart();
    buttonGroup();

    $(document).on('click', '.btn-open-modal', function(){
        var _targetModal = $(this).attr('data-target');
        $(_targetModal).addClass('on');
        $(_targetModal).find('.top .close-btn').on('click', ((e) => {
            $(e.currentTarget).closest('.popup').removeClass('on');
        }));
    });

    // html 파일 확인용도 - 개발팀 요청으로 주석처리 2024.07.11
    // funcSwitch($('.switch-box'));
    // $(document).on('click', '.switch-box', function(){
    //     funcSwitch($(this));
    // });

    $(document).find('textarea').each((index, item) => {
        var textareaHeight = $(item).attr('rows') * 20 + 20;
        $(item).css('height', textareaHeight + 'px');
    });

    /* file input */
    $(document).on('change', '.file-box input[type="file"]', function(e){
        var _fileName = e.target.files[0].name;
        var _parent = $(this).closest('.file-box');

        // 다중 선택
        if($(this).attr('multiple')){
            _parent.addClass("multiple");
            _parent.find(".upload-file-name").append(`<div class="file-label"><span>${_fileName}</span><button type="button" class="icon b-close"><span class="text-hide">삭제</span></button> </div>`);
        }else{
            _parent.removeClass("multiple");
            _parent.find(".upload-file-name").html(`<span>${_fileName}</span>`);
        }

        if(_fileName){
            _parent.addClass("on");
        }else{
            _parent.removeClass("on");
        }

        _parent.find('.file-label button.b-close').on('click', function(){
            $(this).closest('.file-label').remove();
        });
    })
});

function funcSwitch(elm){
    var _checked = elm.find('input[type="checkbox"]').is(':checked');
    var _disabled = elm.find('input[type="checkbox"]').is(':disabled');
    if(!_disabled && _checked){
        elm.find('input[type="checkbox"]').prop('checked', false);
        elm.addClass('on');
    }else{
        elm.find('input[type="checkbox"]').prop('checked', true);
        elm.removeClass('on');
    }
}

function selectBox(){

    let _select = $('select');
    for(var i = 0; i < $('select').length + 1; i++){

        let _multi = $(_select[i]).attr('multiple')

        if(_multi) {
            $(_select[i]).filterMultiSelect({
                selectAllText : '전체선택',
                filterText: '검색어 입력',
                selectionLimit:5,
            });
        }
        else if(!_multi) {
            $(_select[i]).niceSelect();
        }
    }
}

function popupClose(){
    $(".close-btn").click(function () {
        $("body").removeClass("off");
        $(".popup").removeClass("on");
    });
}

function click(){
    $(".tab-box .item").click(function () {
        $(".tab-box .item").removeClass("click");
        $(this).addClass("click");
    });
}


function dropdownMenu(){
    $('.dropdown-box button').on('click', ((e)=>{
        const _check = $(e.currentTarget).next('.dropdown-list').hasClass('on')

        if(_check){
            $(e.currentTarget).next('.dropdown-list').removeClass('on')

        }else if(!_check){
            $('.dropdown-list').removeClass('on');
            $(e.currentTarget).next('.dropdown-list').addClass('on')
        }
    }))

    $(document).on('click', ((e)=>{
        if(!$(e.target).closest('.dropdown-box button').length){
            $('.dropdown-list').removeClass('on')
        }
    }))
}
function datePickerStart(){
    let _datePicker = $('input[date-picker]')
    for (var i = 0; i < _datePicker.length; i++){

        let _multi = $(_datePicker[i]).attr('multiple')

        if(_multi) {
            return;
        }else if(!_multi){
            $(_datePicker[i]).datepicker({
                dateFormat : "yy-mm-dd",
                showButtonPanel: true,
            });
        }
    }
    $('[date-picker]').datepicker();
}

function buttonGroup(){
    $(document).on('click', '.btn-group', function () {
        var _this = $(this);
        var _parent = $(this).closest('.btn-group-box');
        var _thisCurrent = _this.find('.current');
        _parent.addClass('open');
        _this.addClass("open");
        _parent.find('.list button').on('click', function(e){
            e.preventDefault();
            var _text = $(this).text();
            _thisCurrent.text(_text);
            _parent.removeClass("open");
            _this.removeClass("open");
        });
    });

    // 외부 클릭시 창 닫기
    $(document).mouseup(function (e){
        if($(".btn-group, .btn-group-box").has(e.target).length === 0){
            $(".btn-group, .btn-group-box").removeClass("open");
        }
      });
    // 20240619 button group 퍼블리싱 추가
}
// loading
window.onload = function () {
  $(function () {

    // tooltips
    $('[data-toggle="tooltip"]').tooltip()

    // loader
    $('.loader').delay(200).fadeOut(500);

    // dropdown on click inside 
    $('.notifications .dropdown-menu').on("click.bs.dropdown", function (e) {
      e.stopPropagation();
      e.preventDefault();
    });

    // table users no img
    $('.no-img span').each(function () {
      $(this).text('kk');
    });

    // categories upload image
    $('#pro_img_btn').click(function () {
      $(this).toggleClass('mt-md-n1 mt-n5');
      $('#pro_img_upload').click();
      $('#pro_img_upload').removeAttr('hidden');
      $('#pro_img_upload').addClass('ml-md-5');
    })


    // file upload
    $('.btn-upload').click(function () {
      $(this).parent().find('.file-upload').click();
    });


    // Calendar
    $('.dataCalendar').datepicker({
      todayBtn: "linked",
      keyboardNavigation: false,
      forceParse: false,
      calendarWeeks: true,
      autoclose: true
    });

    // edit employee
    $('.edit_employee').click(function () {
      $('#job_title_edit').removeClass('d-none');
      $('#job_title').removeClass('d-flex');
      $('#job_title').addClass('d-none');
    })

    // delete table item
    $('#deleteItem').click(function () {
      var row = $(this).parent().parent().parent().parent().parent();
      row.attr('id', 'deleted');

      $('#deleteBtn').click(function () {
        $('tr#deleted').remove();
      })
    });

    // labs distribution popup
    $('#labsDistribution').click(function () {
      $(this).parent().toggleClass('show');
      $('#labsDropdown').toggleClass('show');

    });

    $('#labsSearch').on("input", function () {
      var value = $(this).val();

      $('#labsWrap .form-check-label').filter(function () {
        if ($(this).text().indexOf(value) >= 0) {
          $(this).parent().removeClass('d-none');
          $(this).parent().addClass('d-block');
        } else {
          $(this).parent().removeClass('d-block');
          $(this).parent().addClass('d-none');
        }
      })
    });

    var selectedLabs = [];
    $('#labsWrap .form-check-input').change(function () {
      $(this).each(function () {
        if ($(this).is(':checked')) {
          selectedLabs.push(($(this).next('.form-check-label')).text());
        } else {
          selectedLabs.splice(($(this).next('.form-check-label')).text(), 1);
        }
      })

      $("#selectedLabs").text(selectedLabs);
    })

    (jQuery);
  });
}

/*
$(function () {

  "use strict";

  var getDirection = $('body').css('direction');

  

  // top-search orders types buttons
  // $('.top-search .order-btn').click(function () {
  //   $('.top-search .order-btn').removeClass('active');
  //   $(this).addClass('active');
  // })

  // show and hidden password 
  var btnShowPassword = $('.btn-show-password'),
    myPasswordInput = $('.my-password-input');

  btnShowPassword.click(function () {
    var passwordElement = $(this).siblings(myPasswordInput);
    if (passwordElement.attr("type") == "password") {
      passwordElement.attr("type", "text");
      $(this).addClass('fa-eye-slash');
    } else {
      passwordElement.attr("type", "password");
      $(this).removeClass('fa-eye-slash');

    }
  });



  // datalist chevron on click
  $('.datalist .chevron-icon').click(function () {
    $(this).parent().toggleClass('show');
    $(this).parent().find('.dropdown-menu').toggleClass('show');
  })

  // Checkbox Toggler
  $(".toggler").on('change', function () {
    if ($(this).is(':checked')) {
      $(this).parents(".form__group").find(".form-control").prop('disabled', false);
    } else {
      $(this).parents(".form__group").find(".form-control").prop('disabled', true);
    }
  });

  


  // lightbox
  lightbox.option({
    'fadeDuration': 300,
    'showImageNumberLabel': false,
    "maxWidth": 800,
    "maxHeight": 600
  })

  

  // drag and drop table 
  $(".sortable").sortable();

  // show and hide add service 
  $('.add-service').click(function () {
    $('.add-service-group').slideDown()
  })
  $('.add-service-group .btn-primary,.add-service-group .btn-cancel').click(function () {
    $('.add-service-group').slideUp()
  })

  // show and hide add sub category 
  $('.add-sub-category').click(function () {
    $('.add-subcategory-group').slideDown()
  })
  $('.add-subcategory-group .btn-primary,.add-subcategory-group .btn-cancel').click(function () {
    $('.add-subcategory-group').slideUp()
  })

  // rating
  var appRate = 3;
  $('.live-rating').text(appRate);
  $(".app-rating").starRating({
    initialRating: appRate,
    disableAfterRate: true,
    starSize: 30,
    useGradient: false,
    emptyColor: 'transparent',
    hoverColor: '#FFC400',
    activeColor: '#FFC400',
    ratedColor: '#FFC400',
    strokeWidth: 10,
    strokeColor: '#FFC400',
    onHover: function (currentIndex, currentRating, $el) {
      $('.live-rating').text(currentIndex);
    },
    onLeave: function (currentIndex, currentRating, $el) {
      $('.live-rating').text(appRate);
    },
    callback: function (currentRating, $el) {
      $('.live-rating').text(currentRating);
      // make a server call here
    }
  });


});


// Read More
function readMore() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("more-btn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "اقرأ المزيد";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "اقرأ أقل";
    moreText.style.display = "inline";
  }
}


// Kanban
/*
var kanban = new jKanban({
  element: '#myKanban', // selector of the kanban container
  gutter: '15px', // gutter of the board
  widthBoard: '25%', // width of the board
  responsivePercentage: true, // if it is true I use percentage in the width of the boards and it is not necessary gutter and widthBoard
  dragItems: true, // if false, all items are not draggable
  boards: [{
      "id": "board-1", // id of the board
      "title": "حجوزات جديدة", // title of the board
      "class": "brd,brd-success,mb-3", // css classes to add at the title
      "dragTo": ['board-2', 'board-3', 'board-4'], // array of ids of boards where items can be dropped (default: [])
      "item": [{
          "id": "item-id-1",
          "title": "خدمة رقم 1",
          "date": "19 Feb. 2019",
          "class": ["mb-3"]
        },
        {
          "id": "item-id-2",
          "title": "خدمة رقم 2",
          "date": "19 Feb. 2019",
          "class": ["mb-3"]
        },
        {
          "id": "item-id-3",
          "title": "خدمة رقم 3",
          "date": "19 Feb. 2019",
          "class": ["mb-3"]
        },
        {
          "id": "item-id-4",
          "title": "خدمة رقم 4",
          "date": "19 Feb. 2019",
          "class": ["mb-3"]
        }
      ]
    },
    {
      "id": "board-2",
      "title": "تم تخصيص مقدم خدمة",
      "class": "brd,brd-warning,mb-3",
      "dragTo": ['board-1', 'board-3', 'board-4'],
      "item": [{
        "id": "item-id-5",
        "title": "خدمة رقم 5",
        "date": "19 Feb. 2019",
        "class": ["mb-3"]
      }]
    },
    {
      "id": "board-3",
      "title": "تم تعديل الموعد",
      "class": "brd,brd-primary,mb-3",
      "dragTo": ['board-21', 'board-2', 'board-4'],
      "item": [{
        "id": "item-id-6",
        "title": "خدمة رقم 6",
        "date": "19 Feb. 2019",
        "class": ["mb-3"]
      }]
    },
    {
      "id": "board-4",
      "title": "تم التنفيذ / مغلقة",
      "class": "brd,brd-secondary,mb-3",
      "dragTo": ['board-1', 'board-2', 'board-3'],
      "item": [{
        "id": "item-id-7",
        "title": "خدمة رقم 7",
        "date": "19 Feb. 2019",
        "class": ["mb-3"]
      }]
    }
  ], // json of boards
  dragBoards: true, // the boards are draggable, if false only item can be dragged
  addItemButton: false, // add a button to board for easy item creation
  buttonContent: '+', // text or html content of the board button
  itemHandleOptions: {
    enabled: false, // if board item handle is enabled or not
    handleClass: "item_handle", // css class for your custom item handle
    customCssHandler: "drag_handler", // when customHandler is undefined, jKanban will use this property to set main handler class
    customCssIconHandler: "drag_handler_icon", // when customHandler is undefined, jKanban will use this property to set main icon handler class. If you want, you can use font icon libraries here
    customHandler: "<span class='item_handle'>+</span> %s" // your entirely customized handler. Use %s to position item title
  },
  click: function (el) {}, // callback when any board's item are clicked
  dragEl: function (el, source) {}, // callback when any board's item are dragged
  dragendEl: function (el) {}, // callback when any board's item stop drag
  dropEl: function (el, target, source, sibling) {}, // callback when any board's item drop in a board
  dragBoard: function (el, source) {}, // callback when any board stop drag
  dragendBoard: function (el) {}, // callback when any board stop drag
  buttonClick: function (el, boardId) {} // callback when the board's button is clicked
});
*/
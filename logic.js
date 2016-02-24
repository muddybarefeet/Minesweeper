$(document).ready(function(){

  //place numbers to show where are relative to the bombs
  var placeNumbers = function () {
    //loop through the grid
    $("tr").children().each(function (element, i) {
      //if it is no bomb look at the surrounding squares
      //set the sum of the bombs to the id of the square
      //look at all surrounding squares and sum bombs
      if (i.id !== 'bomb') {

        var count = 0;
        var columnNo = $(this).parent().children().index($(this));

        // var next = $(this).next('td');
        if ($(this).next('td').attr("id") === 'bomb') {
          count++;
        }
        // var prev = $(this).prev('td');
        if ($(this).prev('td').attr("id") === 'bomb') {
          count++;
        }
        // var above = $(this).parent().prev('tr').children().eq(columnNo);
        if ($(this).parent().prev('tr').children().eq(columnNo).attr("id") === 'bomb') {
          count++;
        }
        // var aboveLeft = $(this).parent().prev('tr').children().eq(columnNo - 1);
        if ($(this).parent().prev('tr').children().eq(columnNo - 1).attr("id") === 'bomb') {
          count++;
        }
        // var aboveRight = $(this).parent().prev('tr').children().eq(columnNo + 1);
        if ($(this).parent().prev('tr').children().eq(columnNo + 1).attr("id") === 'bomb') {
          count++;
        }
        // var below = $(this).parent().next('tr').children().eq(columnNo);
        if ($(this).parent().next('tr').children().eq(columnNo).attr("id") === 'bomb') {
          count++;
        }
        // var belowLeft = $(this).parent().next('tr').children().eq(columnNo - 1);
        if ($(this).parent().next('tr').children().eq(columnNo - 1).attr("id") === 'bomb') {
          count++;
        }
        // var belowRight = $(this).parent().next('tr').children().eq(columnNo + 1);
        if ($(this).parent().next('tr').children().eq(columnNo + 1).attr("id") === 'bomb') {
          count++;
        }

        i.id = count;
        count = 0;
      }

    });
  };

  //place the pieces: bombs first
  //level 1: 15% level 2: 30% level 3: 60%
  var placeBombs = function (level) {
    var percent;
    if (level === '1') {
      percent = 0.15;
    } else if (level === '2') {
      percent = 0.3;
    } else if (level === '3') {
      percent = 0.6;
    }

    $('tr').children().each(function (element, i) {
      if (Math.random() <= percent) {
        i.id = 'bomb';
      }
    });

    placeNumbers();

  };

  //on choosing a level --- STARTS THE GAME OFF!
  $('.chooseLevel').change(function () {
    placeBombs($('.chooseLevel').val());
  });

  //to uncover all adjacent zeros
  var showAllAdjacentZeros = function (context, toShow) {
    // console.log('in recurse');
    var columnNo = context.parent().children().index(context);

    // var next = $(this).next('td');
    if (context.next('td').attr("id") === '0' && context.next('td').html() === "") {
      context.next('td').html("<img src='./assets/images/grass1.jpg' alt='angryPenguin' class='grassImg'/>");
      context.next('td').addClass('noBorder');
      showAllAdjacentZeros(context.next('td'), toShow);
    }
    // var prev = context.prev('td');
    if (context.prev('td').attr("id") === '0' && context.prev('td').html() === "") {
      context.prev('td').html("<img src='./assets/images/grass1.jpg' alt='grassTile' class='grassImg'/>");
      context.prev('td').addClass('noBorder');
      showAllAdjacentZeros(context.prev('td'), toShow);
    }
    // // var above = context.parent().prev('tr').children().eq(columnNo);
    if (context.parent().prev('tr').children().eq(columnNo).attr("id") === '0' && context.parent().prev('tr').children().eq(columnNo).html() === "") {
      context.parent().prev('tr').children().eq(columnNo).html("<img src='./assets/images/grass1.jpg' alt='grassTile' class='grassImg'/>");
      context.parent().prev('tr').children().eq(columnNo).addClass('noBorder');
      showAllAdjacentZeros(context.parent().prev('tr').children().eq(columnNo), toShow);
    }
    // // var aboveLeft = context.parent().prev('tr').children().eq(columnNo - 1);
    if (context.parent().prev('tr').children().eq(columnNo - 1).attr("id") === '0' && context.parent().prev('tr').children().eq(columnNo - 1).html() === "") {
      context.parent().prev('tr').children().eq(columnNo - 1).html("<img src='./assets/images/grass1.jpg' alt='grassTile' class='grassImg'/>");
      context.parent().prev('tr').children().eq(columnNo - 1).addClass('noBorder');
      showAllAdjacentZeros(context.parent().prev('tr').children().eq(columnNo - 1), toShow);
    }
    // // var aboveRight = context.parent().prev('tr').children().eq(columnNo + 1);
    if (context.parent().prev('tr').children().eq(columnNo + 1).attr("id") === '0' && context.parent().prev('tr').children().eq(columnNo + 1).html() === "") {
      context.parent().prev('tr').children().eq(columnNo + 1).html("<img src='./assets/images/grass1.jpg' alt='grassTile' class='grassImg'/>");
      context.parent().prev('tr').children().eq(columnNo + 1).addClass('noBorder');
      showAllAdjacentZeros(context.parent().prev('tr').children().eq(columnNo + 1), toShow);
    }
    // // var below = context.parent().next('tr').children().eq(columnNo);
    if (context.parent().next('tr').children().eq(columnNo).attr("id") === '0' && context.parent().next('tr').children().eq(columnNo).html() === "") {
      context.parent().next('tr').children().eq(columnNo).html("<img src='./assets/images/grass1.jpg' alt='grassTile' class='grassImg'/>");
      context.parent().next('tr').children().eq(columnNo).addClass('noBorder');
      showAllAdjacentZeros(context.parent().next('tr').children().eq(columnNo), toShow);
    }
    // // var belowLeft = context.parent().next('tr').children().eq(columnNo - 1);
    if (context.parent().next('tr').children().eq(columnNo - 1).attr("id") === '0' && context.parent().next('tr').children().eq(columnNo - 1).html() !== null) {
      context.parent().next('tr').children().eq(columnNo - 1).html("<img src='./assets/images/grass1.jpg' alt='grassTile' class='grassImg'/>");
      context.parent().next('tr').children().eq(columnNo - 1).addClass('noBorder');
      showAllAdjacentZeros(context.parent().next('tr').children().eq(columnNo - 1), toShow);
    }
    // // var belowRight = context.parent().next('tr').children().eq(columnNo + 1);
    if (context.parent().next('tr').children().eq(columnNo + 1).attr("id") === '0' && context.parent().next('tr').children().eq(columnNo + 1).html() !== null) {
      context.parent().next('tr').children().eq(columnNo + 1).html("<img src='./assets/images/grass1.jpg' alt='grassTile' class='grassImg'/>");
      context.parent().next('tr').children().eq(columnNo + 1).addClass('noBorder');
      showAllAdjacentZeros(context.parent().next('tr').children().eq(columnNo + 1), toShow);
    }

    return;

  };

  //on clicking on a bomb reveal all the bombs and show alert
  var revealAllBombs = function () {
    $('tr').children().each(function (_, element) {
      if (element.id === 'bomb') {
        element.innerHTML="<img src='./assets/images/Bomb.png' alt='angryPenguin' class='bombImg'/>";
        element.className = 'noBorder';
      }
    });
  };

  //flag a square
  $('td').mousedown(function(e) {
      if (e.which === 3) {
        //right click and so want to flag the cell
        if ($(this).text() !== 'flag' && $(this).html() === '') {
          $(this).addClass('noBorder');
          $(this).html("<img src='./assets/images/flag.png' alt='flag' class='grassImg'/>");
          $(this).attr("id","flag");
        } else if ($(this).attr('id') === 'flag') {
          $(this).attr('id', '');
          $(this).html('');
          $(this).removeClass('noBorder');
        }
      }
  });


  //on click to display what undernieth
  $('td').click( function () {
    var toShow = $(this).attr('id');
    if (toShow === '0' && $(this).attr('id') !== 'flag') {
      //uncover all surrounding zeros :s
      showAllAdjacentZeros($(this), toShow);
      $(this).html("<img src='./assets/images/grass1.jpg' alt='grassTile' class='grassImg'/>");
    } else if (toShow === 'bomb' && $(this).attr('id') !== 'flag') {
      //you loose
      //reveal all bombs and color the squares red
      revealAllBombs();
      $(this).html("<img src='./assets/images/Bomb.png' alt='angryPenguin' class='bombImg'/>");
      $(this).addClass('noBorder');
    } else if ($(this).attr('id') !== 'flag') { //only render if not flag on this square
      $(this).html(toShow);
      $(this).addClass('noBorder');
    }
  });

  //start a new game- page refresh
  $('.bombImgHeader').click(function() {
      location.reload();
  });

});
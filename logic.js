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
        //set the id of the element to the count
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

    var next = context.next('td');
    if (next.attr("id") === '0' && next.html() === "") {
      next.html("<img src='./assets/images/grass1.jpg' alt='angryPenguin' class='grassImg'/>");
      next.addClass('noBorder');
      showAllAdjacentZeros(next, toShow);
    }
    var prev = context.prev('td');
    if (prev.attr("id") === '0' && prev.html() === "") {
      prev.html("<img src='./assets/images/grass1.jpg' alt='grassTile' class='grassImg'/>");
      prev.addClass('noBorder');
      showAllAdjacentZeros(prev, toShow);
    }
    var above = context.parent().prev('tr').children().eq(columnNo);
    if (above.attr("id") === '0' && above.html() === "") {
      above.html("<img src='./assets/images/grass1.jpg' alt='grassTile' class='grassImg'/>");
      above.addClass('noBorder');
      showAllAdjacentZeros(above, toShow);
    }
    var aboveLeft = context.parent().prev('tr').children().eq(columnNo - 1);
    if (aboveLeft.attr("id") === '0' && aboveLeft.html() === "") {
      aboveLeft.html("<img src='./assets/images/grass1.jpg' alt='grassTile' class='grassImg'/>");
      aboveLeft.addClass('noBorder');
      showAllAdjacentZeros(aboveLeft, toShow);
    }
    var aboveRight = context.parent().prev('tr').children().eq(columnNo + 1);
    if (aboveRight.attr("id") === '0' && aboveRight.html() === "") {
      aboveRight.html("<img src='./assets/images/grass1.jpg' alt='grassTile' class='grassImg'/>");
      aboveRight.addClass('noBorder');
      showAllAdjacentZeros(aboveRight, toShow);
    }
    var below = context.parent().next('tr').children().eq(columnNo);
    if (below.attr("id") === '0' && below.html() === "") {
      below.html("<img src='./assets/images/grass1.jpg' alt='grassTile' class='grassImg'/>");
      below.addClass('noBorder');
      showAllAdjacentZeros(below, toShow);
    }
    var belowLeft = context.parent().next('tr').children().eq(columnNo - 1);
    if (belowLeft.attr("id") === '0' && belowLeft.html() !== null) {
      belowLeft.html("<img src='./assets/images/grass1.jpg' alt='grassTile' class='grassImg'/>");
      belowLeft.addClass('noBorder');
      showAllAdjacentZeros(belowLeft, toShow);
    }
    var belowRight = context.parent().next('tr').children().eq(columnNo + 1);
    if (belowRight.attr("id") === '0' && belowRight.html() !== null) {
      belowRight.html("<img src='./assets/images/grass1.jpg' alt='grassTile' class='grassImg'/>");
      belowRight.addClass('noBorder');
      showAllAdjacentZeros(belowRight, toShow);
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
          $(this).attr("title","flag");
        } else if ($(this).attr('id') === 'flag') {
          $(this).attr('title', '');
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
      //reveal all bombs
      revealAllBombs();
      $(this).html("<img src='./assets/images/Bomb.png' alt='angryPenguin' class='bombImg'/>");
      $(this).addClass('noBorder');
    } else if ($('.chooseLevel').val() !== "noVal" && $(this).attr('id') !== 'flag') {//if the game has not started then don't do anything
      $(this).html(toShow);
      $(this).addClass('noBorder');
    }
  });

  //start a new game- page refresh
  $('.bombImgHeader').click(function() {
      location.reload();
  });

});
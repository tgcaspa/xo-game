$(document).ready(function () {

    var imgArray = new Array();
    for (var i = 0; i < 2; i++) { //build array with X/O pictures
        imgArray[i] = new Image();
        imgArray[i].src = 'images/img' + i + '.png';
    }

    var desk_matrix = [[], [], []];
    function gameStart() {
        desk_matrix = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
        $('p[id=whichPlayer]').text('עכשיו תורו של שחקן "איקס"');
        $('p[id=whichPlayer]').attr('data-player', 'iks');
        $('td').each(function () {
            $(this).html(''); //makes all cells are empty for start/ reset mode
            $(this).css('background-color', '#fff');
        });
    }

    var win;
    $('td').click(function () {
        if (!$(this).html()) { //if cell is empty
            var s_player = $('p[id=whichPlayer]');
            var a_player = s_player.attr('data-player'); //iks/ igul
            var picSrc;

            //if not won, change the title for next turn
            if (a_player == 'iks') { //if current player is iks
                picSrc = imgArray[1].src;
                s_player.text('עכשיו תורו של שחקן "עיגול"');
                s_player.attr('data-player', 'igul');
            }
            else { //if current player is igul
                picSrc = imgArray[0].src;
                s_player.text('עכשיו תורו של שחקן "איקס"');
                s_player.attr('data-player', 'iks');
            }
            
            $(this).html('<img src="' + picSrc + '"/>');

            if (isWinner(a_player, $(this).attr('data-row'), $(this).attr('data-column'))) {
                //if won
                if (win == "column")
                    $('td[data-column="' + $(this).attr('data-column') + '"]').css('background-color', '#eff5a4');
                if (win == "row")
                    $('td[data-row="' + $(this).attr('data-row') + '"]').css('background-color', '#eff5a4');
                if (win == "m_diag")
                    for (var i = 0; i < 9; i += 4)
                        $('td:eq(' + i + ')').css('background-color', '#eff5a4');
                if (win == "s_diag")
                    for (var i = 2; i < 8; i += 2)
                        $('td:eq(' + i + ')').css('background-color', '#eff5a4');

                if (a_player == 'iks')
                    s_player.text('השחקן "איקס" ניצח במשחק!!!');
                else
                    s_player.text('השחקן "עיגול" ניצח במשחק!!!');
            }
            else {
                $(this).children("img[src=" + picSrc + "]").hide();
                $(this).children("img[src=" + picSrc + "]").fadeIn(600);
            }
        }
        else
            alert("המשבצת תפוסה. נסה צד אחר.");
    });
    
    function isWinner(player, iRow, iCol) {
        var flag;
        desk_matrix[iRow][iCol] = player;

        //check row
        for (var i = 0; i < 3; i++) {
            if (i == iCol) {
                //don't check yourself
                continue;
            }

            if (desk_matrix[iRow][i] == player) {
                flag = true;
                win = "row";
            }
            else {
                flag = false;
                break;
            }
        }
        if (!flag) {
            //check column
            for (var i = 0; i < 3; i++) {
                if (i == iRow) {
                    //don't check yourself
                    continue;
                }

                if (desk_matrix[i][iCol] == player) {
                    flag = true;
                    win = "column";
                }
                else {
                    flag = false;
                    break;
                }
            }
        }
        if (!flag) {
            //check main diagonal
            if (iRow == iCol)
                for (var i = 0; i < 3; i++) {
                    if (i == iCol) {
                        //don't check your self
                        continue;
                    }

                    if (desk_matrix[i][i] == player) {
                        flag = true;
                        win = "m_diag";
                    }
                    else {
                        flag = false;
                        break;
                    }
                }
        } 
        if (!flag) {
            //check second diagonal
            for (var i = 0; i < 3; i++) {
                if ((i+(2-2*i)) == iCol && (i==iRow)) {
                    //don't check your self
                    continue;
                }

                if (desk_matrix[i][i + (2 - 2 * i)] == player) {
                    flag = true;
                    win = "s_diag";
                }
                else {
                    flag = false;
                    break;
                }
            }
        }
    
        return flag;
    }

    $('#btnReset').click(function () { gameStart() });
});
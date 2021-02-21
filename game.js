//membuat array dengan data warna-warna dalam gim
var buttonColours = ["red", "blue", "green", "yellow"];

//deklarasi variabel gamePattern dengan nilai array kosong
var gamePattern = [];

// variabel userClickedButton akan menaruh isi dari input user dengan nilai awal berupa array kosong
var userClickedButton = [];

// deklarasi variabel awal menandakan gim belum dimulai
var started = false;

// deklarasi variabel dengan nilai 0 menandakan  
var level = 0;

// dengan jQuery, ketika tombol ditekan untuk pertama kali maka akan memanggil fungsi nextSequence dan gim akan dimulai
$(document).keypress(function () {
    if (!started) {

        // ketika gim mulai maka text h1 akan berubah menjadi level 0 dan seterusnya
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


// query selector ke class btn, fungsi akan terjadi ketika tombol dari class btn ter-klik
$(".btn").click(function () {
    // membuat variabel userChosenColour dan mmengisi dengan nilai yang ditunjuk dari atribut id
    var userChosenColour = $(this).attr("id");

    // menambahkan data dari randomChosenColours kepada array userClickedButton
    userClickedPattern.push(userChosenColour);

    // memanggil fungsi playSound
    playSound(userChosenColour);

    // memanggil fungsi animatePress
    animatePress(userChosenColour);

    // memanggil fungsi checkAnswer dengan parameter dengan index terakhir
    checkAnswer(userClickedPattern.length - 1);
});

// fungsi untuk mengecek apakah jawaban sama dengan level permainan
function checkAnswer(currentLevel) {
    // jika jawaban user sama dengan level permainan
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // memanggil fungsi nextSequence setelah 0.1 detik delay
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        // memainkan suara jika mendapat jawaban yang salah
        playSound("wrong");

        // menambahkan class game-over dari css kepada body html saat jawaban salah dengan rentang waktu 0.2 detik
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


// fungsi menjalankan sekuen selanjutnya
function nextSequence() {
    // ketika fungsi nextSequence dipanggil, maka userClickedPattern direset untuk level selanjutnya
    userClickedPattern = [];

    // menambah level setiap nextSequence dipanggil
    level++;

    // mengupdate h1 setiap fungsi dipanggil
    $("#level-title").text("level " + level);

    // membuat variabel yang menghasilkan angka acak diantara 0-3
    var randomNumber = Math.floor(Math.random() * 4);

    // deklarasi variabel untuk memilih warna dari buttonColours dengan acak
    var randomChosenColour = buttonColours[randomNumber];

    // menambahkan data dari randomChosenColours kepada array gamePattern
    gamePattern.push(randomChosenColour)

    // jQuery memilih id dan ditambah randomChosenColour dan membuat animasi
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // mengeluarkan fungsi playSound
    playSound(randomChosenColour);

}

// fungsi mengeluarkan animasi ketika tombol ditekan
function animatePress(currentColor) {
    // dengan jQuery, menambahkan class pada tombol yang di-klik dan mengeluarkan fungsi ketika class pressed ditekan
    $("#" + currentColor).addClass("pressed")

    // membuat class yang berfungsi untuk membuat batas waktu dari class pressed menjadi 0.1 detik
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

// fungsi untuk menjalankan musik
function playSound(name) {
    // membuat variabel yang bersumber ke audio dan menjalankan audio
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// fungsi untuk memulai ulang gim
function startOver() {

    // mereset gim level, gim pattern, dan awal mula gim
    level = 0;
    gamePattern = [];
    started = false;
}
/**
 * Created by LiuSong on 2017/10/18.
 */

$(function () {
    var $section = $(".geneSection-sub");
    $section.find(".arrow").click(function () {
        $(this).parent().toggleClass("open");
    })
});
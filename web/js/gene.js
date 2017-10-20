/**
 * Created by LiuSong on 2017/10/18.
 */

$(function () {
    //手风琴效果
    $('#geneContainer').find('.arrow').click(function () {
        $(this).parent().toggleClass("open");
    });

    //标签切换效果
    $('.geneTabs').each(function () {
        var $tabs = $(this),
            $list = $tabs.find('.tab-list').children(),
            $content = $tabs.find('.tab-content').children();

        $list.click(function () {
            var $this = $(this),
                index = $this.index();

            $this.addClass('active').siblings('.active').removeClass('active');
            $content.eq(index).addClass('active').siblings('.active').removeClass('active');
        });

    });
});
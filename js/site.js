$(document).ready(function(){function o(){p.on("scroll",c),p.on("resize",a),f.on("click",n),h.on("click",e),$('a[href^="#"]').on("click",t),l()}function t(o){o.preventDefault(),$(document).off("scroll");var t=this.hash;$target=$(t),$("html, body").stop().animate({scrollTop:$target.offset().top-40},0,"swing",function(){window.location.hash=t,$(document).on("scroll",c)})}function n(o){o.preventDefault(),e();var t=$($(this).data("popover"));t.toggleClass("open"),o.stopImmediatePropagation()}function e(o){$(".popover.open").length>0&&$(".popover").removeClass("open")}function a(){d.removeClass("has-docked-nav"),u=i.offset().top,c()}function c(){u<p.scrollTop()&&!d.hasClass("has-docked-nav")&&d.addClass("has-docked-nav"),u>p.scrollTop()&&d.hasClass("has-docked-nav")&&d.removeClass("has-docked-nav")}function s(o){return String(o).replace(/[&<>"'\/]/g,function(o){return v[o]})}function l(){r.each(function(){var o=s($(this).html());$(this).html(o)})}var r=$(".code-example-body"),i=$(".navbar"),d=$("body"),p=$(window),f=$("[data-popover]"),u=i.offset().top,h=$(document),v={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};$("#button").click(function(){$("html, body").animate({scrollTop:$("#elementtoScrollToID").offset().top},2e3)}),o()});

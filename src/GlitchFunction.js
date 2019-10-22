/** code by webdevtrick ( https://webdevtrick.com ) **/
$('.textglitch').hover(function(){
  var eLtext = $(this).text(),
      eLchild = $(this).find('.textglitch-link');
  console.log(eLchild);
  eLchild.attr('data-content', eLtext);
  eLchild.toggleClass('blur');
  $(this).toggleClass('active');
});
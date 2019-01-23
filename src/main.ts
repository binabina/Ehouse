import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// @ts-ignore
$(document).on('click','.navbar-collapse.in',function(e) {
  // @ts-ignore
  if( $(e.target).is('a:not(".dropdown-toggle")') ) {
    // @ts-ignore
    $(this).collapse('hide');
  }
});


// @ts-ignore
$(document).ready(function(){
  // @ts-ignore
  $('body').append('<br><div id="toTop" class="btn btn-lg text-primary" data-placement="top" title="Retour en haut" data-toggle="tooltip"><span class="glyphicon glyphicon-chevron-up"></span></div>');
  // @ts-ignore
  $(window).scroll(function () {
    // @ts-ignore
    if ($(this).scrollTop() != 0) {
      // @ts-ignore
      $('#toTop').fadeIn();
    } else {
      // @ts-ignore
      $('#toTop').fadeOut();
    }
  });
  // @ts-ignore
  $('#toTop').click(function(){
    // @ts-ignore
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
});


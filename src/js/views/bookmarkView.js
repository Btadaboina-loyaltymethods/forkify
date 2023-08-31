// li class="preview">
//                     <a class="preview__link" href="#23456">
//                       <figure class="preview__fig">
//                         <img src="src/img/test-1.jpg" alt="Test" />
//                       </figure>
//                       <div class="preview__data">
import View from './view';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No Bookmarks yet. Find a nice recipe and bookmark it ;)`;
  _message = ``;

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
  addHandlerRender(handler) {
    window.addEventListener('load', handler());
  }
  _generateMarkupPreview(result) {
    return `
  <li class="preview">
          <a class="preview__link preview__link" href="#${result.id}">
            <figure class="preview__fig">
              <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher}</p>
              
            </div>
          </a>
        </li>`;
  }
}
export default new BookmarksView();

//                         <h4 class="preview__name">
//                           Pasta with Tomato Cream ...
//                         </h4>
//                         <p class="preview__publisher">The Pioneer Woman</p>
//                       </div>
//                     </a>
//                   </li>

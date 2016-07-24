import TitleComponent from '../title/TitleComponent'

class ArticleTitleComponent extends TitleComponent {

  render($$) {
    let el = super.render($$)
    el.removeClass('sc-title')
    el.addClass('sc-article-title')
    return el
  }

}

export default ArticleTitleComponent
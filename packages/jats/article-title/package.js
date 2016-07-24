import ArticleTitle from './ArticleTitle'
import ArticleTitleConverter from './ArticleTitleConverter'
import ArticleTitleComponent from './ArticleTitleComponent'

export default {
  name: 'article-title',
  configure: function(config) {
    config.addNode(ArticleTitle)
    config.addComponent(ArticleTitle.type, ArticleTitleComponent)
    config.addConverter('jats', ArticleTitleConverter)
    config.addStyle(__dirname, '_article-title.scss')
  }
}

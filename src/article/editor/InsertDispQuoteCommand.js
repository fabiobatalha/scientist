import InsertNodeCommand from './InsertNodeCommand'

export default class InsertDispQuoteCommand extends InsertNodeCommand {

  getType () {
    return 'disp-quote'
  }

  createNode (tx, params, context) {
    const dispQuoteType = this.config.dispQuoteType
    dq = context.api._createDispQuote(tx)
    dq.attr('content-type', dispQuoteType)
    return dq
  }
}

import InsertNodeCommand from './InsertNodeCommand'

export default class InsertEpigraphCommand extends InsertNodeCommand {
  createNode (tx, params, context) {
    return context.api._createEpigraph(tx)
  }
}

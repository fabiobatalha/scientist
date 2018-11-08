import InsertNodeCommand from './InsertNodeCommand'

export default class InsertEphigraphCommand extends InsertNodeCommand {
  createNode (tx, params, context) {
    return context.api._createEphigraph(tx)
  }
}

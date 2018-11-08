import { DefaultDOMElement, importNodeIntoDocument, selectionHelpers } from 'substance'
import createJatsImporter from './converter/r2t/createJatsImporter'
import { DISP_QUOTE, EPHIGRAPH, FIGURE_SNIPPET,
  FOOTNOTE_SNIPPET, PERSON_SNIPPET, TABLE_SNIPPET
} from './ArticleSnippets'

const elementSpippetsMap = {
  'disp-quote': DISP_QUOTE,
  'ephigraph': EPHIGRAPH,
  'figure': FIGURE_SNIPPET,
  'footnote': FOOTNOTE_SNIPPET,
  'person': PERSON_SNIPPET,
  'table-figure': TABLE_SNIPPET
}

export function createEmptyElement (tx, elName, ...snippetParams) {
  const snippet = elementSpippetsMap[elName]
  if (!snippet) {
    throw new Error('There is no snippet for element', elName)
  }
  let snippetEl = DefaultDOMElement.parseSnippet(snippet(...snippetParams).trim(), 'xml')
  let docSnippet = tx.getDocument().createSnippet()
  let jatsImporter = createJatsImporter(docSnippet)
  let node = jatsImporter.convertElement(snippetEl)
  return importNodeIntoDocument(tx, node)
}

export function setContainerSelection (tx, node) {
  const p = node.find('p')
  if (p) {
    let path = [p.id, 'content']
    let newSelection = {
      type: 'property',
      path,
      startOffset: 0,
      surfaceId: node.id
    }
    tx.setSelection(newSelection)
  }
}

export function importFigures (tx, sel, files, paths) {
  const LAST = files.length - 1
  let containerId = sel.containerId
  files.map((file, idx) => {
    let path = paths[idx]
    let mimeData = file.type.split('/')
    let figure = createEmptyElement(tx, 'figure')
    let graphic = tx.get(figure.content)
    graphic.attr({
      'mime-subtype': mimeData[1],
      'mimetype': mimeData[0],
      'xlink:href': path
    })
    if (idx !== 0) {
      tx.break()
    }

    tx.insertBlockNode(figure)

    if (idx === LAST) {
      selectionHelpers.selectNode(tx, figure.id, containerId)
    }
  })
}

export function insertTableFigure (tx, rows, columns) {
  return createEmptyElement(tx, 'table-figure', rows, columns)
}

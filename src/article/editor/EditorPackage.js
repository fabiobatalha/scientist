/* eslint-disable no-template-curly-in-string */
import {
  EditInlineNodeCommand,
  EditAnnotationCommand,
  ListPackage,
  SchemaDrivenCommandManager,
  MultiSelectPackage
} from 'substance'

import {
  BasePackage, EditorBasePackage, ModelComponentPackage, FindAndReplacePackage
} from '../../kit'

import EntityLabelsPackage from '../shared/EntityLabelsPackage'
import ManuscriptContentPackage from '../shared/ManuscriptContentPackage'
// FIXME: adding this to ManuscriptContentPackage causes troubles
import ReferenceListComponent from '../shared/ReferenceListComponent'
import FootnoteGroupComponent from '../shared/FootnoteGroupComponent'

import EditXrefTool from './EditXrefTool'
import EditExtLinkTool from './EditExtLinkTool'
import ManuscriptEditor from './ManuscriptEditor'
import TOC from './TOC'
import FigureComponent from '../shared/FigureComponent'
import FootnoteComponent from '../shared/FootnoteComponent'
import ReferenceComponent from '../shared/ReferenceComponent'

// Commands
import DecreaseHeadingLevelCommand from './DecreaseHeadingLevelCommand'
import IncreaseHeadingLevelCommand from './IncreaseHeadingLevelCommand'
import InsertExtLinkCommand from './InsertExtLinkCommand'
import InsertDispQuoteCommand from './InsertDispQuoteCommand'
import InsertEpigraphCommand from './InsertEpigraphCommand'
import InsertXrefCommand from './InsertXrefCommand'
import InsertFigureCommand from './InsertFigureCommand'
import InsertFigureTool from './InsertFigureTool'
import DropFigure from './DropFigure'
import InsertInlineFormulaCommand from './InsertInlineFormulaCommand'
import EditInlineFormulaTool from './EditInlineFormulaTool'
import {
  InsertTableCommand, InsertCellsCommand, DeleteCellsCommand,
  TableSelectAllCommand, ToggleCellHeadingCommand, ToggleCellMergeCommand
} from './TableCommands'
import InsertTableTool from './InsertTableTool'
import ToggleListCommand from './ToggleListCommand'
import ArticleNavPackage from '../ArticleNavPackage'
import PersistencePackage from '../../PersistencePackage'
// Workflows
import AddReferenceWorkflow from '../shared/AddReferenceWorkflow'
import EditReferenceWorkflow from './EditReferenceWorkflow'

import CollectionEditor from '../metadata/CollectionEditor'

export default {
  name: 'ManscruptEditor',
  configure (config) {
    config.import(BasePackage)
    config.import(EditorBasePackage)
    config.import(ModelComponentPackage)
    config.import(ManuscriptContentPackage)
    config.import(MultiSelectPackage)
    config.import(EntityLabelsPackage)
    config.import(ArticleNavPackage)
    config.import(PersistencePackage)
    config.import(FindAndReplacePackage)

    // EXPERIMENTAL:
    // a CommandManager that uses the xmlSchema to inhibit commands
    // which would generate disallowed content
    config.setCommandManagerClass(SchemaDrivenCommandManager)

    config.addComponent('toc', TOC)
    config.addComponent('references', ReferenceListComponent)
    config.addComponent('footnotes', FootnoteGroupComponent)

    // overriding the default components for preview
    config.addComponent('figure', FigureComponent, true)
    config.addComponent('table-figure', FigureComponent, true)
    config.addComponent('fn', FootnoteComponent, true)
    config.addComponent('bibr', ReferenceComponent, true)

    // TODO: try to get rid of this one
    config.addComponent('collection', CollectionEditor)

    // Commands
    config.addCommand('edit-xref', EditInlineNodeCommand, {
      nodeType: 'xref',
      commandGroup: 'prompt'
    })
    config.addCommand('insert-xref-bibr', InsertXrefCommand, {
      refType: 'bibr',
      commandGroup: 'insert-xref'
    })
    config.addCommand('insert-xref-fig', InsertXrefCommand, {
      refType: 'fig',
      commandGroup: 'insert-xref'
    })
    config.addCommand('insert-xref-table', InsertXrefCommand, {
      refType: 'table',
      commandGroup: 'insert-xref'
    })
    config.addCommand('insert-xref-fn', InsertXrefCommand, {
      refType: 'fn',
      commandGroup: 'insert-xref'
    })
    config.addCommand('insert-disp-quote', InsertDispQuoteCommand, {
      dispQuoteType: 'disp-quote',
      commandGroup: 'insert-disp-quote'
    })
    config.addCommand('insert-disp-quote-epigraph', InsertDispQuoteCommand, {
      dispQuoteType: 'epigraph',
      commandGroup: 'insert-disp-quote'
    })
    config.addCommand('insert-fig', InsertFigureCommand, {
      nodeType: 'fig',
      commandGroup: 'insert'
    })
    config.addCommand('insert-table', InsertTableCommand, {
      nodeType: 'table-wrap',
      commandGroup: 'insert'
    })
    config.addCommand('insert-formula', InsertInlineFormulaCommand, {
      commandGroup: 'insert'
    })
    config.addCommand('edit-formula', EditInlineNodeCommand, {
      nodeType: 'inline-formula',
      commandGroup: 'prompt'
    })
    config.addCommand('decrease-heading-level', DecreaseHeadingLevelCommand, {
      commandGroup: 'text-level'
    })
    config.addCommand('increase-heading-level', IncreaseHeadingLevelCommand, {
      commandGroup: 'text-level'
    })
    config.addKeyboardShortcut('shift+tab', { command: 'decrease-heading-level' })
    config.addKeyboardShortcut('tab', { command: 'increase-heading-level' })

    config.addCommand('table:select-all', TableSelectAllCommand)
    config.addKeyboardShortcut('CommandOrControl+a', { command: 'table:select-all' })

    config.addCommand('toggle-cell-heading', ToggleCellHeadingCommand, {
      commandGroup: 'table'
    })
    config.addCommand('toggle-cell-merge', ToggleCellMergeCommand, {
      commandGroup: 'table'
    })
    config.addCommand('insert-columns-left', InsertCellsCommand, {
      spec: { dim: 'col', pos: 'left' },
      commandGroup: 'table-insert'
    })
    config.addCommand('insert-columns-right', InsertCellsCommand, {
      spec: { dim: 'col', pos: 'right' },
      commandGroup: 'table-insert'
    })
    config.addCommand('insert-rows-above', InsertCellsCommand, {
      spec: { dim: 'row', pos: 'above' },
      commandGroup: 'table-insert'
    })
    config.addCommand('insert-rows-below', InsertCellsCommand, {
      spec: { dim: 'row', pos: 'below' },
      commandGroup: 'table-insert'
    })
    config.addCommand('delete-columns', DeleteCellsCommand, {
      spec: { dim: 'col' },
      commandGroup: 'table-delete'
    })
    config.addCommand('delete-rows', DeleteCellsCommand, {
      spec: { dim: 'row' },
      commandGroup: 'table-delete'
    })

    config.addLabel('cite', 'Cite')

    config.addLabel('insert-xref-bibr', 'Reference')
    config.addLabel('insert-xref-fig', 'Figure')
    config.addLabel('insert-xref-table', 'Table')
    config.addLabel('insert-xref-fn', 'Footnote')
    config.addLabel('disp-quote', 'Blockquote')
    config.addLabel('insert-disp-quote', 'Blockquote')
    config.addLabel('insert-disp-quote-epigraph', 'Epipraph')
    config.addLabel('manuscript-start', 'Article starts here')
    config.addLabel('manuscript-end', 'Article ends here')
    config.addLabel('sig-block-start', 'Signature Block starts here')
    config.addLabel('sig-block-end', 'Signature Block ends here')

    config.addLabel('insert-rows-above', {
      en: 'Insert ${nrows} rows above'
    })
    config.addLabel('insert-rows-below', {
      en: 'Insert ${nrows} rows below'
    })
    config.addLabel('insert-columns-left', {
      en: 'Insert ${ncols} columns left'
    })
    config.addLabel('insert-columns-right', {
      en: 'Insert ${ncols} columns right'
    })
    config.addLabel('delete-rows', {
      en: 'Delete ${nrows} rows'
    })
    config.addLabel('delete-columns', {
      en: 'Delete ${ncols} columns'
    })
    config.addLabel('toggle-cell-heading', {
      en: 'Cell heading'
    })
    config.addLabel('toggle-cell-merge', {
      en: 'Merge cell'
    })

    // Tools
    config.addTool('edit-xref', EditXrefTool)

    config.addTool('insert-fig', InsertFigureTool)
    config.addDropHandler(DropFigure)
    config.addLabel('insert-fig', 'Figure')
    config.addIcon('insert-fig', { 'fontawesome': 'fa-image' })

    config.addTool('insert-table', InsertTableTool)
    config.addLabel('insert-table', 'Table')
    config.addIcon('insert-table', { 'fontawesome': 'fa-table' })

    config.addTool('edit-formula', EditInlineFormulaTool)
    config.addLabel('insert-formula', 'Formula')
    config.addIcon('insert-formula', { 'fontawesome': 'fa-dollar' })

    config.addIcon('toggle-cell-merge', {
      'fontawesome': 'fa-arrows-h'
    })
    config.addIcon('toggle-cell-heading', { 'fontawesome': 'fa-th-large' })

    config.addIcon('disp-quote', { 'fontawesome': 'fa-quote-right' })

    // Annotation tools
    config.addAnnotationTool({
      name: 'bold',
      nodeType: 'bold',
      commandGroup: 'formatting',
      icon: 'fa-bold',
      label: 'Strong',
      accelerator: 'CommandOrControl+B'
    })

    config.addAnnotationTool({
      name: 'italic',
      nodeType: 'italic',
      commandGroup: 'formatting',
      icon: 'fa-italic',
      label: 'Emphasize',
      accelerator: 'CommandOrControl+I'
    })

    config.addAnnotationTool({
      name: 'ext-link',
      nodeType: 'ext-link',
      commandGroup: 'formatting',
      command: InsertExtLinkCommand,
      icon: 'fa-link',
      label: 'Link',
      accelerator: 'CommandOrControl+K'
    })

    config.addAnnotationTool({
      name: 'sub',
      nodeType: 'sub',
      commandGroup: 'formatting',
      icon: 'fa-subscript',
      label: 'Subscript'
    })

    config.addAnnotationTool({
      name: 'sup',
      nodeType: 'sup',
      commandGroup: 'formatting',
      icon: 'fa-superscript',
      label: 'Superscript'
    })

    config.addAnnotationTool({
      name: 'monospace',
      nodeType: 'monospace',
      commandGroup: 'formatting',
      icon: 'fa-code',
      label: 'Monospace'
    })

    config.addTextTypeTool({
      name: 'heading1',
      commandGroup: 'text-types',
      nodeSpec: {
        type: 'heading',
        attributes: { level: '1' }
      },
      icon: 'fa-header',
      label: 'Heading 1',
      accelerator: 'CommandOrControl+Alt+1'
    })

    config.addTextTypeTool({
      name: 'heading2',
      commandGroup: 'text-types',
      nodeSpec: {
        type: 'heading',
        attributes: { level: '2' }
      },
      icon: 'fa-header',
      label: 'Heading 2',
      accelerator: 'CommandOrControl+Alt+2'
    })

    config.addTextTypeTool({
      name: 'heading3',
      commandGroup: 'text-types',
      nodeSpec: {
        type: 'heading',
        attributes: { level: '3' }
      },
      icon: 'fa-header',
      label: 'Heading 3',
      accelerator: 'CommandOrControl+Alt+3'
    })

    config.addTextTypeTool({
      name: 'paragraph',
      commandGroup: 'text-types',
      nodeSpec: {
        type: 'p'
      },
      icon: 'fa-paragraph',
      label: 'Paragraph',
      accelerator: 'CommandOrControl+Alt+0'
    })

    config.addCommand('edit-ext-link', EditAnnotationCommand, {
      nodeType: 'ext-link',
      commandGroup: 'prompt'
    })

    // ExtLink
    config.addTool('edit-ext-link', EditExtLinkTool)
    config.addIcon('open-link', { 'fontawesome': 'fa-external-link' })
    config.addLabel('open-link', 'Open Link')

    // Lists
    config.addCommand('toggle-unordered-list', ToggleListCommand, {
      spec: { listType: 'bullet' },
      commandGroup: 'list'
    })
    config.addKeyboardShortcut('CommandOrControl+Shift+8', { command: 'toggle-unordered-list' })
    config.addLabel('toggle-unordered-list', {
      en: 'Bulleted list',
      de: 'Liste'
    })
    config.addIcon('toggle-unordered-list', { 'fontawesome': 'fa-list-ul' })

    config.addCommand('toggle-ordered-list', ToggleListCommand, {
      spec: { listType: 'order' },
      commandGroup: 'list'
    })
    config.addKeyboardShortcut('CommandOrControl+Shift+7', { command: 'toggle-ordered-list' })
    config.addLabel('toggle-ordered-list', {
      en: 'Numbered list',
      de: 'Aufzählung'
    })
    config.addIcon('toggle-ordered-list', { 'fontawesome': 'fa-list-ol' })

    config.addCommand('indent-list', ListPackage.IndentListCommand, {
      spec: { action: 'indent' },
      commandGroup: 'list'
    })
    config.addLabel('indent-list', {
      en: 'Increase indentation',
      de: 'Einrückung vergrößern'
    })
    config.addIcon('indent-list', { 'fontawesome': 'fa-indent' })

    config.addCommand('dedent-list', ListPackage.IndentListCommand, {
      spec: { action: 'dedent' },
      commandGroup: 'list'
    })
    config.addLabel('dedent-list', {
      en: 'Decrease indentation',
      de: 'Einrückung verringern'
    })
    config.addIcon('dedent-list', { 'fontawesome': 'fa-dedent' })

    config.addToolPanel('toolbar', [
      {
        name: 'undo-redo',
        type: 'tool-group',
        showDisabled: true,
        style: 'minimal',
        items: [
          { type: 'command-group', name: 'undo-redo' }
        ]
      },
      {
        name: 'persistence',
        type: 'tool-group',
        showDisabled: true,
        style: 'minimal',
        items: [
          { type: 'command-group', name: 'persistence' }
        ]
      },
      {
        name: 'text-types',
        type: 'tool-dropdown',
        showDisabled: false,
        style: 'descriptive',
        items: [
          { type: 'command-group', name: 'text-types' }
        ]
      },
      {
        name: 'disp-quote',
        type: 'tool-dropdown',
        showDisabled: true,
        style: 'minimal',
        items: [
          { type: 'command-group', name: 'insert-disp-quote'}
        ]
      },
      {
        name: 'annotations',
        type: 'tool-group',
        showDisabled: true,
        style: 'minimal',
        items: [
          { type: 'command-group', name: 'formatting' }
        ]
      },
      {
        name: 'additinal-tools',
        type: 'tool-group',
        showDisabled: true,
        style: 'minimal',
        items: [
          { type: 'command-group', name: 'insert' }
        ]
      },
      {
        name: 'list',
        type: 'tool-group',
        showDisabled: false,
        style: 'minimal',
        items: [
          { type: 'command-group', name: 'list' }
        ]
      },
      {
        name: 'table',
        type: 'tool-group',
        showDisabled: false,
        style: 'minimal',
        items: [
          { type: 'command-group', name: 'table' }
        ]
      },
      {
        name: 'cite',
        type: 'tool-dropdown',
        showDisabled: true,
        style: 'descriptive',
        items: [
          { type: 'command-group', name: 'insert-xref' }
        ]
      },
      {
        name: 'view',
        type: 'tool-dropdown',
        showDisabled: false,
        style: 'descriptive',
        items: [
          { type: 'command-group', name: 'toggle-content-section' },
          { type: 'command-group', name: 'view' }
        ]
      },
      {
        name: 'mode',
        type: 'tool-dropdown',
        showDisabled: false,
        style: 'full',
        items: [
          { type: 'command-group', name: 'switch-view' }
        ]
      }
    ])

    config.addToolPanel('main-overlay', [
      {
        name: 'prompt',
        type: 'tool-prompt',
        showDisabled: false,
        items: [
          { type: 'command-group', name: 'prompt' }
        ]
      }
    ])

    config.addToolPanel('context-menu', [
      {
        name: 'context-menu',
        type: 'tool-group',
        showDisabled: false,
        style: 'descriptive',
        items: [
          { type: 'command-group', name: 'table-structure' }
        ]
      }
    ])

    config.addToolPanel('table-context-menu', [
      {
        name: 'table-tools',
        type: 'tool-group',
        showDisabled: false,
        style: 'descriptive',
        items: [
          { type: 'command-group', name: 'table' }
        ]
      },
      { type: 'tool-separator' },
      {
        name: 'table-insert',
        type: 'tool-group',
        showDisabled: false,
        style: 'descriptive',
        items: [
          { type: 'command-group', name: 'table-insert' }
        ]
      },
      { type: 'tool-separator' },
      {
        name: 'table-delete',
        type: 'tool-group',
        showDisabled: false,
        style: 'descriptive',
        items: [
          { type: 'command-group', name: 'table-delete' }
        ]
      }
    ])

    config.addToolPanel('workflow', [
      {
        name: 'workflow',
        type: 'tool-group',
        items: [
          { type: 'command-group', name: 'workflows' }
        ]
      }
    ])

    // Labels for groups
    config.addLabel('structure', 'Structure')
    config.addLabel('article-info', 'Article Information')

    // Labels for panels
    config.addLabel('toc', 'Table of Contents')
    config.addLabel('article-record', 'Article Record')
    config.addLabel('contributors', 'Authors & Contributors')
    config.addLabel('translations', 'Translations')
    config.addLabel('pub-data', 'Publication Data')
    config.addLabel('edit-ref', 'Edit Reference')

    // Labels for empty lists
    config.addLabel('no-authors', 'No Authors')
    config.addLabel('no-editors', 'No Editors')
    config.addLabel('no-references', 'No References')
    config.addLabel('no-footnotes', 'No Footnotes')

    // Labels for buttons
    config.addLabel('add-ref', 'Add Reference')
    config.addLabel('edit-ref', 'Edit')
    config.addLabel('remove-ref', 'Remove')

    // Workflows
    config.addComponent('add-reference', AddReferenceWorkflow)
    config.addLabel('add-reference-title', 'Add Reference(s)')
    config.addLabel('add-ref-manually', 'Or create manually')
    config.addLabel('fetch-datacite', 'Fetch from DataCite')
    config.addLabel('enter-doi-placeholder', 'Enter one or more DOIs')
    config.addLabel('doi-fetch-action', 'Add')
    config.addLabel('import-refs', 'Import')
    config.addLabel('supported-ref-formats', 'Supported formats')
    config.addComponent('edit-reference', EditReferenceWorkflow)

    config.addIcon('pencil', {
      'fontawesome': 'fa-pencil'
    })

    config.addIcon('trash', {
      'fontawesome': 'fa-trash'
    })
  },
  ManuscriptEditor,
  // legacy
  Editor: ManuscriptEditor
}

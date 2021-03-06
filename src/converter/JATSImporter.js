import { EventEmitter, DefaultDOMElement, validateXMLSchema, isString } from 'substance'
import { JATS, JATS4R, TextureJATS } from '../article'
import { r2t } from './r2t'
import { j2r } from './j2r'

/*
  Goal:
  - make it very transparent, what exactly gets transformed
  - show what goes wrong

*/
export default class JATSImporter extends EventEmitter {

  import(xml) {
    let dom
    this.errors = []
    this.emit('begin')

    if (isString(xml)) {
      this.emit('begin:parse')
      try {
        dom = DefaultDOMElement.parseXML(xml)
      } catch(err) {
        this.emit('error:parse', {
          msg: String(err)
        })
        return
      }
      this.emit('end:parse')
    } else if (xml._isDOMElement) {
      dom = xml
    }

    if (!this._validate(JATS, dom)) return

    // JATS -> restricted JATS
    if (!this._transform('j2r',dom)) return

    if (!this._validate(JATS4R, dom)) return

    // restrictedJATS -> TextureJATS
    if (!this._transform('r2t',dom)) return

    if (!this._validate(TextureJATS, dom)) return

    this.emit('end')

    if (this.errors.length > 0) {
      return false
    } else {
      return dom
    }
  }

  _validate(schema, dom) {
    const name = schema.getName()
    const channel = `validate-${name}`
    this.emit(`begin:${channel}`)
    let res = validateXMLSchema(schema, dom)
    if (res.errors) {
      // TODO: we need better errors
      res.errors.forEach((err) => {
        this._error(channel, err)
      })
      return false
    }
    this.emit(`end:${channel}`)
    return true
  }

  _transform(mode, dom) {
    this.emit(`begin:${mode}`)
    const api = this._createAPI(dom, mode)
    switch (mode) {
      case 'j2r':
        j2r(dom, api)
        break
      case 'r2t':
        r2t(dom, api)
        break
      default:
        //
    }
    this.emit(`end:${mode}`)
    return true
  }

  _createAPI(dom, channel) {
    const self = this
    let api = {
      error(data) {
        self._error(`error:${channel}`, data)
      }
    }
    return api
  }

  _error(channel, err) {
    this.errors.push(err)
    this.emit(`error:${channel}`, err)
  }

}
import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import CryptoJS from 'crypto-js'
import { QRCodeSVG } from 'qrcode.react'
import './i18n'
import './App.css'
import {
  DESTool, RC4Tool, RabbitTool, HMACTool, RSATool, SM4Tool,
  EscapeTool, MorseTool, HexTool, PunycodeTool,
  CSSFormat, HTMLFormat, JSFormat,
  RandomNum, MACTool, NameGen, Barcode,
  SortTool, ReplaceTool, PinyinTool, TradTool, ReverseTool, WordCount,
  RMBUpper, Num2En, Roman,
  WhoisTool, SSLTool, RobotsTool, MetaTool, SourceTool, SpiderTool,
  Img2Base64, Base642Img, ColorPickerTool, ImgCompress, FaviconTool, GridCut,
  CalcTool, BMITool, AgeCalc, LoanTool, AreaTool, PrimeTool,
  CalendarTool, SolarTerm, Countdown, TimeDiff, Hour12, ZodiacTool, AlarmTool,
  VSCodeShortcuts, ExcelShortcuts, WordShortcuts, PPTShortcuts, PSShortcuts,
  LinuxCmds, GitCmds, RegexList,
  PhoneQuery, BankQuery, LicenseQuery, IDCard, AreaCode, ZipCode, University,
  DiceTool, CoinTool, ReactionTool, LuckyTool, EatTool, BubbleTool
} from './Tools'

const CATEGORIES = [
  { key: 'encrypt', tools: ['md5', 'sha', 'base64', 'urlcode', 'aes', 'unicode', 'des', 'rc4', 'rabbit', 'hmac', 'rsa', 'sm4'] },
  { key: 'codings', tools: ['escape', 'morse', 'hex', 'punycode'] },
  { key: 'format', tools: ['json', 'xml', 'sql', 'htmlentity', 'css', 'htmlf', 'jsf'] },
  { key: 'generate', tools: ['uuid', 'password', 'lorem', 'qrcode', 'randomnum', 'mac', 'namegen', 'barcode'] },
  { key: 'text', tools: ['charcount', 'caseconv', 'dedup', 'regex', 'markdown', 'sort', 'replace', 'pinyin', 'trad', 'reverse', 'wordcount'] },
  { key: 'convert', tools: ['timestamp', 'color', 'radix', 'unit', 'rmbupper', 'num2en', 'roman'] },
  { key: 'network', tools: ['ip', 'ua', 'httpstatus', 'whois', 'ssl', 'robots', 'meta', 'source', 'spider'] },
  { key: 'image', tools: ['img2base64', 'base642img', 'colorpicker', 'imgcompress', 'favicon', 'gridcut'] },
  { key: 'math', tools: ['calc', 'bmi', 'agecalc', 'loan', 'area', 'prime'] },
  { key: 'date', tools: ['calendar', 'solarterm', 'countdown', 'timediff', 'hour12', 'zodiac', 'alarm'] },
  { key: 'shortcut', tools: ['vscode', 'excel', 'word', 'ppt', 'ps', 'linux', 'git', 'regexlist'] },
  { key: 'query', tools: ['phone', 'bankcard', 'license', 'idcard', 'areacode', 'zipcode', 'university'] },
  { key: 'game', tools: ['dice', 'coin', 'reaction', 'lucky', 'eat', 'bubble'] },
]

// ─── Tool Components ───────────────────────────────

function MD5Tool() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const md5 = CryptoJS.MD5(input).toString()
  return (
    <div className="tool-panel">
      <h2>{t('tools.md5.name')}</h2>
      <p className="desc">{t('tools.md5.desc')}</p>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="输入文本..." />
      <div className="result"><label>MD5 (32位小写)</label><input readOnly value={md5} /></div>
      <div className="result"><label>MD5 (16位)</label><input readOnly value={md5.slice(8, 24)} /></div>
      <div className="result"><label>MD5 (大写)</label><input readOnly value={md5.toUpperCase()} /></div>
    </div>
  )
}

function SHATool() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const sha1 = CryptoJS.SHA1(input).toString()
  const sha256 = CryptoJS.SHA256(input).toString()
  const sha384 = CryptoJS.SHA384(input).toString()
  const sha512 = CryptoJS.SHA512(input).toString()
  return (
    <div className="tool-panel">
      <h2>{t('tools.sha.name')}</h2>
      <p className="desc">{t('tools.sha.desc')}</p>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="输入文本..." />
      <div className="result"><label>SHA-1</label><input readOnly value={sha1} /></div>
      <div className="result"><label>SHA-256</label><input readOnly value={sha256} /></div>
      <div className="result"><label>SHA-384</label><input readOnly value={sha384} /></div>
      <div className="result"><label>SHA-512</label><input readOnly value={sha512} /></div>
    </div>
  )
}

function Base64Tool() {
  const [mode, setMode] = useState('encode')
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  let output = ''
  const compute = () => {
    setError('')
    try {
      if (mode === 'encode') {
        output = btoa(unescape(encodeURIComponent(input)))
      } else {
        output = decodeURIComponent(escape(atob(input)))
      }
    } catch { setError('解码失败，请检查输入是否有效 Base64') }
    return output
  }
  output = compute()
  return (
    <div className="tool-panel">
      <h2>Base64</h2>
      <div className="btn-group">
        <button className={mode === 'encode' ? 'active' : ''} onClick={() => setMode('encode')}>编码 Encode</button>
        <button className={mode === 'decode' ? 'active' : ''} onClick={() => setMode('decode')}>解码 Decode</button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'encode' ? '输入文本...' : '输入 Base64...'} />
      {error && <p className="error">{error}</p>}
      <div className="result"><label>结果</label><textarea readOnly value={output} /></div>
    </div>
  )
}

function URLCodecTool() {
  const [mode, setMode] = useState('encode')
  const [input, setInput] = useState('')
  const output = mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input)
  return (
    <div className="tool-panel">
      <h2>URL 编解码</h2>
      <div className="btn-group">
        <button className={mode === 'encode' ? 'active' : ''} onClick={() => setMode('encode')}>编码</button>
        <button className={mode === 'decode' ? 'active' : ''} onClick={() => setMode('decode')}>解码</button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'encode' ? '输入 URL 或文本...' : '输入 URL 编码字符串...'} />
      <div className="result"><label>结果</label><textarea readOnly value={output} /></div>
    </div>
  )
}

function AESTool() {
  const [mode, setMode] = useState('encrypt')
  const [input, setInput] = useState('')
  const [key, setKey] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const handle = () => {
    setError('')
    try {
      if (mode === 'encrypt') {
        setOutput(CryptoJS.AES.encrypt(input, key).toString())
      } else {
        const bytes = CryptoJS.AES.decrypt(input, key)
        setOutput(bytes.toString(CryptoJS.enc.Utf8) || '(密钥错误或输入无效)')
      }
    } catch { setError('加解密失败') }
  }
  return (
    <div className="tool-panel">
      <h2>AES 加解密</h2>
      <div className="btn-group">
        <button className={mode === 'encrypt' ? 'active' : ''} onClick={() => setMode('encrypt')}>加密</button>
        <button className={mode === 'decrypt' ? 'active' : ''} onClick={() => setMode('decrypt')}>解密</button>
      </div>
      <div className="result"><label>密钥</label><input value={key} onChange={e => setKey(e.target.value)} placeholder="输入密钥..." /></div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'encrypt' ? '输入明文...' : '输入密文...'} />
      {error && <p className="error">{error}</p>}
      <button className="primary" onClick={handle}>{mode === 'encrypt' ? '加密' : '解密'}</button>
      {output && <div className="result"><label>结果</label><textarea readOnly value={output} /></div>}
    </div>
  )
}

function UnicodeTool() {
  const [mode, setMode] = useState('toUnicode')
  const [input, setInput] = useState('')
  let output = ''
  if (mode === 'toUnicode') {
    output = Array.from(input).map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).join('')
  } else {
    output = input.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
  }
  return (
    <div className="tool-panel">
      <h2>Unicode 转换</h2>
      <div className="btn-group">
        <button className={mode === 'toUnicode' ? 'active' : ''} onClick={() => setMode('toUnicode')}>转 Unicode</button>
        <button className={mode === 'toDecode' ? 'active' : ''} onClick={() => setMode('toDecode')}>转字符</button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="输入文本..." />
      <div className="result"><label>结果</label><textarea readOnly value={output} /></div>
    </div>
  )
}

function JSONTool() {
  const [input, setInput] = useState('')
  const [indent, setIndent] = useState(2)
  const [error, setError] = useState('')
  let output = ''
  try { output = JSON.stringify(JSON.parse(input || '{}'), null, indent) } catch { error && setError('') }
  const format = () => {
    setError('')
    try { output = JSON.stringify(JSON.parse(input), null, indent); setInput(output) } catch (e) { setError(e.message) }
  }
  return (
    <div className="tool-panel">
      <h2>JSON 格式化</h2>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <label>缩进:</label>
        <select value={indent} onChange={e => setIndent(+e.target.value)}>
          <option value={2}>2 空格</option><option value={4}>4 空格</option><option value={0}>压缩</option>
        </select>
        <button className="primary" onClick={format}>格式化</button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='{"key": "value"}' style={{ minHeight: 200 }} />
      {error && <p className="error">{error}</p>}
    </div>
  )
}

function XMLTool() {
  const [input, setInput] = useState('')
  const format = () => {
    let formatted = ''
    let indent = 0
    const lines = input.replace(/></g, '>\n<').split('\n')
    for (let line of lines) {
      line = line.trim()
      if (!line) continue
      if (line.startsWith('</')) indent--
      formatted += '  '.repeat(Math.max(0, indent)) + line + '\n'
      if (line.startsWith('<') && !line.startsWith('</') && !line.startsWith('<?') && !line.endsWith('/>')) indent++
    }
    setInput(formatted)
  }
  return (
    <div className="tool-panel">
      <h2>XML 格式化</h2>
      <button className="primary" onClick={format} style={{ marginBottom: 12 }}>格式化</button>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="<root><item>value</item></root>" style={{ minHeight: 200 }} />
    </div>
  )
}

function SQLTool() {
  const [input, setInput] = useState('')
  const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AND', 'OR', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'INDEX', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'AS', 'DISTINCT', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END']
  const format = () => {
    let sql = input.replace(/\s+/g, ' ').trim()
    for (const kw of keywords) {
      const re = new RegExp('\\b(' + kw.replace(/ /g, '\\s+') + ')\\b', 'gi')
      sql = sql.replace(re, '\n$1')
    }
    setInput(sql.replace(/\n+/, '\n').trim())
  }
  return (
    <div className="tool-panel">
      <h2>SQL 格式化</h2>
      <button className="primary" onClick={format} style={{ marginBottom: 12 }}>格式化</button>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="SELECT * FROM users WHERE id=1" style={{ minHeight: 200 }} />
    </div>
  )
}

function HTMLEntityTool() {
  const [mode, setMode] = useState('encode')
  const [input, setInput] = useState('')
  const encode = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  const decode = s => s.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, c => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" }[c]))
  const output = mode === 'encode' ? encode(input) : decode(input)
  return (
    <div className="tool-panel">
      <h2>HTML 实体</h2>
      <div className="btn-group">
        <button className={mode === 'encode' ? 'active' : ''} onClick={() => setMode('encode')}>编码</button>
        <button className={mode === 'decode' ? 'active' : ''} onClick={() => setMode('decode')}>解码</button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'encode' ? '<div>hello</div>' : '&lt;div&gt;hello&lt;/div&gt;'} />
      <div className="result"><label>结果</label><textarea readOnly value={output} /></div>
    </div>
  )
}

function UUIDTool() {
  const { t } = useTranslation()
  const [count, setCount] = useState(1)
  const [upper, setUpper] = useState(false)
  const [uuids, setUuids] = useState([])
  const gen = () => {
    const list = []
    for (let i = 0; i < count; i++) {
      let u = crypto.randomUUID()
      if (upper) u = u.toUpperCase()
      list.push(u)
    }
    setUuids(list)
  }
  return (
    <div className="tool-panel">
      <h2>{t('tools.uuid.name')}</h2>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
        <label>数量: <input type="number" min={1} max={50} value={count} onChange={e => setCount(+e.target.value)} style={{ width: 60 }} /></label>
        <label><input type="checkbox" checked={upper} onChange={e => setUpper(e.target.checked)} /> 大写</label>
        <button className="primary" onClick={gen}>生成</button>
      </div>
      {uuids.length > 0 && <div className="result"><textarea readOnly value={uuids.join('\n')} style={{ minHeight: 100 }} /></div>}
    </div>
  )
}

function PasswordTool() {
  const [len, setLen] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [nums, setNums] = useState(true)
  const [syms, setSyms] = useState(true)
  const [pw, setPw] = useState('')
  const gen = () => {
    let chars = ''
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (nums) chars += '0123456789'
    if (syms) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    if (!chars) return
    const arr = new Uint32Array(len)
    crypto.getRandomValues(arr)
    setPw(Array.from(arr, n => chars[n % chars.length]).join(''))
  }
  return (
    <div className="tool-panel">
      <h2>密码生成器</h2>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <label>长度: <input type="number" min={4} max={128} value={len} onChange={e => setLen(+e.target.value)} style={{ width: 60 }} /></label>
        <label><input type="checkbox" checked={upper} onChange={e => setUpper(e.target.checked)} /> 大写</label>
        <label><input type="checkbox" checked={lower} onChange={e => setLower(e.target.checked)} /> 小写</label>
        <label><input type="checkbox" checked={nums} onChange={e => setNums(e.target.checked)} /> 数字</label>
        <label><input type="checkbox" checked={syms} onChange={e => setSyms(e.target.checked)} /> 符号</label>
        <button className="primary" onClick={gen}>生成</button>
      </div>
      {pw && <div className="result"><input readOnly value={pw} style={{ fontFamily: 'monospace', fontSize: 18 }} /></div>}
    </div>
  )
}

function LoremTool() {
  const [paras, setParas] = useState(3)
  const [output, setOutput] = useState('')
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  const gen = () => {
    setOutput(Array(paras).fill(text).join('\n\n'))
  }
  return (
    <div className="tool-panel">
      <h2>Lorem Ipsum</h2>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <label>段落数: <input type="number" min={1} max={20} value={paras} onChange={e => setParas(+e.target.value)} style={{ width: 60 }} /></label>
        <button className="primary" onClick={gen}>生成</button>
      </div>
      {output && <textarea readOnly value={output} style={{ minHeight: 150 }} />}
    </div>
  )
}

function QRCodeTool() {
  const [input, setInput] = useState('https://')
  const [size, setSize] = useState(200)
  return (
    <div className="tool-panel">
      <h2>二维码生成</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="输入文本或链接..." style={{ flex: 1 }} />
        <label>大小: <input type="number" min={100} max={500} value={size} onChange={e => setSize(+e.target.value)} style={{ width: 70 }} /></label>
      </div>
      {input && (
        <div style={{ background: '#fff', display: 'inline-block', padding: 16, borderRadius: 8 }}>
          <QRCodeSVG value={input} size={size} />
        </div>
      )}
    </div>
  )
}

function CharCountTool() {
  const [input, setInput] = useState('')
  const chars = input.length
  const charsNoSpace = input.replace(/\s/g, '').length
  const words = input.trim() ? input.trim().split(/\s+/).length : 0
  const lines = input ? input.split('\n').length : 0
  const bytes = new TextEncoder().encode(input).length
  return (
    <div className="tool-panel">
      <h2>字符统计</h2>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="输入文本..." />
      <div className="stats">
        <div className="stat"><span className="num">{chars}</span> 字符</div>
        <div className="stat"><span className="num">{charsNoSpace}</span> 字符(去空格)</div>
        <div className="stat"><span className="num">{words}</span> 单词</div>
        <div className="stat"><span className="num">{lines}</span> 行</div>
        <div className="stat"><span className="num">{bytes}</span> 字节</div>
      </div>
    </div>
  )
}

function CaseConvTool() {
  const [input, setInput] = useState('')
  const upper = input.toUpperCase()
  const lower = input.toLowerCase()
  const title = input.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
  const toggle = input.replace(/[a-zA-Z]/g, c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())
  return (
    <div className="tool-panel">
      <h2>大小写转换</h2>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="输入文本..." />
      <div className="result"><label>全大写</label><textarea readOnly value={upper} /></div>
      <div className="result"><label>全小写</label><textarea readOnly value={lower} /></div>
      <div className="result"><label>首字母大写</label><textarea readOnly value={title} /></div>
      <div className="result"><label>大小写反转</label><textarea readOnly value={toggle} /></div>
    </div>
  )
}

function DedupTool() {
  const [input, setInput] = useState('')
  const [ignoreCase, setIgnoreCase] = useState(false)
  let lines = input.split('\n')
  let seen = new Set()
  if (ignoreCase) lines = lines.filter(l => { const k = l.trim().toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true })
  else lines = [...new Set(lines)]
  return (
    <div className="tool-panel">
      <h2>文本去重</h2>
      <label style={{ marginBottom: 12, display: 'block' }}><input type="checkbox" checked={ignoreCase} onChange={e => setIgnoreCase(e.target.checked)} /> 忽略大小写</label>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="每行一个..." style={{ minHeight: 150 }} />
      <div className="result"><label>去重后 ({lines.length} 行)</label><textarea readOnly value={lines.join('\n')} style={{ minHeight: 150 }} /></div>
    </div>
  )
}

function RegexTool() {
  const [input, setInput] = useState('')
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [result, setResult] = useState(null)
  const test = () => {
    try {
      const re = new RegExp(pattern, flags)
      const matches = [...input.matchAll(re)]
      if (matches.length === 0) { setResult({ type: 'info', text: '无匹配' }); return }
      setResult({ type: 'match', matches: matches.map(m => ({ full: m[0], groups: m.slice(1), index: m.index })) })
    } catch (e) { setResult({ type: 'error', text: e.message }) }
  }
  return (
    <div className="tool-panel">
      <h2>正则测试</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <span>/</span>
        <input value={pattern} onChange={e => setPattern(e.target.value)} placeholder="正则表达式" style={{ flex: 1 }} />
        <span>/</span>
        <input value={flags} onChange={e => setFlags(e.target.value)} placeholder="g" style={{ width: 60 }} />
        <button className="primary" onClick={test}>测试</button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="测试文本..." style={{ minHeight: 120 }} />
      {result?.type === 'error' && <p className="error">{result.text}</p>}
      {result?.type === 'info' && <p>{result.text}</p>}
      {result?.type === 'match' && (
        <div className="result">
          <label>匹配 {result.matches.length} 个</label>
          <div className="regex-matches">
            {result.matches.map((m, i) => (
              <div key={i} className="regex-match">
                <span className="idx">#{i + 1} (位置 {m.index})</span>
                <code>{m.full}</code>
                {m.groups.filter(Boolean).length > 0 && <span>捕获组: {m.groups.join(', ')}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MarkdownTool() {
  const [input, setInput] = useState('# Hello\n\n**粗体** *斜体*\n\n- 列表项 1\n- 列表项 2\n\n`code`')
  const render = text => {
    let html = text
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/~~(.+?)~~/g, '<del>$1</del>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/^\- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>')
    return html
  }
  return (
    <div className="tool-panel">
      <h2>Markdown 预览</h2>
      <div className="split-view">
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="输入 Markdown..." />
        <div className="md-preview" dangerouslySetInnerHTML={{ __html: render(input) }} />
      </div>
    </div>
  )
}

function TimestampTool() {
  const [mode, setMode] = useState('toDate')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const convert = () => {
    if (mode === 'toDate') {
      const ts = parseInt(input)
      if (isNaN(ts)) { setOutput('请输入有效时间戳'); return }
      const d = new Date(ts * (input.length > 10 ? 1 : 1000))
      setOutput(d.toLocaleString('zh-CN', { hour12: false }) + '\n' + d.toISOString())
    } else {
      const d = new Date(input)
      if (isNaN(d.getTime())) { setOutput('请输入有效日期'); return }
      setOutput(`秒: ${Math.floor(d.getTime() / 1000)}\n毫秒: ${d.getTime()}`)
    }
  }
  return (
    <div className="tool-panel">
      <h2>时间戳转换</h2>
      <div className="btn-group">
        <button className={mode === 'toDate' ? 'active' : ''} onClick={() => setMode('toDate')}>时间戳 → 日期</button>
        <button className={mode === 'toDate' ? '' : 'active'} onClick={() => setMode('toDate' ? '' : 'active')}>日期 → 时间戳</button>
      </div>
      <div style={{ marginTop: 12 }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'toDate' ? '输入时间戳...' : '2025-06-20 21:00:00'} style={{ flex: 1 }} />
        <button className="primary" onClick={convert} style={{ marginLeft: 8 }}>转换</button>
      </div>
      {output && <div className="result" style={{ marginTop: 12 }}><textarea readOnly value={output} style={{ minHeight: 60 }} /></div>}
    </div>
  )
}

function ColorTool() {
  const [hex, setHex] = useState('#3b82f6')
  const [rgb, setRgb] = useState('')
  const [hsl, setHsl] = useState('')
  const update = (h) => {
    setHex(h)
    const r = parseInt(h.slice(1, 3), 16)
    const g = parseInt(h.slice(3, 5), 16)
    const b = parseInt(h.slice(5, 7), 16)
    setRgb(`rgb(${r}, ${g}, ${b})`)
    const rf = r / 255, gf = g / 255, bf = b / 255
    const max = Math.max(rf, gf, bf), min = Math.min(rf, gf, bf)
    let hh = 0, s = 0, l = (max + min) / 2
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      hh = max === rf ? ((gf - bf) / d + (gf < bf ? 6 : 0)) : max === gf ? ((bf - rf) / d + 2) : ((rf - gf) / d + 4)
      hh *= 60
    }
    setHsl(`hsl(${Math.round(hh)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`)
  }
  useState(() => update(hex))
  return (
    <div className="tool-panel">
      <h2>颜色转换</h2>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <input type="color" value={hex} onChange={e => update(e.target.value)} style={{ width: 60, height: 60, border: 'none', cursor: 'pointer' }} />
        <div>
          <div className="result"><label>HEX</label><input value={hex} onChange={e => update(e.target.value)} /></div>
          <div className="result"><label>RGB</label><input readOnly value={rgb} /></div>
          <div className="result"><label>HSL</label><input readOnly value={hsl} /></div>
        </div>
        <div style={{ width: 80, height: 80, borderRadius: 12, background: hex, border: '2px solid var(--border)' }} />
      </div>
    </div>
  )
}

function RadixTool() {
  const [input, setInput] = useState('255')
  const [from, setFrom] = useState(10)
  const n = parseInt(input, from)
  const valid = !isNaN(n) && n >= 0
  return (
    <div className="tool-panel">
      <h2>进制转换</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <select value={from} onChange={e => setFrom(+e.target.value)}>
          <option value={2}>二进制 (2)</option><option value={8}>八进制 (8)</option>
          <option value={10}>十进制 (10)</option><option value={16}>十六进制 (16)</option>
        </select>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="输入数值..." style={{ flex: 1 }} />
      </div>
      {valid && (
        <div className="stats">
          <div className="stat"><span className="num">{n.toString(2)}</span> 二进制</div>
          <div className="stat"><span className="num">{n.toString(8)}</span> 八进制</div>
          <div className="stat"><span className="num">{n.toString(10)}</span> 十进制</div>
          <div className="stat"><span className="num">{n.toString(16).toUpperCase()}</span> 十六进制</div>
        </div>
      )}
    </div>
  )
}

function UnitTool() {
  const [cat, setCat] = useState('length')
  const [input, setInput] = useState('1')
  const [from, setFrom] = useState('m')
  const [to, setTo] = useState('km')
  const units = {
    length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, yd: 0.9144, ft: 0.3048, inch: 0.0254 },
    weight: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495 },
    temp: { celsius: 'c', fahrenheit: 'f', kelvin: 'k' },
  }
  let result = ''
  const val = parseFloat(input)
  if (!isNaN(val)) {
    if (cat === 'temp') {
      let c = val
      if (from === 'fahrenheit') c = (val - 32) * 5 / 9
      else if (from === 'kelvin') c = val - 273.15
      if (to === 'fahrenheit') result = (c * 9 / 5 + 32).toFixed(2) + ' °F'
      else if (to === 'kelvin') result = (c + 273.15).toFixed(2) + ' K'
      else result = c.toFixed(2) + ' °C'
    } else {
      result = (val * units[cat][from] / units[cat][to]).toFixed(6) + ' ' + to
    }
  }
  const unitKeys = cat === 'temp' ? ['celsius', 'fahrenheit', 'kelvin'] : Object.keys(units[cat])
  return (
    <div className="tool-panel">
      <h2>单位换算</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <select value={cat} onChange={e => { setCat(e.target.value); setFrom(unitKeys[0]); setTo(unitKeys[1]) }}>
          <option value="length">长度</option><option value="weight">重量</option><option value="temp">温度</option>
        </select>
        <input type="number" value={input} onChange={e => setInput(e.target.value)} style={{ width: 120 }} />
        <select value={from} onChange={e => setFrom(e.target.value)}>
          {unitKeys.map(u => <option key={u} value={u}>{u}</option>)}
        </select>
        <span>→</span>
        <select value={to} onChange={e => setTo(e.target.value)}>
          {unitKeys.map(u => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>
      {result && <div className="result"><input readOnly value={result} style={{ fontSize: 18, fontWeight: 'bold' }} /></div>}
    </div>
  )
}

function IPTool() {
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)
  const lookup = async (ip) => {
    setLoading(true)
    try {
      const r = await fetch(`https://ipapi.co/${ip || ''}/json/`)
      const d = await r.json()
      setOutput(d.error ? { error: d.reason } : d)
    } catch { setOutput({ error: '查询失败' }) }
    setLoading(false)
  }
  return (
    <div className="tool-panel">
      <h2>IP 查询</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input id="ip-input" placeholder="输入 IP（留空查本机）" style={{ flex: 1 }} />
        <button className="primary" onClick={() => lookup(document.getElementById('ip-input').value)} disabled={loading}>
          {loading ? '查询中...' : '查询'}
        </button>
      </div>
      {output?.error && <p className="error">{output.error}</p>}
      {output && !output.error && (
        <div className="stats">
          {['ip', 'city', 'region', 'country_name', 'org', 'timezone'].map(k =>
            output[k] ? <div className="stat" key={k}><span className="num">{output[k]}</span> {k}</div> : null
          )}
        </div>
      )}
    </div>
  )
}

function UATool() {
  const [ua, setUa] = useState(navigator.userAgent)
  const info = { '原始 UA': ua }
  if (ua.includes('Chrome')) info['浏览器'] = 'Chrome ' + ua.match(/Chrome\/(\S+)/)?.[1]
  else if (ua.includes('Firefox')) info['浏览器'] = 'Firefox ' + ua.match(/Firefox\/(\S+)/)?.[1]
  else if (ua.includes('Edg')) info['浏览器'] = 'Edge ' + ua.match(/Edg\/(\S+)/)?.[1]
  if (ua.includes('Windows')) info['系统'] = 'Windows ' + (ua.match(/Windows NT (\d+\.\d+)/)?.[1] || '')
  else if (ua.includes('Mac OS')) info['系统'] = 'macOS'
  else if (ua.includes('Linux')) info['系统'] = 'Linux'
  else if (ua.includes('Android')) info['系统'] = 'Android'
  else if (ua.includes('iPhone') || ua.includes('iPad')) info['系统'] = 'iOS'
  return (
    <div className="tool-panel">
      <h2>User-Agent 解析</h2>
      <textarea value={ua} onChange={e => setUa(e.target.value)} placeholder="粘贴 UA..." />
      <div className="stats" style={{ marginTop: 12 }}>
        {Object.entries(info).map(([k, v]) => <div className="stat" key={k}><span className="num">{v}</span> {k}</div>)}
      </div>
    </div>
  )
}

function HTTPStatusTool() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const codes = [
    [200, 'OK', '成功'], [201, 'Created', '已创建'], [204, 'No Content', '无内容'],
    [301, 'Moved Permanently', '永久重定向'], [302, 'Found', '临时重定向'], [304, 'Not Modified', '未修改'],
    [400, 'Bad Request', '请求错误'], [401, 'Unauthorized', '未授权'], [403, 'Forbidden', '禁止访问'], [404, 'Not Found', '未找到'], [405, 'Method Not Allowed', '方法不允许'], [429, 'Too Many Requests', '请求过多'],
    [500, 'Internal Server Error', '服务器错误'], [502, 'Bad Gateway', '网关错误'], [503, 'Service Unavailable', '服务不可用'], [504, 'Gateway Timeout', '网关超时'],
  ]
  const filtered = codes.filter(([c, en, zh]) => !search || String(c).includes(search) || en.toLowerCase().includes(search.toLowerCase()) || zh.includes(search))
  return (
    <div className="tool-panel">
      <h2>{t('tools.httpstatus.name')}</h2>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索状态码..." style={{ marginBottom: 12 }} />
      <div className="http-table">
        <div className="http-row header"><span>状态码</span><span>英文</span><span>中文</span></div>
        {filtered.map(([c, en, zh]) => (
          <div key={c} className="http-row">
            <span className="code">{c}</span><span>{en}</span><span>{zh}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Tool Registry ────────────────────────────────

const toolComponents = {
  md5: MD5Tool, sha: SHATool, base64: Base64Tool, urlcode: URLCodecTool,
  aes: AESTool, unicode: UnicodeTool, json: JSONTool, xml: XMLTool,
  sql: SQLTool, htmlentity: HTMLEntityTool, uuid: UUIDTool, password: PasswordTool,
  lorem: LoremTool, qrcode: QRCodeTool, charcount: CharCountTool, caseconv: CaseConvTool,
  dedup: DedupTool, regex: RegexTool, markdown: MarkdownTool, timestamp: TimestampTool,
  color: ColorTool, radix: RadixTool, unit: UnitTool, ip: IPTool,
  ua: UATool, httpstatus: HTTPStatusTool,
  // new encryption
  des: DESTool, rc4: RC4Tool, rabbit: RabbitTool, hmac: HMACTool, rsa: RSATool, sm4: SM4Tool,
  // codings
  escape: EscapeTool, morse: MorseTool, hex: HexTool, punycode: PunycodeTool,
  // format
  css: CSSFormat, htmlf: HTMLFormat, jsf: JSFormat,
  // generate
  randomnum: RandomNum, mac: MACTool, namegen: NameGen, barcode: Barcode,
  // text
  sort: SortTool, replace: ReplaceTool, pinyin: PinyinTool, trad: TradTool, reverse: ReverseTool, wordcount: WordCount,
  // convert
  rmbupper: RMBUpper, num2en: Num2En, roman: Roman,
  // network
  whois: WhoisTool, ssl: SSLTool, robots: RobotsTool, meta: MetaTool, source: SourceTool, spider: SpiderTool,
  // image
  img2base64: Img2Base64, base642img: Base642Img, colorpicker: ColorPickerTool, imgcompress: ImgCompress, favicon: FaviconTool, gridcut: GridCut,
  // math
  calc: CalcTool, bmi: BMITool, agecalc: AgeCalc, loan: LoanTool, area: AreaTool, prime: PrimeTool,
  // date
  calendar: CalendarTool, solarterm: SolarTerm, countdown: Countdown, timediff: TimeDiff, hour12: Hour12, zodiac: ZodiacTool, alarm: AlarmTool,
  // shortcut
  vscode: VSCodeShortcuts, excel: ExcelShortcuts, word: WordShortcuts, ppt: PPTShortcuts, ps: PSShortcuts, linux: LinuxCmds, git: GitCmds, regexlist: RegexList,
  // query
  phone: PhoneQuery, bankcard: BankQuery, license: LicenseQuery, idcard: IDCard, areacode: AreaCode, zipcode: ZipCode, university: University,
  // game
  dice: DiceTool, coin: CoinTool, reaction: ReactionTool, lucky: LuckyTool, eat: EatTool, bubble: BubbleTool,
}

// ─── Home Page ──────────────────────────────────────

function HomePage({ onSelectTool }) {
  const { t } = useTranslation()
  const [homeSearch, setHomeSearch] = useState('')
  
  const filteredCats = useMemo(() => {
    if (!homeSearch.trim()) return CATEGORIES
    const q = homeSearch.toLowerCase()
    return CATEGORIES.map(cat => {
      const filtered = cat.tools.filter(tid => {
        const name = t(`tools.${tid}.name`, '').toLowerCase()
        const desc = t(`tools.${tid}.desc`, '').toLowerCase()
        return name.includes(q) || desc.includes(q) || tid.includes(q)
      })
      return filtered.length ? { ...cat, tools: filtered } : null
    }).filter(Boolean)
  }, [homeSearch, t])

  const totalTools = CATEGORIES.reduce((sum, c) => sum + c.tools.length, 0)
  const totalCats = CATEGORIES.length

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1 className="home-title">{t('app.title')}</h1>
        <p className="home-subtitle">免费在线工具集合，涵盖加密、格式化、转换、查询等 {totalCats} 个分类</p>
        <div className="home-search">
          <input 
            value={homeSearch} 
            onChange={e => setHomeSearch(e.target.value)} 
            placeholder="搜索 {totalTools}+ 工具..." 
          />
        </div>
        <div className="home-stats">
          <div className="home-stat">
            <span className="home-stat-num">{totalTools}</span>
            <span className="home-stat-label">工具</span>
          </div>
          <div className="home-stat">
            <span className="home-stat-num">{totalCats}</span>
            <span className="home-stat-label">分类</span>
          </div>
          <div className="home-stat">
            <span className="home-stat-num">🔒</span>
            <span className="home-stat-label">本地运行</span>
          </div>
        </div>
      </div>

      {filteredCats.map(cat => (
        <div key={cat.key} className="home-section">
          <h2 className="home-section-title">{t(`categories.${cat.key}`)}</h2>
          <div className="home-tool-grid">
            {cat.tools.map(tid => (
              <button 
                key={tid} 
                className="home-tool-card"
                onClick={() => onSelectTool(tid)}
              >
                <span className="home-tool-icon">{getToolIcon(cat.key)}</span>
                <div className="home-tool-info">
                  <span className="home-tool-name">{t(`tools.${tid}.name`)}</span>
                  <span className="home-tool-desc">{t(`tools.${tid}.desc`)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
      {filteredCats.length === 0 && <p className="no-result">{t('app.noResult')}</p>}
      
      <footer className="home-footer">
        <p>在线工具箱 · 所有数据处理均在浏览器本地完成 · 无需上传</p>
      </footer>
    </div>
  )
}

function getToolIcon(cat) {
  const icons = {
    encrypt: '🔐', codings: '🔣', format: '📝', generate: '🎲',
    text: '📄', convert: '🔄', network: '🌐', image: '🖼️',
    math: '📐', date: '📅', shortcut: '📋', query: '🔍', game: '🎮'
  }
  return icons[cat] || '🔧'
}

// ─── Main App ─────────────────────────────────────

export default function App() {
  const { t, i18n } = useTranslation()
  const [activeTool, setActiveTool] = useState(null)
  const [search, setSearch] = useState('')
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    document.body.className = next ? 'dark' : ''
  }
  if (dark) document.body.className = 'dark'

  const switchLang = (lng) => i18n.changeLanguage(lng)

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return CATEGORIES
    const q = search.toLowerCase()
    return CATEGORIES.map(cat => {
      const filtered = cat.tools.filter(tid => {
        const name = t(`tools.${tid}.name`, '').toLowerCase()
        const desc = t(`tools.${tid}.desc`, '').toLowerCase()
        return name.includes(q) || desc.includes(q) || tid.includes(q)
      })
      return filtered.length ? { ...cat, tools: filtered } : null
    }).filter(Boolean)
  }, [search, t])

  const ActiveComponent = toolComponents[activeTool] || (() => <p>{t('app.noResult')}</p>)

  return (
    <div className="app">
      {/* Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      
      {/* Sidebar Drawer */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1>{t('app.title')}</h1>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>
        <div className="search-box">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('app.search')} />
        </div>
        <nav>
          {filteredCategories.map(cat => (
            <div key={cat.key} className="cat-group">
              <div className="cat-title">{t(`categories.${cat.key}`)}</div>
              {cat.tools.map(tid => (
                <button key={tid} className={`tool-btn ${activeTool === tid ? 'active' : ''}`} onClick={() => { setActiveTool(tid); setSidebarOpen(false) }}>
                  <span className="tool-name">{t(`tools.${tid}.name`)}</span>
                  <span className="tool-desc">{t(`tools.${tid}.desc`)}</span>
                </button>
              ))}
            </div>
          ))}
          {filteredCategories.length === 0 && <p className="no-result">{t('app.noResult')}</p>}
        </nav>
      </aside>

      {/* Top Bar */}
      <header className="topbar">
        <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="21" y2="1" />
            <line x1="1" y1="9" x2="21" y2="9" />
            <line x1="1" y1="17" x2="21" y2="17" />
          </svg>
        </button>
        <h1 className="topbar-title" onClick={() => setActiveTool(null)} style={{ cursor: 'pointer' }}>{t('app.title')}</h1>
        <div className="topbar-actions">
          <button onClick={() => switchLang('zh')} className={i18n.language === 'zh' ? 'active' : ''}>中</button>
          <button onClick={() => switchLang('en')} className={i18n.language === 'en' ? 'active' : ''}>En</button>
          <button onClick={toggleDark} title={dark ? t('app.light') : t('app.dark')}>{dark ? '☀️' : '🌙'}</button>
        </div>
      </header>

      <main className="main">
        {activeTool ? <ActiveComponent /> : <HomePage onSelectTool={setActiveTool} />}
      </main>
    </div>
  )
}

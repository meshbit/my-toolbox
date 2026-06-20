import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import CryptoJS from 'crypto-js';
import { QRCodeSVG } from 'qrcode.react';

// ==================== ENCRYPTION TOOLS (6) ====================

function DESTool() {
  const { t } = useTranslation();
  const [mode, setMode] = useState('encrypt');
  const [key, setKey] = useState('');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const process = () => {
    setError('');
    try {
      if (!key || !input) { setError('请输入密钥和文本'); return; }
      if (mode === 'encrypt') {
        setResult(CryptoJS.DES.encrypt(input, key).toString());
      } else {
        const bytes = CryptoJS.DES.decrypt(input, key);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        setResult(decrypted || '解密失败，请检查密钥');
      }
    } catch (e) { setError('处理出错: ' + e.message); }
  };

  return (
    <div className="tool-panel">
      <h2>DES 加密/解密</h2>
      <p className="desc">使用 DES 算法进行数据加密和解密</p>
      <div className="tool-controls">
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="encrypt">加密</option>
          <option value="decrypt">解密</option>
        </select>
        <input type="text" placeholder="密钥" value={key} onChange={e => setKey(e.target.value)} />
        <button onClick={process}>执行</button>
      </div>
      <textarea placeholder="输入文本" value={input} onChange={e => setInput(e.target.value)} rows={5} />
      {error && <div className="error">{error}</div>}
      <textarea placeholder="结果" value={result} readOnly rows={5} />
    </div>
  );
}

function RC4Tool() {
  const { t } = useTranslation();
  const [mode, setMode] = useState('encrypt');
  const [key, setKey] = useState('');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const process = () => {
    setError('');
    try {
      if (!key || !input) { setError('请输入密钥和文本'); return; }
      if (mode === 'encrypt') {
        setResult(CryptoJS.RC4.encrypt(input, key).toString());
      } else {
        const bytes = CryptoJS.RC4.decrypt(input, key);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        setResult(decrypted || '解密失败，请检查密钥');
      }
    } catch (e) { setError('处理出错: ' + e.message); }
  };

  return (
    <div className="tool-panel">
      <h2>RC4 加密/解密</h2>
      <p className="desc">使用 RC4 流密码算法进行加解密</p>
      <div className="tool-controls">
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="encrypt">加密</option>
          <option value="decrypt">解密</option>
        </select>
        <input type="text" placeholder="密钥" value={key} onChange={e => setKey(e.target.value)} />
        <button onClick={process}>执行</button>
      </div>
      <textarea placeholder="输入文本" value={input} onChange={e => setInput(e.target.value)} rows={5} />
      {error && <div className="error">{error}</div>}
      <textarea placeholder="结果" value={result} readOnly rows={5} />
    </div>
  );
}

function RabbitTool() {
  const { t } = useTranslation();
  const [mode, setMode] = useState('encrypt');
  const [key, setKey] = useState('');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const process = () => {
    setError('');
    try {
      if (!key || !input) { setError('请输入密钥和文本'); return; }
      if (mode === 'encrypt') {
        setResult(CryptoJS.Rabbit.encrypt(input, key).toString());
      } else {
        const bytes = CryptoJS.Rabbit.decrypt(input, key);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        setResult(decrypted || '解密失败，请检查密钥');
      }
    } catch (e) { setError('处理出错: ' + e.message); }
  };

  return (
    <div className="tool-panel">
      <h2>Rabbit 加密/解密</h2>
      <p className="desc">使用 Rabbit 流密码算法进行加解密</p>
      <div className="tool-controls">
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="encrypt">加密</option>
          <option value="decrypt">解密</option>
        </select>
        <input type="text" placeholder="密钥" value={key} onChange={e => setKey(e.target.value)} />
        <button onClick={process}>执行</button>
      </div>
      <textarea placeholder="输入文本" value={input} onChange={e => setInput(e.target.value)} rows={5} />
      {error && <div className="error">{error}</div>}
      <textarea placeholder="结果" value={result} readOnly rows={5} />
    </div>
  );
}

function HMACTool() {
  const { t } = useTranslation();
  const [algo, setAlgo] = useState('SHA256');
  const [key, setKey] = useState('');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const compute = () => {
    setError('');
    try {
      if (!key || !input) { setError('请输入密钥和文本'); return; }
      const algos = { SHA1: CryptoJS.HmacSHA1, SHA256: CryptoJS.HmacSHA256, SHA512: CryptoJS.HmacSHA512 };
      setResult(algos[algo](input, key).toString());
    } catch (e) { setError('计算出错: ' + e.message); }
  };

  return (
    <div className="tool-panel">
      <h2>HMAC 消息认证码</h2>
      <p className="desc">计算 HMAC 消息认证码，支持 SHA1/SHA256/SHA512</p>
      <div className="tool-controls">
        <select value={algo} onChange={e => setAlgo(e.target.value)}>
          <option value="SHA1">SHA1</option>
          <option value="SHA256">SHA256</option>
          <option value="SHA512">SHA512</option>
        </select>
        <input type="text" placeholder="密钥" value={key} onChange={e => setKey(e.target.value)} />
        <button onClick={compute}>计算</button>
      </div>
      <textarea placeholder="输入文本" value={input} onChange={e => setInput(e.target.value)} rows={5} />
      {error && <div className="error">{error}</div>}
      <textarea placeholder="HMAC 结果" value={result} readOnly rows={3} />
    </div>
  );
}

function RSATool() {
  const { t } = useTranslation();
  const [pubKey, setPubKey] = useState('');
  const [privKey, setPrivKey] = useState('');

  const generate = () => {
    try {
      const arr = new Uint8Array(256);
      crypto.getRandomValues(arr);
      const pk = btoa(String.fromCharCode(...arr));
      const arr2 = new Uint8Array(256);
      crypto.getRandomValues(arr2);
      const sk = btoa(String.fromCharCode(...arr2));
      setPubKey('-----BEGIN PUBLIC KEY-----\n' + pk + '\n-----END PUBLIC KEY-----');
      setPrivKey('-----BEGIN RSA PRIVATE KEY-----\n' + sk + '\n-----END RSA PRIVATE KEY-----');
    } catch (e) {
      setPubKey('生成失败: ' + e.message);
    }
  };

  return (
    <div className="tool-panel">
      <h2>RSA 密钥对生成</h2>
      <p className="desc">生成模拟 RSA 2048 密钥对（浏览器端随机生成演示用）</p>
      <button onClick={generate}>生成密钥对</button>
      <textarea placeholder="公钥" value={pubKey} readOnly rows={6} />
      <textarea placeholder="私钥" value={privKey} readOnly rows={6} />
    </div>
  );
}

function SM4Tool() {
  const { t } = useTranslation();
  return (
    <div className="tool-panel">
      <h2>SM4 加密</h2>
      <p className="desc">国密 SM4 分组密码算法</p>
      <div className="info-box">
        <p>浏览器端暂不支持 SM4 加密，需要使用服务端实现。</p>
        <p>SM4 是中国国家密码管理局发布的分组密码算法标准，密钥长度 128 位。</p>
        <p>建议使用支持国密算法的后端服务或专用的国密库（如 gm-crypto）进行加解密。</p>
      </div>
    </div>
  );
}

// ==================== CODING TOOLS (4) ====================

function EscapeTool() {
  const { t } = useTranslation();
  const [mode, setMode] = useState('escape');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const process = () => {
    try {
      setResult(mode === 'escape' ? escape(input) : unescape(input));
    } catch (e) { setResult('处理出错: ' + e.message); }
  };

  return (
    <div className="tool-panel">
      <h2>URL 转义/反转义</h2>
      <p className="desc">对 URL 特殊字符进行编码和解码</p>
      <div className="tool-controls">
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="escape">转义 (escape)</option>
          <option value="unescape">反转义 (unescape)</option>
        </select>
        <button onClick={process}>转换</button>
      </div>
      <textarea placeholder="输入文本" value={input} onChange={e => setInput(e.target.value)} rows={5} />
      <textarea placeholder="结果" value={result} readOnly rows={5} />
    </div>
  );
}

function MorseTool() {
  const { t } = useTranslation();
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const morseMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
    "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
    '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
    ' ': '/'
  };
  const reverseMap = Object.fromEntries(Object.entries(morseMap).map(([k, v]) => [v, k]));

  const process = () => {
    try {
      if (mode === 'encode') {
        setResult(input.toUpperCase().split('').map(c => morseMap[c] || c).join(' '));
      } else {
        setResult(input.trim().split(/\s+/).map(c => reverseMap[c] || c).join(''));
      }
    } catch (e) { setResult('处理出错: ' + e.message); }
  };

  return (
    <div className="tool-panel">
      <h2>摩斯电码</h2>
      <p className="desc">文本与摩斯电码互转</p>
      <div className="tool-controls">
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="encode">文本 → 摩斯码</option>
          <option value="decode">摩斯码 → 文本</option>
        </select>
        <button onClick={process}>转换</button>
      </div>
      <textarea placeholder="输入" value={input} onChange={e => setInput(e.target.value)} rows={5} />
      <textarea placeholder="结果" value={result} readOnly rows={5} />
    </div>
  );
}

function HexTool() {
  const { t } = useTranslation();
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const process = () => {
    try {
      if (mode === 'encode') {
        setResult(input.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' '));
      } else {
        const hex = input.replace(/\s+/g, '');
        setResult(hex.match(/.{1,2}/g)?.map(h => String.fromCharCode(parseInt(h, 16))).join('') || '');
      }
    } catch (e) { setResult('处理出错: ' + e.message); }
  };

  return (
    <div className="tool-panel">
      <h2>十六进制转换</h2>
      <p className="desc">文本与十六进制编码互转</p>
      <div className="tool-controls">
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="encode">文本 → 十六进制</option>
          <option value="decode">十六进制 → 文本</option>
        </select>
        <button onClick={process}>转换</button>
      </div>
      <textarea placeholder="输入" value={input} onChange={e => setInput(e.target.value)} rows={5} />
      <textarea placeholder="结果" value={result} readOnly rows={5} />
    </div>
  );
}

function PunycodeTool() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('encode');

  const process = () => {
    try {
      if (mode === 'encode') {
        setResult('xn--' + input.split('').map(c => {
          const code = c.codePointAt(0);
          return code > 127 ? '-' + code.toString(36) : c;
        }).join('').replace(/[^a-zA-Z0-9-]/g, ''));
      } else {
        if (input.startsWith('xn--')) {
          setResult('Punycode 解码需要完整实现，可参考 RFC 3492。输入: ' + input);
        } else {
          setResult('请输入以 xn-- 开头的 Punycode 编码');
        }
      }
    } catch (e) { setResult('处理出错: ' + e.message); }
  };

  return (
    <div className="tool-panel">
      <h2>Punycode 编码</h2>
      <p className="desc">国际化域名 Punycode 编码/解码（简化版）</p>
      <div className="tool-controls">
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="encode">编码</option>
          <option value="decode">解码</option>
        </select>
        <button onClick={process}>转换</button>
      </div>
      <textarea placeholder="输入域名或 Punycode" value={input} onChange={e => setInput(e.target.value)} rows={4} />
      <textarea placeholder="结果" value={result} readOnly rows={4} />
    </div>
  );
}

// ==================== FORMAT TOOLS (3) ====================

function CSSFormat() {
  const { t } = useTranslation();
  const [mode, setMode] = useState('minify');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const process = () => {
    try {
      if (mode === 'minify') {
        let css = input
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/\s+/g, ' ')
          .replace(/\s*([{}:;,])\s*/g, '$1')
          .replace(/;}/g, '}')
          .trim();
        setResult(css);
      } else {
        let css = input
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/\s*([{}:;,])\s*/g, '$1')
          .replace(/}/g, '}\n')
          .replace(/{/g, ' {\n  ')
          .replace(/;/g, ';\n  ')
          .replace(/\n\s+\n/g, '\n')
          .trim();
        setResult(css);
      }
    } catch (e) { setResult('格式化出错: ' + e.message); }
  };

  return (
    <div className="tool-panel">
      <h2>CSS 格式化</h2>
      <p className="desc">CSS 代码压缩和美化</p>
      <div className="tool-controls">
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="minify">压缩</option>
          <option value="prettify">美化</option>
        </select>
        <button onClick={process}>格式化</button>
      </div>
      <textarea placeholder="输入 CSS 代码" value={input} onChange={e => setInput(e.target.value)} rows={8} />
      <textarea placeholder="结果" value={result} readOnly rows={8} />
    </div>
  );
}

function HTMLFormat() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const format = () => {
    try {
      let html = input;
      let indent = 0;
      const lines = html
        .replace(/></g, '>\n<')
        .replace(/>\s+</g, '>\n<')
        .split('\n');
      let formatted = lines.map(line => {
        line = line.trim();
        if (!line) return '';
        if (line.match(/^<\/\w/)) indent = Math.max(0, indent - 1);
        const out = '  '.repeat(indent) + line;
        if (line.match(/^<\w[^>]*[^/]>$/) && !line.match(/<(br|hr|img|input|meta|link|area|base|col|embed|source|track|wbr)[^>]*>$/i)) {
          indent++;
        }
        return out;
      }).join('\n');
      setResult(formatted);
    } catch (e) { setResult('格式化出错: ' + e.message); }
  };

  return (
    <div className="tool-panel">
      <h2>HTML 格式化</h2>
      <p className="desc">HTML 代码缩进格式化</p>
      <button onClick={format}>格式化</button>
      <textarea placeholder="输入 HTML 代码" value={input} onChange={e => setInput(e.target.value)} rows={8} />
      <textarea placeholder="格式化结果" value={result} readOnly rows={8} />
    </div>
  );
}

function JSFormat() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const format = () => {
    try {
      let js = input;
      js = js.replace(/([{[])/g, '$1\n  ').replace(/([}\]])/g, '\n$1');
      js = js.replace(/;\s*/g, ';\n');
      js = js.replace(/,\s*/g, ', ');
      const lines = js.split('\n');
      let indent = 0;
      const formatted = lines.map(line => {
        line = line.trim();
        if (!line) return '';
        if (line.match(/^[}\]][,;]?$/)) indent = Math.max(0, indent - 1);
        const out = '  '.repeat(indent) + line;
        if (line.match(/[{([]$/)) indent++;
        return out;
      }).join('\n');
      setResult(formatted);
    } catch (e) { setResult('格式化出错: ' + e.message); }
  };

  return (
    <div className="tool-panel">
      <h2>JS 格式化</h2>
      <p className="desc">JavaScript 代码简单格式化</p>
      <button onClick={format}>格式化</button>
      <textarea placeholder="输入 JavaScript 代码" value={input} onChange={e => setInput(e.target.value)} rows={8} />
      <textarea placeholder="格式化结果" value={result} readOnly rows={8} />
    </div>
  );
}

// ==================== GENERATOR TOOLS (4) ====================

function RandomNum() {
  const { t } = useTranslation();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState(null);

  const generate = () => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const range = Number(max) - Number(min) + 1;
    setResult(Number(min) + (array[0] % range));
  };

  return (
    <div className="tool-panel">
      <h2>随机数生成器</h2>
      <p className="desc">使用加密安全随机数生成器</p>
      <div className="tool-controls">
        <input type="number" placeholder="最小值" value={min} onChange={e => setMin(e.target.value)} style={{width:100}} />
        <span>~</span>
        <input type="number" placeholder="最大值" value={max} onChange={e => setMax(e.target.value)} style={{width:100}} />
        <button onClick={generate}>生成</button>
      </div>
      {result !== null && <div className="result-display" style={{fontSize:'2em',textAlign:'center',padding:'20px'}}>{result}</div>}
    </div>
  );
}

function MACTool() {
  const { t } = useTranslation();
  const [prefix, setPrefix] = useState('');
  const [result, setResult] = useState('');
  const [count, setCount] = useState(1);

  const generate = () => {
    const results = [];
    for (let i = 0; i < count; i++) {
      const arr = new Uint8Array(6);
      crypto.getRandomValues(arr);
      if (prefix) {
        const parts = prefix.split(':');
        for (let j = 0; j < Math.min(parts.length, 6); j++) {
          const val = parseInt(parts[j], 16);
          if (!isNaN(val)) arr[j] = val;
        }
      }
      arr[0] = (arr[0] & 0xFC) | 0x02;
      results.push(Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join(':'));
    }
    setResult(results.join('\n'));
  };

  return (
    <div className="tool-panel">
      <h2>MAC 地址生成器</h2>
      <p className="desc">生成随机 MAC 地址，可指定前缀</p>
      <div className="tool-controls">
        <input type="text" placeholder="前缀 (如 00:1A)" value={prefix} onChange={e => setPrefix(e.target.value)} />
        <input type="number" min="1" max="20" value={count} onChange={e => setCount(Number(e.target.value))} style={{width:60}} />
        <button onClick={generate}>生成</button>
      </div>
      <textarea placeholder="MAC 地址" value={result} readOnly rows={4} />
    </div>
  );
}

function NameGen() {
  const { t } = useTranslation();
  const [result, setResult] = useState('');

  const surnames = ['王','李','张','刘','陈','杨','赵','黄','周','吴','徐','孙','胡','朱','高','林','何','郭','马','罗','梁','宋','郑','谢','韩','唐','冯','于','董','萧','程','曹','袁','邓','许','傅','沈','曾','彭','吕','苏','卢','蒋','蔡','贾','丁','魏','薛','叶','阎','余','潘','杜','戴','夏','钟','汪','田','任','姜','范','方','石','姚','谭','廖','邹','熊','金','陆','郝','孔','白','崔','康','毛','邱','秦','江','史','顾','侯','邵','孟','龙','万','段','雷','钱','汤','尹','易','黎','常','武','乔','贺','赖','龚','文'];
  const givenNames = ['伟','芳','娜','敏','静','丽','强','磊','军','洋','勇','艳','杰','娟','涛','明','超','秀','霞','平','刚','桂','英','华','慧','飞','鑫','斌','宇','浩','凯','鹏','建','辉','玲','林','波','鹏','宁','欣','文','龙','蓉','峰','翔','凤','佳','颖','博','帅'];

  const generate = () => {
    const sn = surnames[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] % surnames.length)];
    const gn1 = givenNames[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] % givenNames.length)];
    const gn2 = givenNames[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] % givenNames.length)];
    setResult(prev => (prev ? prev + '\n' : '') + sn + gn1 + gn2);
  };

  return (
    <div className="tool-panel">
      <h2>中文姓名生成器</h2>
      <p className="desc">随机生成中文姓名</p>
      <button onClick={generate}>生成姓名</button>
      <button onClick={() => setResult('')} style={{marginLeft:8}}>清空</button>
      <textarea placeholder="生成的姓名" value={result} readOnly rows={6} />
    </div>
  );
}

function Barcode() {
  const { t } = useTranslation();
  const [text, setText] = useState('1234567890');
  const [barcodeLines, setBarcodeLines] = useState([]);

  const generate = () => {
    const lines = [];
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      for (let b = 6; b >= 0; b--) {
        lines.push({ black: !!(code & (1 << b)), key: i + '-' + b });
      }
    }
    setBarcodeLines(lines);
  };

  useEffect(() => { generate(); }, [text]);

  return (
    <div className="tool-panel">
      <h2>条形码模拟</h2>
      <p className="desc">输入文本生成模拟条形码</p>
      <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="输入文本" style={{width:'100%'}} />
      <div style={{display:'flex',height:80,alignItems:'flex-end',marginTop:10,overflow:'auto'}}>
        {barcodeLines.map(line => (
          <div key={line.key} style={{flex:'none',width:2,height:line.black?60:30,backgroundColor:line.black?'#000':'#fff',marginRight:1}} />
        ))}
      </div>
      <div style={{textAlign:'center',marginTop:5,fontSize:12,letterSpacing:4}}>{text}</div>
    </div>
  );
}

// ==================== TEXT TOOLS (6) ====================

function SortTool() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [order, setOrder] = useState('asc');
  const [result, setResult] = useState('');

  const sort = () => {
    const lines = input.split('\n').filter(l => l.trim() !== '' || input.includes('\n\n'));
    const sorted = order === 'asc' ? lines.sort((a, b) => a.localeCompare(b, 'zh')) : lines.sort((a, b) => b.localeCompare(a, 'zh'));
    setResult(sorted.join('\n'));
  };

  return (
    <div className="tool-panel">
      <h2>文本排序</h2>
      <p className="desc">按行排序文本，支持 A-Z 和 Z-A</p>
      <div className="tool-controls">
        <select value={order} onChange={e => setOrder(e.target.value)}>
          <option value="asc">升序 (A-Z)</option>
          <option value="desc">降序 (Z-A)</option>
        </select>
        <button onClick={sort}>排序</button>
      </div>
      <textarea placeholder="输入文本（每行一条）" value={input} onChange={e => setInput(e.target.value)} rows={6} />
      <textarea placeholder="排序结果" value={result} readOnly rows={6} />
    </div>
  );
}

function ReplaceTool() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [result, setResult] = useState('');
  const [useRegex, setUseRegex] = useState(false);

  const doReplace = () => {
    try {
      if (useRegex) {
        const regex = new RegExp(find, 'g');
        setResult(input.replace(regex, replace));
      } else {
        setResult(input.split(find).join(replace));
      }
    } catch (e) { setResult('替换出错: ' + e.message); }
  };

  return (
    <div className="tool-panel">
      <h2>文本替换</h2>
      <p className="desc">查找替换文本，支持正则表达式</p>
      <div className="tool-controls" style={{flexWrap:'wrap'}}>
        <input type="text" placeholder="查找" value={find} onChange={e => setFind(e.target.value)} />
        <input type="text" placeholder="替换为" value={replace} onChange={e => setReplace(e.target.value)} />
        <label><input type="checkbox" checked={useRegex} onChange={e => setUseRegex(e.target.checked)} /> 正则</label>
        <button onClick={doReplace}>替换</button>
      </div>
      <textarea placeholder="输入文本" value={input} onChange={e => setInput(e.target.value)} rows={5} />
      <textarea placeholder="替换结果" value={result} readOnly rows={5} />
    </div>
  );
}

function PinyinTool() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const pinyinMap = {
    '你':'nǐ','好':'hǎo','中':'zhōng','国':'guó','人':'rén','大':'dà','小':'xiǎo',
    '我':'wǒ','他':'tā','她':'tā','们':'men','是':'shì','的':'de','了':'le',
    '在':'zài','不':'bù','有':'yǒu','和':'hé','这':'zhè','那':'nà','个':'gè',
    '上':'shàng','下':'xià','来':'lái','去':'qù','说':'shuō','看':'kàn','想':'xiǎng',
    '学':'xué','习':'xí','工':'gōng','作':'zuò','家':'jiā','学':'xué','校':'xiào',
    '天':'tiān','地':'dì','水':'shuǐ','火':'huǒ','风':'fēng','山':'shān','月':'yuè',
    '日':'rì','年':'nián','时':'shí','今':'jīn','明':'míng','昨':'zuó',
    '吃':'chī','喝':'hē','走':'zǒu','跑':'pǎo','坐':'zuò','站':'zhàn',
    '爱':'ài','恨':'hèn','喜':'xǐ','欢':'huān','乐':'lè','悲':'bēi','怒':'nù',
    '男':'nán','女':'nǚ','老':'lǎo','少':'shào','父':'fù','母':'mǔ','儿':'ér',
    '手':'shǒu','心':'xīn','头':'tóu','眼':'yǎn','口':'kǒu','耳':'ěr',
    '一':'yī','二':'èr','三':'sān','四':'sì','五':'wǔ','六':'liù','七':'qī','八':'bā','九':'jiǔ','十':'shí',
    '百':'bǎi','千':'qiān','万':'wàn','亿':'yì',
    '红':'hóng','黄':'huáng','蓝':'lán','绿':'lǜ','白':'bái','黑':'hēi',
    '东':'dōng','西':'xī','南':'nán','北':'běi',
    '春':'chūn','夏':'xià','秋':'qiū','冬':'dōng',
    '金':'jīn','木':'mù','水':'shuǐ','火':'huǒ','土':'tǔ',
    '真':'zhēn','假':'jiǎ','对':'duì','错':'cuò','好':'hǎo','坏':'huài',
    '开':'kāi','关':'guān','进':'jìn','出':'chū','前':'qián','后':'hòu',
    '高':'gāo','低':'dī','长':'cháng','短':'duǎn','多':'duō','少':'shǎo',
    '快':'kuài','慢':'màn','新':'xīn','旧':'jiù','冷':'lěng','热':'rè',
  };

  const convert = () => {
    setResult(input.split('').map(c => pinyinMap[c] || c).join(' '));
  };

  return (
    <div className="tool-panel">
      <h2>拼音转换</h2>
      <p className="desc">中文汉字转拼音（基础常用字）</p>
      <button onClick={convert}>转换</button>
      <textarea placeholder="输入中文" value={input} onChange={e => setInput(e.target.value)} rows={3} />
      <textarea placeholder="拼音结果" value={result} readOnly rows={3} />
    </div>
  );
}

function TradTool() {
  const { t } = useTranslation();
  const [mode, setMode] = useState('s2t');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const s2t = {
    '国':'國','学':'學','习':'習','马':'馬','风':'風','爱':'愛','门':'門',
    '开':'開','关':'關','电':'電','车':'車','长':'長','对':'對','时':'時',
    '动':'動','万':'萬','边':'邊','过':'過','会':'會','发':'發','书':'書',
    '体':'體','头':'頭','买':'買','卖':'賣','实':'實','写':'寫','东':'東',
    '乐':'樂','亲':'親','义':'義','为':'為','网':'網','线':'線','节':'節',
    '飞':'飛','饭':'飯','饮':'飲','钱':'錢','铁':'鐵','龙':'龍','鸟':'鳥',
    '鱼':'魚','龟':'龜','齐':'齊','齿':'齒','龙':'龍','见':'見','贝':'貝',
    '页':'頁','风':'風','韦':'韋','飞':'飛','马':'馬','鱼':'魚','鸟':'鳥',
    '麦':'麥','黄':'黃','黾':'黽','齐':'齊','齿':'齒','龙':'龍','龟':'龜',
    '说':'說','话':'話','语':'語','读':'讀','课':'課','谁':'誰','认':'認',
    '识':'識','记':'記','让':'讓','请':'請','谢':'謝','证':'證','试':'試',
    '该':'該','论':'論','诗':'詩','词':'詞','讲':'講','调':'調','许':'許',
  };
  const t2s = Object.fromEntries(Object.entries(s2t).map(([k, v]) => [v, k]));

  const convert = () => {
    const map = mode === 's2t' ? s2t : t2s;
    setResult(input.split('').map(c => map[c] || c).join(''));
  };

  return (
    <div className="tool-panel">
      <h2>简繁转换</h2>
      <p className="desc">简体中文与繁体中文互转（常用字）</p>
      <div className="tool-controls">
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="s2t">简体 → 繁体</option>
          <option value="t2s">繁体 → 简体</option>
        </select>
        <button onClick={convert}>转换</button>
      </div>
      <textarea placeholder="输入文本" value={input} onChange={e => setInput(e.target.value)} rows={4} />
      <textarea placeholder="转换结果" value={result} readOnly rows={4} />
    </div>
  );
}

function ReverseTool() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const reverse = () => {
    setResult(input.split('').reverse().join(''));
  };

  return (
    <div className="tool-panel">
      <h2>文本反转</h2>
      <p className="desc">将输入文本字符顺序反转</p>
      <button onClick={reverse}>反转</button>
      <textarea placeholder="输入文本" value={input} onChange={e => setInput(e.target.value)} rows={4} />
      <textarea placeholder="反转结果" value={result} readOnly rows={4} />
    </div>
  );
}

function WordCount() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');

  const stats = useMemo(() => {
    const text = input;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split('\n').length : 0;
    const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;
    const bytes = new Blob([text]).size;
    return { chars, charsNoSpaces, words, lines, chineseChars, bytes };
  }, [input]);

  return (
    <div className="tool-panel">
      <h2>字数统计</h2>
      <p className="desc">统计字符数、单词数、行数、字节数等</p>
      <textarea placeholder="输入文本进行统计" value={input} onChange={e => setInput(e.target.value)} rows={6} />
      <div className="stats-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:10}}>
        <div>总字符: <strong>{stats.chars}</strong></div>
        <div>非空字符: <strong>{stats.charsNoSpaces}</strong></div>
        <div>单词数: <strong>{stats.words}</strong></div>
        <div>行数: <strong>{stats.lines}</strong></div>
        <div>中文字符: <strong>{stats.chineseChars}</strong></div>
        <div>字节数: <strong>{stats.bytes}</strong></div>
      </div>
    </div>
  );
}

// ==================== CONVERT TOOLS (3) ====================

function RMBUpper() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const digits = ['零','壹','贰','叁','肆','伍','陆','柒','捌','玖'];
  const units = ['','拾','佰','仟'];
  const bigUnits = ['','万','亿'];

  const convert = () => {
    try {
      const num = parseFloat(input);
      if (isNaN(num)) { setResult('请输入有效数字'); return; }
      const intPart = Math.floor(Math.abs(num));
      const decPart = Math.round((Math.abs(num) - intPart) * 100);
      let result = '';

      if (intPart === 0) {
        result = '零';
      } else {
        const intStr = intPart.toString();
        const groups = [];
        for (let i = intStr.length; i > 0; i -= 4) {
          groups.unshift(intStr.substring(Math.max(0, i - 4), i));
        }
        groups.forEach((group, gi) => {
          let groupResult = '';
          for (let i = 0; i < group.length; i++) {
            const d = parseInt(group[i]);
            const u = units[group.length - 1 - i];
            if (d === 0) {
              if (i < group.length - 1 && group[i+1] !== '0' && groupResult && !groupResult.endsWith('零')) {
                groupResult += '零';
              }
            } else {
              groupResult += digits[d] + u;
            }
          }
          if (groupResult) {
            result += groupResult + bigUnits[groups.length - 1 - gi];
          }
        });
        result = result.replace(/零+$/, '').replace(/零+/g, '零');
      }

      result += '元';
      if (decPart === 0) {
        result += '整';
      } else {
        const jiao = Math.floor(decPart / 10);
        const fen = decPart % 10;
        if (jiao > 0) result += digits[jiao] + '角';
        if (fen > 0) result += digits[fen] + '分';
      }
      setResult((num < 0 ? '负' : '') + result);
    } catch (e) { setResult('转换出错: ' + e.message); }
  };

  return (
    <div className="tool-panel">
      <h2>人民币大写</h2>
      <p className="desc">数字金额转中文大写</p>
      <div className="tool-controls">
        <input type="text" placeholder="输入金额" value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={convert}>转换</button>
      </div>
      <textarea placeholder="中文大写" value={result} readOnly rows={3} />
    </div>
  );
}

function Num2En() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
    'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  const numToWords = (n) => {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? '-' + ones[n % 10] : '');
    if (n < 1000) return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + numToWords(n % 100) : '');
    if (n < 1000000) return numToWords(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + numToWords(n % 1000) : '');
    return numToWords(Math.floor(n / 1000000)) + ' million' + (n % 1000000 ? ' ' + numToWords(n % 1000000) : '');
  };

  const convert = () => {
    const num = parseInt(input);
    if (isNaN(num) || num < 0 || num > 999999999) {
      setResult('请输入 0-999999999 之间的整数');
      return;
    }
    if (num === 0) { setResult('zero'); return; }
    setResult(numToWords(num));
  };

  return (
    <div className="tool-panel">
      <h2>数字转英文</h2>
      <p className="desc">数字转英文单词（0 - 999,999,999）</p>
      <div className="tool-controls">
        <input type="number" placeholder="输入数字" value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={convert}>转换</button>
      </div>
      <div className="result-display" style={{fontSize:'1.2em',padding:10}}>{result}</div>
    </div>
  );
}

function Roman() {
  const { t } = useTranslation();
  const [mode, setMode] = useState('toRoman');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const romanMap = [
    ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
    ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
    ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]
  ];
  const romanValues = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };

  const convert = () => {
    try {
      if (mode === 'toRoman') {
        let num = parseInt(input);
        if (isNaN(num) || num < 1 || num > 3999) { setResult('请输入 1-3999 的数字'); return; }
        let res = '';
        for (const [r, v] of romanMap) {
          while (num >= v) { res += r; num -= v; }
        }
        setResult(res);
      } else {
        let num = 0;
        let s = input.toUpperCase().trim();
        for (let i = 0; i < s.length; i++) {
          const cur = romanValues[s[i]];
          const next = romanValues[s[i+1]] || 0;
          if (cur < next) { num -= cur; } else { num += cur; }
        }
        setResult(num > 0 && num <= 3999 ? String(num) : '请输入有效的罗马数字 (1-3999)');
      }
    } catch (e) { setResult('转换出错: ' + e.message); }
  };

  return (
    <div className="tool-panel">
      <h2>罗马数字转换</h2>
      <p className="desc">数字与罗马数字互转 (1-3999)</p>
      <div className="tool-controls">
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="toRoman">数字 → 罗马</option>
          <option value="fromRoman">罗马 → 数字</option>
        </select>
        <input type="text" placeholder={mode==='toRoman'?'输入数字':'输入罗马数字'} value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={convert}>转换</button>
      </div>
      <textarea placeholder="结果" value={result} readOnly rows={2} />
    </div>
  );
}

// ==================== NETWORK TOOLS (6) ====================

function WhoisTool() {
  const { t } = useTranslation();
  const [domain, setDomain] = useState('');
  return (
    <div className="tool-panel">
      <h2>WHOIS 查询</h2>
      <p className="desc">域名 WHOIS 信息查询</p>
      <input type="text" placeholder="输入域名 (如 example.com)" value={domain} onChange={e => setDomain(e.target.value)} style={{width:'100%'}} />
      <div className="info-box" style={{marginTop:10}}>
        <p>浏览器端无法直接查询 WHOIS 信息（受跨域限制）。</p>
        <p>建议使用 <code>whois</code> 命令行工具或在线 WHOIS 服务进行查询。</p>
        <p>示例命令: <code>whois {domain || 'example.com'}</code></p>
        <p>在线服务: whois.aliyun.com, whois.chinaz.com 等</p>
      </div>
    </div>
  );
}

function SSLTool() {
  const { t } = useTranslation();
  const [domain, setDomain] = useState('');
  const [info, setInfo] = useState('');

  const check = async () => {
    setInfo('正在检查...');
    try {
      const url = domain.startsWith('http') ? domain : 'https://' + domain;
      const resp = await fetch(url, { mode: 'no-cors' });
      setInfo('已连接到 ' + domain + '\n浏览器安全策略限制，无法直接获取详细证书信息。\n建议使用 openssl 命令: openssl s_client -connect ' + domain + ':443 -servername ' + domain);
    } catch (e) {
      setInfo('连接失败: ' + e.message + '\n\n建议使用在线 SSL 检查工具或 openssl 命令行。');
    }
  };

  return (
    <div className="tool-panel">
      <h2>SSL 证书检查</h2>
      <p className="desc">检查网站 SSL 证书状态</p>
      <div className="tool-controls">
        <input type="text" placeholder="输入域名" value={domain} onChange={e => setDomain(e.target.value)} style={{flex:1}} />
        <button onClick={check}>检查</button>
      </div>
      <textarea placeholder="检查结果" value={info} readOnly rows={6} />
    </div>
  );
}

function RobotsTool() {
  const { t } = useTranslation();
  const [content, setContent] = useState(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

User-agent: Googlebot
Allow: /
Crawl-delay: 10

Sitemap: https://example.com/sitemap.xml`);

  const copy = () => {
    navigator.clipboard.writeText(content).then(() => alert('已复制'));
  };

  return (
    <div className="tool-panel">
      <h2>Robots.txt 编辑器</h2>
      <p className="desc">编辑和生成 robots.txt 文件</p>
      <textarea value={content} onChange={e => setContent(e.target.value)} rows={10} />
      <button onClick={copy} style={{marginTop:8}}>复制到剪贴板</button>
    </div>
  );
}

function MetaTool() {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState('');

  const generate = () => {
    const meta = `<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="keywords" content="${keywords}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">`;
    setResult(meta);
  };

  return (
    <div className="tool-panel">
      <h2>Meta 标签生成器</h2>
      <p className="desc">生成 SEO 相关的 meta 标签</p>
      <input type="text" placeholder="页面标题" value={title} onChange={e => setTitle(e.target.value)} style={{width:'100%',marginBottom:6}} />
      <textarea placeholder="页面描述" value={desc} onChange={e => setDesc(e.target.value)} rows={3} style={{marginBottom:6}} />
      <input type="text" placeholder="关键词（逗号分隔）" value={keywords} onChange={e => setKeywords(e.target.value)} style={{width:'100%',marginBottom:6}} />
      <button onClick={generate}>生成 Meta 标签</button>
      <textarea placeholder="生成的 Meta 标签" value={result} readOnly rows={8} />
    </div>
  );
}

function SourceTool() {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');

  const fetchSource = async () => {
    setResult('正在获取...');
    try {
      const resp = await fetch(url);
      const text = await resp.text();
      setResult(text.substring(0, 50000));
    } catch (e) {
      setResult('获取失败: ' + e.message + '\n\n提示: 由于跨域限制，可能需要目标网站允许 CORS。\n建议使用 CORS 代理或在服务端获取。');
    }
  };

  return (
    <div className="tool-panel">
      <h2>网页源码查看</h2>
      <p className="desc">获取网页 HTML 源代码</p>
      <div className="tool-controls">
        <input type="text" placeholder="输入 URL" value={url} onChange={e => setUrl(e.target.value)} style={{flex:1}} />
        <button onClick={fetchSource}>获取</button>
      </div>
      <textarea placeholder="网页源码" value={result} readOnly rows={12} style={{fontSize:12,fontFamily:'monospace'}} />
    </div>
  );
}

function SpiderTool() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const userAgents = [
    { name: 'Googlebot Desktop', ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
    { name: 'Googlebot Smartphone', ua: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
    { name: 'Bingbot', ua: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)' },
    { name: 'Baiduspider', ua: 'Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)' },
    { name: 'YandexBot', ua: 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)' },
    { name: 'DuckDuckBot', ua: 'DuckDuckBot/1.0; (+http://duckduckgo.com/duckduckbot.html)' },
    { name: 'Sogou Spider', ua: 'Sogou web spider/4.0(+http://www.sogou.com/docs/help/webmasters.htm#07)' },
    { name: '360Spider', ua: 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0); 360Spider' },
    { name: 'Applebot', ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B410 Safari/600.1.4 (Applebot/0.1; +http://www.apple.com/go/applebot)' },
    { name: 'Slurp (Yahoo)', ua: 'Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)' },
    { name: 'AhrefsBot', ua: 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)' },
    { name: 'SemrushBot', ua: 'Mozilla/5.0 (compatible; SemrushBot/7~bl; +http://www.semrush.com/bot.html)' },
  ];

  const filtered = userAgents.filter(ua => ua.name.toLowerCase().includes(search.toLowerCase()) || ua.ua.toLowerCase().includes(search.toLowerCase()));

  const copy = (text) => {
    navigator.clipboard.writeText(text).then(() => alert('已复制'));
  };

  return (
    <div className="tool-panel">
      <h2>爬虫 User-Agent 列表</h2>
      <p className="desc">常见搜索引擎爬虫 User-Agent，点击复制</p>
      <input type="text" placeholder="搜索 User-Agent..." value={search} onChange={e => setSearch(e.target.value)} style={{width:'100%',marginBottom:8}} />
      <div style={{maxHeight:400,overflow:'auto'}}>
        {filtered.map((ua, i) => (
          <div key={i} style={{border:'1px solid #ddd',padding:8,marginBottom:6,borderRadius:4,cursor:'pointer'}} onClick={() => copy(ua.ua)}>
            <strong>{ua.name}</strong>
            <div style={{fontSize:11,color:'#666',wordBreak:'break-all',marginTop:4}}>{ua.ua}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== IMAGE TOOLS (6) ====================

function Img2Base64() {
  const { t } = useTranslation();
  const [base64, setBase64] = useState('');
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');

  const handleFile = (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('请选择图片文件'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      setBase64(reader.result);
      setPreview(reader.result);
    };
    reader.onerror = () => setError('读取文件失败');
    reader.readAsDataURL(file);
  };

  const copy = () => {
    navigator.clipboard.writeText(base64).then(() => alert('已复制 Base64'));
  };

  return (
    <div className="tool-panel">
      <h2>图片转 Base64</h2>
      <p className="desc">将图片文件转换为 Base64 编码</p>
      <input type="file" accept="image/*" onChange={handleFile} />
      {error && <div className="error">{error}</div>}
      {preview && <img src={preview} alt="preview" style={{maxWidth:'100%',maxHeight:200,marginTop:8}} />}
      <textarea placeholder="Base64 编码" value={base64.substring(0, 500)} readOnly rows={4} />
      {base64 && <button onClick={copy} style={{marginTop:4}}>复制 Base64</button>}
    </div>
  );
}

function Base642Img() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [src, setSrc] = useState('');
  const [error, setError] = useState('');

  const preview = () => {
    setError('');
    try {
      if (!input.startsWith('data:image')) {
        setSrc('data:image/png;base64,' + input);
      } else {
        setSrc(input);
      }
    } catch (e) { setError('无效的 Base64 编码'); }
  };

  return (
    <div className="tool-panel">
      <h2>Base64 转图片</h2>
      <p className="desc">将 Base64 编码还原为图片</p>
      <textarea placeholder="输入 Base64 编码" value={input} onChange={e => setInput(e.target.value)} rows={4} />
      <button onClick={preview} style={{marginTop:6}}>预览</button>
      {error && <div className="error">{error}</div>}
      {src && <img src={src} alt="decoded" style={{maxWidth:'100%',maxHeight:300,marginTop:8}} onError={() => setError('图片加载失败，请检查编码')} />}
    </div>
  );
}

function ColorPickerTool() {
  const { t } = useTranslation();
  const [color, setColor] = useState('#ff6600');

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return { r, g, b };
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  return (
    <div className="tool-panel">
      <h2>颜色选择器</h2>
      <p className="desc">选择颜色并查看 HEX/RGB/HSL 值</p>
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{width:60,height:60,border:'none',cursor:'pointer'}} />
        <div>
          <div><strong>HEX:</strong> {color}</div>
          <div><strong>RGB:</strong> rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
          <div><strong>HSL:</strong> hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</div>
        </div>
      </div>
      <div style={{width:'100%',height:80,backgroundColor:color,marginTop:12,borderRadius:6}} />
    </div>
  );
}

function ImgCompress() {
  const { t } = useTranslation();
  const [quality, setQuality] = useState(0.8);
  const [result, setResult] = useState('');
  const [origSize, setOrigSize] = useState(0);
  const [error, setError] = useState('');
  const canvasRef = useRef(null);

  const handleFile = (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('请选择图片文件'); return; }
    setOrigSize(file.size);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        setResult(compressed);
        const compressedSize = Math.round(compressed.length * 0.75);
        setError(`原始大小: ${(file.size/1024).toFixed(1)}KB → 压缩后约: ${(compressedSize/1024).toFixed(1)}KB`);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="tool-panel">
      <h2>图片压缩</h2>
      <p className="desc">使用 Canvas 压缩图片 (JPEG)</p>
      <input type="file" accept="image/*" onChange={handleFile} />
      <div style={{marginTop:8}}>
        <label>压缩质量: {Math.round(quality * 100)}%</label>
        <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={e => setQuality(Number(e.target.value))} style={{width:'100%'}} />
      </div>
      <canvas ref={canvasRef} style={{display:'none'}} />
      {error && <div className="info-box">{error}</div>}
      {result && (
        <div style={{marginTop:8}}>
          <img src={result} alt="compressed" style={{maxWidth:'100%',maxHeight:200}} />
          <br/>
          <a href={result} download="compressed.jpg" style={{display:'inline-block',marginTop:6}}>下载压缩图片</a>
        </div>
      )}
    </div>
  );
}

function FaviconTool() {
  const { t } = useTranslation();
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('请选择图片文件'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="tool-panel">
      <h2>Favicon 生成</h2>
      <p className="desc">上传图片生成 favicon.ico 尺寸预览</p>
      <input type="file" accept="image/*" onChange={handleFile} />
      {error && <div className="error">{error}</div>}
      {preview && (
        <div style={{marginTop:10}}>
          <p>推荐尺寸预览:</p>
          <div style={{display:'flex',gap:12,alignItems:'center',flexWrap:'wrap'}}>
            <div style={{textAlign:'center'}}><img src={preview} alt="16x16" width={16} height={16} style={{border:'1px solid #ddd'}} /><div>16×16</div></div>
            <div style={{textAlign:'center'}}><img src={preview} alt="32x32" width={32} height={32} style={{border:'1px solid #ddd'}} /><div>32×32</div></div>
            <div style={{textAlign:'center'}}><img src={preview} alt="48x48" width={48} height={48} style={{border:'1px solid #ddd'}} /><div>48×48</div></div>
            <div style={{textAlign:'center'}}><img src={preview} alt="64x64" width={64} height={64} style={{border:'1px solid #ddd'}} /><div>64×64</div></div>
          </div>
          <p style={{marginTop:10,fontSize:13,color:'#666'}}>
            提示：浏览器端无法直接生成 .ico 文件。建议下载后使用在线工具或 ImageMagick 转换：<br/>
            <code>convert favicon.png -resize 32x32 favicon.ico</code>
          </p>
        </div>
      )}
    </div>
  );
}

function GridCut() {
  const { t } = useTranslation();
  const [preview, setPreview] = useState('');
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(3);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="tool-panel">
      <h2>图片网格切割</h2>
      <p className="desc">上传图片预览网格切割效果</p>
      <input type="file" accept="image/*" onChange={handleFile} />
      <div className="tool-controls" style={{marginTop:8}}>
        <label>列: <input type="number" min="1" max="10" value={cols} onChange={e => setCols(Number(e.target.value))} style={{width:60}} /></label>
        <label>行: <input type="number" min="1" max="10" value={rows} onChange={e => setRows(Number(e.target.value))} style={{width:60}} /></label>
      </div>
      {preview && (
        <div style={{position:'relative',display:'inline-block',marginTop:10}}>
          <img src={preview} alt="grid preview" style={{maxWidth:300,maxHeight:300,display:'block'}} />
          <div style={{position:'absolute',top:0,left:0,right:0,bottom:0}}>
            {Array.from({length: rows - 1}, (_, i) => (
              <div key={'hr'+i} style={{position:'absolute',top:((i+1)/rows*100)+'%',left:0,right:0,borderTop:'1px dashed red'}} />
            ))}
            {Array.from({length: cols - 1}, (_, i) => (
              <div key={'vr'+i} style={{position:'absolute',left:((i+1)/cols*100)+'%',top:0,bottom:0,borderLeft:'1px dashed red'}} />
            ))}
          </div>
        </div>
      )}
      <p style={{marginTop:8,fontSize:13,color:'#666'}}>提示：浏览器端完整切割需要 Canvas 处理，此处仅展示网格预览效果。</p>
    </div>
  );
}

// ==================== MATH TOOLS (6) ====================

function CalcTool() {
  const { t } = useTranslation();
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [error, setError] = useState('');

  const handleClick = (val) => {
    setError('');
    if (val === 'C') { setDisplay('0'); setExpression(''); return; }
    if (val === '=') {
      try {
        const sanitized = expression.replace(/[^0-9+\-*/.()]/g, '');
        const result = Function('"use strict"; return (' + sanitized + ')')();
        setDisplay(String(result));
        setExpression(String(result));
      } catch (e) { setError('计算错误'); }
      return;
    }
    const newExp = expression === '' || expression === String(display) ? (display === '0' ? val : display + val) : expression + val;
    setExpression(newExp);
    setDisplay(newExp);
  };

  const buttons = ['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+','C'];

  return (
    <div className="tool-panel">
      <h2>计算器</h2>
      <p className="desc">基础四则运算计算器</p>
      <div className="calc-display" style={{background:'#333',color:'#fff',padding:15,fontSize:'1.5em',textAlign:'right',borderRadius:6,marginBottom:8,minHeight:50}}>
        {display}
      </div>
      {error && <div className="error">{error}</div>}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:4}}>
        {buttons.map(b => (
          <button key={b} onClick={() => handleClick(b)}
            style={{padding:15,fontSize:'1.1em',background:b==='='?'#f90':b==='C'?'#e55':'#555',color:'#fff',border:'none',borderRadius:4,cursor:'pointer'}}>
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}

function BMITool() {
  const { t } = useTranslation();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState('');

  const calc = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) { setResult('请输入有效身高和体重'); return; }
    const bmi = w / (h * h);
    let cat = '';
    if (bmi < 18.5) cat = '偏瘦';
    else if (bmi < 24) cat = '正常';
    else if (bmi < 28) cat = '偏胖';
    else cat = '肥胖';
    setResult(`BMI: ${bmi.toFixed(1)} (${cat})`);
  };

  return (
    <div className="tool-panel">
      <h2>BMI 计算器</h2>
      <p className="desc">身体质量指数计算</p>
      <div className="tool-controls">
        <input type="number" placeholder="身高 (cm)" value={height} onChange={e => setHeight(e.target.value)} />
        <input type="number" placeholder="体重 (kg)" value={weight} onChange={e => setWeight(e.target.value)} />
        <button onClick={calc}>计算</button>
      </div>
      <div className="result-display" style={{fontSize:'1.3em',textAlign:'center',padding:16}}>{result}</div>
    </div>
  );
}

function AgeCalc() {
  const { t } = useTranslation();
  const [birthday, setBirthday] = useState('');
  const [age, setAge] = useState('');

  const calc = () => {
    if (!birthday) { setAge(''); return; }
    const birth = new Date(birthday);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) { months--; const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0); days += prevMonth.getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
    setAge(`${years} 岁 ${months} 个月 ${days} 天 (共 ${totalDays} 天)`);
  };

  return (
    <div className="tool-panel">
      <h2>年龄计算器</h2>
      <p className="desc">根据生日计算年龄</p>
      <div className="tool-controls">
        <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
        <button onClick={calc}>计算</button>
      </div>
      <div className="result-display" style={{fontSize:'1.2em',textAlign:'center',padding:16}}>{age}</div>
    </div>
  );
}

function LoanTool() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState('');

  const calc = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    if (!p || !r || !n || p <= 0 || r < 0 || n <= 0) { setResult('请输入有效参数'); return; }
    const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    const totalInt = total - p;
    setResult(`月供: ${monthly.toFixed(2)} 元\n总还款: ${total.toFixed(2)} 元\n总利息: ${totalInt.toFixed(2)} 元`);
  };

  return (
    <div className="tool-panel">
      <h2>贷款计算器（等额本息）</h2>
      <p className="desc">计算等额本息还款月供</p>
      <div style={{display:'flex',flexDirection:'column',gap:6}}>
        <input type="number" placeholder="贷款金额（万元）" value={amount} onChange={e => setAmount(e.target.value)} />
        <input type="number" placeholder="年利率 (%)" value={rate} onChange={e => setRate(e.target.value)} step="0.01" />
        <input type="number" placeholder="贷款年限" value={years} onChange={e => setYears(e.target.value)} />
        <button onClick={calc}>计算</button>
      </div>
      <textarea placeholder="计算结果" value={result} readOnly rows={4} />
    </div>
  );
}

function AreaTool() {
  const { t } = useTranslation();
  const [shape, setShape] = useState('circle');
  const [params, setParams] = useState({});
  const [result, setResult] = useState('');

  const calc = () => {
    let area = 0;
    switch (shape) {
      case 'circle': {
        const r = parseFloat(params.r);
        if (!r || r <= 0) { setResult('请输入有效半径'); return; }
        area = Math.PI * r * r;
        break;
      }
      case 'rect': {
        const w = parseFloat(params.w); const h = parseFloat(params.h);
        if (!w || !h || w <= 0 || h <= 0) { setResult('请输入有效长宽'); return; }
        area = w * h; break;
      }
      case 'triangle': {
        const b = parseFloat(params.b); const h = parseFloat(params.h);
        if (!b || !h || b <= 0 || h <= 0) { setResult('请输入有效底和高'); return; }
        area = 0.5 * b * h; break;
      }
    }
    setResult(`面积: ${area.toFixed(2)}`);
  };

  return (
    <div className="tool-panel">
      <h2>面积计算器</h2>
      <p className="desc">计算圆形、矩形、三角形面积</p>
      <div className="tool-controls">
        <select value={shape} onChange={e => { setShape(e.target.value); setParams({}); setResult(''); }}>
          <option value="circle">圆形</option>
          <option value="rect">矩形</option>
          <option value="triangle">三角形</option>
        </select>
        <button onClick={calc}>计算</button>
      </div>
      {shape === 'circle' && <input type="number" placeholder="半径" value={params.r || ''} onChange={e => setParams({r:e.target.value})} />}
      {shape === 'rect' && <><input type="number" placeholder="宽" value={params.w || ''} onChange={e => setParams({...params,w:e.target.value})} /><input type="number" placeholder="高" value={params.h || ''} onChange={e => setParams({...params,h:e.target.value})} /></>}
      {shape === 'triangle' && <><input type="number" placeholder="底" value={params.b || ''} onChange={e => setParams({...params,b:e.target.value})} /><input type="number" placeholder="高" value={params.h || ''} onChange={e => setParams({...params,h:e.target.value})} /></>}
      <div className="result-display" style={{fontSize:'1.2em',textAlign:'center',padding:16}}>{result}</div>
    </div>
  );
}

function PrimeTool() {
  const { t } = useTranslation();
  const [n, setN] = useState(100);
  const [primes, setPrimes] = useState([]);

  const generate = () => {
    const limit = parseInt(n);
    if (limit < 2) { setPrimes([]); return; }
    const sieve = new Array(limit + 1).fill(true);
    sieve[0] = sieve[1] = false;
    for (let i = 2; i * i <= limit; i++) {
      if (sieve[i]) {
        for (let j = i * i; j <= limit; j += i) sieve[j] = false;
      }
    }
    const result = [];
    for (let i = 2; i <= limit; i++) if (sieve[i]) result.push(i);
    setPrimes(result);
  };

  return (
    <div className="tool-panel">
      <h2>质数生成器</h2>
      <p className="desc">使用埃氏筛法生成 N 以内的所有质数</p>
      <div className="tool-controls">
        <input type="number" placeholder="N" value={n} onChange={e => setN(e.target.value)} />
        <button onClick={generate}>生成</button>
      </div>
      <textarea placeholder="质数列表" value={primes.join(', ')} readOnly rows={6} />
      <div style={{marginTop:4,color:'#666'}}>共 {primes.length} 个质数</div>
    </div>
  );
}

// ==================== DATE TOOLS (7) ====================

function CalendarTool() {
  const { t } = useTranslation();
  const [date, setDate] = useState(new Date());

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setDate(new Date(year, month - 1, 1));
  const nextMonth = () => setDate(new Date(year, month + 1, 1));

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  while (days.length % 7 !== 0) days.push(null);

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="tool-panel">
      <h2>日历</h2>
      <p className="desc">月历视图</p>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <button onClick={prevMonth}>←</button>
        <strong>{year} 年 {month + 1} 月</strong>
        <button onClick={nextMonth}>→</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:2,textAlign:'center'}}>
        {weekDays.map(d => <div key={d} style={{fontWeight:'bold',padding:4}}>{d}</div>)}
        {days.map((d, i) => (
          <div key={i} style={{
            padding:6,
            background:d===new Date().getDate()&&month===new Date().getMonth()&&year===new Date().getFullYear()?'#4a90d9':d?'#f5f5f5':'transparent',
            color:d===new Date().getDate()&&month===new Date().getMonth()&&year===new Date().getFullYear()?'#fff':'#333',
            borderRadius:4,
            cursor:d?'pointer':'default'
          }}>{d || ''}</div>
        ))}
      </div>
    </div>
  );
}

function SolarTerm() {
  const { t } = useTranslation();
  const terms = [
    { name: '小寒', date: '2026-01-05' }, { name: '大寒', date: '2026-01-20' },
    { name: '立春', date: '2026-02-04' }, { name: '雨水', date: '2026-02-18' },
    { name: '惊蛰', date: '2026-03-05' }, { name: '春分', date: '2026-03-20' },
    { name: '清明', date: '2026-04-05' }, { name: '谷雨', date: '2026-04-20' },
    { name: '立夏', date: '2026-05-05' }, { name: '小满', date: '2026-05-21' },
    { name: '芒种', date: '2026-06-05' }, { name: '夏至', date: '2026-06-21' },
    { name: '小暑', date: '2026-07-07' }, { name: '大暑', date: '2026-07-22' },
    { name: '立秋', date: '2026-08-07' }, { name: '处暑', date: '2026-08-23' },
    { name: '白露', date: '2026-09-07' }, { name: '秋分', date: '2026-09-23' },
    { name: '寒露', date: '2026-10-08' }, { name: '霜降', date: '2026-10-23' },
    { name: '立冬', date: '2026-11-07' }, { name: '小雪', date: '2026-11-22' },
    { name: '大雪', date: '2026-12-07' }, { name: '冬至', date: '2026-12-22' },
  ];

  return (
    <div className="tool-panel">
      <h2>2026 年二十四节气</h2>
      <p className="desc">2026 年二十四节气日期表</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:4}}>
        {terms.map(t => (
          <div key={t.name} style={{padding:6,background:'#f9f9f9',borderRadius:4,textAlign:'center',fontSize:13}}>
            <div>{t.name}</div>
            <div style={{color:'#888'}}>{t.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Countdown() {
  const { t } = useTranslation();
  const [target, setTarget] = useState('');
  const [remaining, setRemaining] = useState('');

  useEffect(() => {
    if (!target) { setRemaining(''); return; }
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const t = new Date(target).getTime();
      const diff = t - now;
      if (diff <= 0) { setRemaining('已到达!'); clearInterval(timer); return; }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      setRemaining(`${days} 天 ${hours} 时 ${mins} 分 ${secs} 秒`);
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="tool-panel">
      <h2>倒计时</h2>
      <p className="desc">设置目标日期时间，实时显示倒计时</p>
      <input type="datetime-local" value={target} onChange={e => setTarget(e.target.value)} style={{width:'100%'}} />
      <div style={{fontSize:'1.5em',textAlign:'center',padding:20,fontWeight:'bold'}}>
        {remaining || '请选择日期'}
      </div>
    </div>
  );
}

function TimeDiff() {
  const { t } = useTranslation();
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [diff, setDiff] = useState('');

  const calc = () => {
    if (!start || !end) { setDiff(''); return; }
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    const ms = Math.abs(e - s);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    setDiff(`${days} 天 ${hours} 小时 ${mins} 分钟`);
  };

  return (
    <div className="tool-panel">
      <h2>时间差计算</h2>
      <p className="desc">计算两个日期时间之间的差值</p>
      <div style={{display:'flex',flexDirection:'column',gap:6}}>
        <label>开始: <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} style={{width:'100%'}} /></label>
        <label>结束: <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} style={{width:'100%'}} /></label>
        <button onClick={calc}>计算</button>
      </div>
      <div className="result-display" style={{fontSize:'1.2em',textAlign:'center',padding:16}}>{diff}</div>
    </div>
  );
}

function Hour12() {
  const { t } = useTranslation();
  const [mode, setMode] = useState('24to12');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const convert = () => {
    try {
      if (mode === '24to12') {
        const [h, m] = input.split(':').map(Number);
        if (isNaN(h) || isNaN(m)) { setResult('请输入 HH:MM 格式'); return; }
        const period = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        setResult(`${h12}:${String(m).padStart(2, '0')} ${period}`);
      } else {
        const parts = input.trim().split(/\s+/);
        const timePart = parts[0];
        const period = parts[1]?.toUpperCase();
        const [h, m] = timePart.split(':').map(Number);
        if (isNaN(h) || isNaN(m)) { setResult('请输入 HH:MM AM/PM 格式'); return; }
        let h24 = h;
        if (period === 'PM' && h !== 12) h24 += 12;
        if (period === 'AM' && h === 12) h24 = 0;
        setResult(`${String(h24).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
      }
    } catch (e) { setResult('转换出错'); }
  };

  return (
    <div className="tool-panel">
      <h2>12/24 小时制转换</h2>
      <p className="desc">12 小时制与 24 小时制互转</p>
      <div className="tool-controls">
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="24to12">24→12 小时</option>
          <option value="12to24">12→24 小时</option>
        </select>
        <input type="text" placeholder={mode==='24to12'?'14:30':'02:30 PM'} value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={convert}>转换</button>
      </div>
      <textarea placeholder="结果" value={result} readOnly rows={2} />
    </div>
  );
}

function ZodiacTool() {
  const { t } = useTranslation();
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [result, setResult] = useState('');

  const zodiac = ['猴','鸡','狗','猪','鼠','牛','虎','兔','龙','蛇','马','羊'];

  const calc = () => {
    const y = parseInt(year);
    if (!y) { setResult('请输入有效年份'); return; }
    setResult(`${y} 年是 ${zodiac[y % 12]}年`);
  };

  return (
    <div className="tool-panel">
      <h2>生肖查询</h2>
      <p className="desc">根据年份查询生肖</p>
      <div className="tool-controls">
        <input type="number" placeholder="输入年份" value={year} onChange={e => setYear(e.target.value)} />
        <button onClick={calc}>查询</button>
      </div>
      <div className="result-display" style={{fontSize:'1.5em',textAlign:'center',padding:16}}>{result}</div>
    </div>
  );
}

function AlarmTool() {
  const { t } = useTranslation();
  const [alarmTime, setAlarmTime] = useState('');
  const [isSet, setIsSet] = useState(false);
  const [message, setMessage] = useState('');
  const timerRef = useRef(null);

  const setAlarm = () => {
    if (!alarmTime) { setMessage('请设置时间'); return; }
    const now = new Date();
    const [h, m] = alarmTime.split(':').map(Number);
    const alarm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
    if (alarm <= now) alarm.setDate(alarm.getDate() + 1);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      const now = new Date();
      if (now >= alarm) {
        clearInterval(timerRef.current);
        setIsSet(false);
        setMessage('⏰ 时间到！');
        try {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.frequency.value = 800;
          gain.gain.value = 0.3;
          osc.start();
          setTimeout(() => { osc.stop(); audioCtx.close(); }, 1500);
        } catch(e) {}
      }
    }, 1000);

    setIsSet(true);
    setMessage(`闹钟已设置: ${alarm.toLocaleString()}`);
  };

  const cancel = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSet(false);
    setMessage('闹钟已取消');
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  return (
    <div className="tool-panel">
      <h2>闹钟</h2>
      <p className="desc">设置时间，到达后播放提示音</p>
      <input type="time" value={alarmTime} onChange={e => setAlarmTime(e.target.value)} style={{width:'100%'}} />
      <div style={{marginTop:8,display:'flex',gap:8}}>
        <button onClick={setAlarm} disabled={isSet}>设置闹钟</button>
        {isSet && <button onClick={cancel}>取消</button>}
      </div>
      <div className="result-display" style={{textAlign:'center',padding:12}}>{message}</div>
    </div>
  );
}

// ==================== SHORTCUT TOOLS (8) ====================

function ShortcutTable({ title, desc, data }) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const filtered = data.filter(item =>
    item.key.toLowerCase().includes(search.toLowerCase()) ||
    item.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="tool-panel">
      <h2>{title}</h2>
      <p className="desc">{desc}</p>
      <input type="text" placeholder="搜索..." value={search} onChange={e => setSearch(e.target.value)} style={{width:'100%',marginBottom:8}} />
      <div style={{maxHeight:400,overflow:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead><tr style={{background:'#f5f5f5'}}><th style={{padding:6,textAlign:'left',border:'1px solid #ddd'}}>快捷键</th><th style={{padding:6,textAlign:'left',border:'1px solid #ddd'}}>说明</th></tr></thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr key={i}><td style={{padding:6,border:'1px solid #ddd',fontFamily:'monospace',fontSize:13}}>{item.key}</td><td style={{padding:6,border:'1px solid #ddd',fontSize:13}}>{item.desc}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function VSCodeShortcuts() {
  return <ShortcutTable title="VS Code 快捷键" desc="常用 VS Code 快捷键速查" data={[
    {key:'Ctrl+P',desc:'快速打开文件'},{key:'Ctrl+Shift+P',desc:'命令面板'},{key:'Ctrl+`',desc:'打开终端'},
    {key:'Ctrl+B',desc:'切换侧栏'},{key:'Ctrl+D',desc:'选择下一个相同词'},{key:'Ctrl+Shift+L',desc:'选择所有相同词'},
    {key:'Alt+↑/↓',desc:'移动行'},{key:'Shift+Alt+↑/↓',desc:'复制行'},{key:'Ctrl+/',desc:'注释/取消注释'},
    {key:'Ctrl+Shift+K',desc:'删除行'},{key:'Ctrl+Enter',desc:'下方插入行'},{key:'Ctrl+Shift+Enter',desc:'上方插入行'},
    {key:'Ctrl+Shift+F',desc:'全局搜索'},{key:'Ctrl+G',desc:'跳转到行'},{key:'Ctrl+Shift+O',desc:'跳转到符号'},
    {key:'F2',desc:'重命名符号'},{key:'Ctrl+.',desc:'快速修复'},{key:'Ctrl+Shift+M',desc:'问题面板'},
    {key:'F5',desc:'调试/继续'},{key:'Ctrl+F5',desc:'运行不调试'},
  ]} />;
}

function ExcelShortcuts() {
  return <ShortcutTable title="Excel 快捷键" desc="常用 Excel 快捷键速查" data={[
    {key:'Ctrl+C/V/X',desc:'复制/粘贴/剪切'},{key:'Ctrl+Z/Y',desc:'撤销/重做'},{key:'Ctrl+B/I/U',desc:'加粗/斜体/下划线'},
    {key:'Ctrl+1',desc:'单元格格式'},{key:'Ctrl+Shift+L',desc:'筛选'},{key:'Alt+=',desc:'自动求和'},
    {key:'Ctrl+Shift+1',desc:'数字格式'},{key:'Ctrl+Home',desc:'到 A1'},{key:'Ctrl+End',desc:'到数据末尾'},
    {key:'Ctrl+Arrow',desc:'跳到数据边缘'},{key:'Ctrl+Shift+Arrow',desc:'选择到数据边缘'},{key:'Ctrl+A',desc:'全选'},
    {key:'Ctrl+Space',desc:'选择整列'},{key:'Shift+Space',desc:'选择整行'},{key:'Ctrl+-',desc:'删除单元格'},
    {key:'Ctrl+Shift++',desc:'插入单元格'},{key:'F2',desc:'编辑单元格'},{key:'F4',desc:'重复操作/切换引用'},
    {key:'Ctrl+T',desc:'创建表'},{key:'Alt+Enter',desc:'单元格内换行'},
  ]} />;
}

function WordShortcuts() {
  return <ShortcutTable title="Word 快捷键" desc="常用 Word 快捷键速查" data={[
    {key:'Ctrl+B/I/U',desc:'加粗/斜体/下划线'},{key:'Ctrl+C/V/X',desc:'复制/粘贴/剪切'},{key:'Ctrl+Z/Y',desc:'撤销/重做'},
    {key:'Ctrl+A',desc:'全选'},{key:'Ctrl+F',desc:'查找'},{key:'Ctrl+H',desc:'替换'},
    {key:'Ctrl+N/O/S',desc:'新建/打开/保存'},{key:'Ctrl+P',desc:'打印'},{key:'Ctrl+E/L/R',desc:'居中/左对齐/右对齐'},
    {key:'Ctrl+J',desc:'两端对齐'},{key:'Ctrl+1/2/5',desc:'单倍/双倍/1.5倍行距'},{key:'Ctrl+Enter',desc:'分页'},
    {key:'Ctrl+Shift+Enter',desc:'分栏'},{key:'F7',desc:'拼写检查'},{key:'F12',desc:'另存为'},
    {key:'Ctrl+Shift+>',desc:'增大字号'},{key:'Ctrl+Shift+<',desc:'减小字号'},{key:'Ctrl+]',desc:'增加缩进'},
    {key:'Ctrl+[',desc:'减少缩进'},{key:'Alt+Shift+D',desc:'插入日期'},
  ]} />;
}

function PPTShortcuts() {
  return <ShortcutTable title="PPT 快捷键" desc="常用 PPT 快捷键速查" data={[
    {key:'Ctrl+M',desc:'新建幻灯片'},{key:'Ctrl+D',desc:'复制幻灯片/对象'},{key:'Ctrl+C/V/X',desc:'复制/粘贴/剪切'},
    {key:'Ctrl+Z/Y',desc:'撤销/重做'},{key:'Ctrl+B/I/U',desc:'加粗/斜体/下划线'},{key:'Ctrl+A',desc:'全选'},
    {key:'F5',desc:'从头放映'},{key:'Shift+F5',desc:'从当前页放映'},{key:'Esc',desc:'退出放映'},
    {key:'Ctrl+G',desc:'组合'},{key:'Ctrl+Shift+G',desc:'取消组合'},{key:'Ctrl+Arrow',desc:'微移对象'},
    {key:'Ctrl+Shift+Arrow',desc:'缩放对象'},{key:'Alt+N',desc:'插入'},{key:'Ctrl+K',desc:'插入超链接'},
    {key:'B',desc:'黑屏(放映时)'},{key:'W',desc:'白屏(放映时)'},{key:'Ctrl+P',desc:'画笔(放映时)'},
    {key:'Ctrl+E',desc:'橡皮(放映时)'},{key:'Alt+F10',desc:'选择窗格'},
  ]} />;
}

function PSShortcuts() {
  return <ShortcutTable title="Photoshop 快捷键" desc="常用 PS 快捷键速查" data={[
    {key:'Ctrl+T',desc:'自由变换'},{key:'Ctrl+J',desc:'复制图层'},{key:'Ctrl+D',desc:'取消选区'},
    {key:'Ctrl+Shift+I',desc:'反选'},{key:'Ctrl+Alt+Z',desc:'多步撤销'},{key:'Ctrl+Shift+N',desc:'新建图层'},
    {key:'B',desc:'画笔工具'},{key:'E',desc:'橡皮擦'},{key:'G',desc:'渐变/油漆桶'},{key:'V',desc:'移动工具'},
    {key:'M',desc:'矩形选框'},{key:'L',desc:'套索工具'},{key:'W',desc:'魔棒工具'},{key:'C',desc:'裁剪工具'},
    {key:'I',desc:'吸管工具'},{key:'T',desc:'文字工具'},{key:'P',desc:'钢笔工具'},{key:'S',desc:'仿制图章'},
    {key:'Ctrl+L',desc:'色阶'},{key:'Ctrl+M',desc:'曲线'},{key:'Ctrl+U',desc:'色相饱和度'},
    {key:'Ctrl+Shift+Alt+E',desc:'盖印图层'},{key:'[',desc:'缩小画笔'},{key:']',desc:'放大画笔'},
  ]} />;
}

function LinuxCmds() {
  return <ShortcutTable title="Linux 常用命令" desc="常用 Linux 命令速查" data={[
    {key:'ls -la',desc:'列出所有文件详情'},{key:'cd /path',desc:'切换目录'},{key:'pwd',desc:'显示当前路径'},
    {key:'mkdir -p',desc:'创建目录'},{key:'rm -rf',desc:'强制删除'},{key:'cp -r',desc:'递归复制'},
    {key:'mv src dst',desc:'移动/重命名'},{key:'cat file',desc:'查看文件'},{key:'tail -f file',desc:'跟踪文件'},
    {key:'grep pattern file',desc:'搜索文本'},{key:'find . -name',desc:'查找文件'},{key:'chmod 755',desc:'修改权限'},
    {key:'chown user:group',desc:'修改所有者'},{key:'ps aux',desc:'查看进程'},{key:'kill -9 PID',desc:'强制终止进程'},
    {key:'top',desc:'系统监控'},{key:'df -h',desc:'磁盘空间'},{key:'du -sh *',desc:'目录大小'},
    {key:'tar -xzf',desc:'解压 tar.gz'},{key:'curl URL',desc:'HTTP 请求'},
    {key:'ssh user@host',desc:'SSH 连接'},{key:'scp file user@host:',desc:'远程复制'},
    {key:'systemctl status',desc:'服务状态'},{key:'journalctl -u svc',desc:'查看服务日志'},
  ]} />;
}

function GitCmds() {
  return <ShortcutTable title="Git 常用命令" desc="常用 Git 命令速查" data={[
    {key:'git init',desc:'初始化仓库'},{key:'git clone url',desc:'克隆仓库'},{key:'git status',desc:'查看状态'},
    {key:'git add .',desc:'暂存所有更改'},{key:'git commit -m',desc:'提交'},{key:'git push',desc:'推送'},
    {key:'git pull',desc:'拉取'},{key:'git branch',desc:'查看分支'},{key:'git checkout -b',desc:'创建并切换分支'},
    {key:'git merge branch',desc:'合并分支'},{key:'git rebase',desc:'变基'},{key:'git log --oneline',desc:'简洁日志'},
    {key:'git diff',desc:'查看差异'},{key:'git stash',desc:'暂存工作区'},{key:'git stash pop',desc:'恢复暂存'},
    {key:'git reset --hard',desc:'硬重置'},{key:'git revert',desc:'撤销提交'},{key:'git tag v1.0',desc:'创建标签'},
    {key:'git remote -v',desc:'查看远程'},{key:'git fetch',desc:'获取远程更新'},
  ]} />;
}

function RegexList() {
  return <ShortcutTable title="常用正则表达式" desc="正则表达式速查" data={[
    {key:'\\d+',desc:'匹配数字'},{key:'\\w+',desc:'匹配字母数字下划线'},{key:'\\s+',desc:'匹配空白字符'},
    {key:'^abc',desc:'以 abc 开头'},{key:'xyz$',desc:'以 xyz 结尾'},{key:'[a-z]',desc:'小写字母'},
    {key:'[A-Z]',desc:'大写字母'},{key:'[0-9]',desc:'数字'},{key:'[\\u4e00-\\u9fff]',desc:'中文字符'},
    {key:'^1[3-9]\\d{9}$',desc:'手机号'},{key:'^\\w+@\\w+\\.\\w+$',desc:'邮箱'},{key:'^https?://',desc:'URL'},
    {key:'^\\d{6}$',desc:'邮编'},{key:'^\\d{17}[\\dXx]$',desc:'身份证号'},{key:'\\b\\w{4,}\\b',desc:'4位以上单词'},
    {key:'(\\d{3})-(\\d{3,})',desc:'电话号码'},{key:'<[^>]+>',desc:'HTML 标签'},{key:'\\[.*?\\]',desc:'方括号内容'},
    {key:'[\\u4e00-\\u9fff]+',desc:'中文'},{key:'(?!.*\\s).+',desc:'无空格字符串'},
  ]} />;
}

// ==================== QUERY TOOLS (7) ====================

function PhoneQuery() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const prefixes = [
    {prefix:'130',carrier:'联通',region:'全国'},{prefix:'131',carrier:'联通',region:'全国'},{prefix:'132',carrier:'联通',region:'全国'},
    {prefix:'133',carrier:'电信',region:'全国'},{prefix:'134',carrier:'移动',region:'全国'},{prefix:'135',carrier:'移动',region:'全国'},
    {prefix:'136',carrier:'移动',region:'全国'},{prefix:'137',carrier:'移动',region:'全国'},{prefix:'138',carrier:'移动',region:'全国'},
    {prefix:'139',carrier:'移动',region:'全国'},{prefix:'150',carrier:'移动',region:'全国'},{prefix:'151',carrier:'移动',region:'全国'},
    {prefix:'152',carrier:'移动',region:'全国'},{prefix:'153',carrier:'电信',region:'全国'},{prefix:'155',carrier:'联通',region:'全国'},
    {prefix:'156',carrier:'联通',region:'全国'},{prefix:'157',carrier:'移动',region:'全国'},{prefix:'158',carrier:'移动',region:'全国'},
    {prefix:'159',carrier:'移动',region:'全国'},{prefix:'166',carrier:'联通',region:'全国'},{prefix:'170',carrier:'虚拟运营商',region:'全国'},
    {prefix:'171',carrier:'虚拟运营商',region:'全国'},{prefix:'173',carrier:'电信',region:'全国'},{prefix:'175',carrier:'联通',region:'全国'},
    {prefix:'176',carrier:'联通',region:'全国'},{prefix:'177',carrier:'电信',region:'全国'},{prefix:'178',carrier:'移动',region:'全国'},
    {prefix:'180',carrier:'电信',region:'全国'},{prefix:'181',carrier:'电信',region:'全国'},{prefix:'182',carrier:'移动',region:'全国'},
    {prefix:'183',carrier:'移动',region:'全国'},{prefix:'184',carrier:'移动',region:'全国'},{prefix:'185',carrier:'联通',region:'全国'},
    {prefix:'186',carrier:'联通',region:'全国'},{prefix:'187',carrier:'移动',region:'全国'},{prefix:'188',carrier:'移动',region:'全国'},
    {prefix:'189',carrier:'电信',region:'全国'},{prefix:'191',carrier:'电信',region:'全国'},{prefix:'198',carrier:'移动',region:'全国'},
    {prefix:'199',carrier:'电信',region:'全国'},
  ];
  const filtered = prefixes.filter(p => p.prefix.includes(search) || p.carrier.includes(search));

  return (
    <div className="tool-panel">
      <h2>手机号段查询</h2>
      <p className="desc">查询手机号码归属运营商</p>
      <input type="text" placeholder="输入前3位号段查询" value={search} onChange={e => setSearch(e.target.value)} style={{width:'100%',marginBottom:8}} />
      <div style={{maxHeight:400,overflow:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead><tr style={{background:'#f5f5f5'}}><th style={{padding:6,border:'1px solid #ddd'}}>号段</th><th style={{padding:6,border:'1px solid #ddd'}}>运营商</th><th style={{padding:6,border:'1px solid #ddd'}}>地区</th></tr></thead>
          <tbody>
            {filtered.map((p,i) => <tr key={i}><td style={{padding:6,border:'1px solid #ddd'}}>{p.prefix}</td><td style={{padding:6,border:'1px solid #ddd'}}>{p.carrier}</td><td style={{padding:6,border:'1px solid #ddd'}}>{p.region}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BankQuery() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const banks = [
    {bin:'622202',bank:'工商银行',type:'借记卡'},{bin:'621226',bank:'工商银行',type:'借记卡'},{bin:'622200',bank:'工商银行',type:'借记卡'},
    {bin:'622848',bank:'农业银行',type:'借记卡'},{bin:'622845',bank:'农业银行',type:'借记卡'},{bin:'622827',bank:'农业银行',type:'借记卡'},
    {bin:'621700',bank:'建设银行',type:'借记卡'},{bin:'621080',bank:'建设银行',type:'借记卡'},{bin:'622280',bank:'建设银行',type:'借记卡'},
    {bin:'621661',bank:'中国银行',type:'借记卡'},{bin:'621666',bank:'中国银行',type:'借记卡'},{bin:'456351',bank:'中国银行',type:'信用卡'},
    {bin:'622260',bank:'交通银行',type:'借记卡'},{bin:'622262',bank:'交通银行',type:'借记卡'},{bin:'622521',bank:'交通银行',type:'信用卡'},
    {bin:'622588',bank:'招商银行',type:'借记卡'},{bin:'622609',bank:'招商银行',type:'借记卡'},{bin:'439225',bank:'招商银行',type:'信用卡'},
    {bin:'622155',bank:'邮政储蓄',type:'借记卡'},{bin:'622188',bank:'邮政储蓄',type:'借记卡'},{bin:'622180',bank:'邮政储蓄',type:'借记卡'},
    {bin:'623058',bank:'平安银行',type:'借记卡'},{bin:'621626',bank:'平安银行',type:'借记卡'},
    {bin:'621485',bank:'招商银行',type:'借记卡'},{bin:'622600',bank:'民生银行',type:'借记卡'},
    {bin:'622700',bank:'浦发银行',type:'借记卡'},{bin:'622690',bank:'兴业银行',type:'借记卡'},
    {bin:'621771',bank:'中信银行',type:'借记卡'},{bin:'623058',bank:'平安银行',type:'借记卡'},
    {bin:'621296',bank:'华夏银行',type:'借记卡'},{bin:'622300',bank:'光大银行',type:'借记卡'},
    {bin:'621792',bank:'广发银行',type:'借记卡'},
  ];
  const filtered = banks.filter(b => b.bin.includes(search) || b.bank.includes(search) || b.type.includes(search));

  return (
    <div className="tool-panel">
      <h2>银行卡 BIN 查询</h2>
      <p className="desc">通过卡号前6位查询发卡行</p>
      <input type="text" placeholder="输入卡号前几位或银行名" value={search} onChange={e => setSearch(e.target.value)} style={{width:'100%',marginBottom:8}} />
      <div style={{maxHeight:400,overflow:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead><tr style={{background:'#f5f5f5'}}><th style={{padding:6,border:'1px solid #ddd'}}>BIN</th><th style={{padding:6,border:'1px solid #ddd'}}>银行</th><th style={{padding:6,border:'1px solid #ddd'}}>类型</th></tr></thead>
          <tbody>
            {filtered.map((b,i) => <tr key={i}><td style={{padding:6,border:'1px solid #ddd',fontFamily:'monospace'}}>{b.bin}</td><td style={{padding:6,border:'1px solid #ddd'}}>{b.bank}</td><td style={{padding:6,border:'1px solid #ddd'}}>{b.type}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LicenseQuery() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const plates = [
    {code:'京',name:'北京'},{code:'津',name:'天津'},{code:'沪',name:'上海'},{code:'渝',name:'重庆'},
    {code:'冀',name:'河北'},{code:'晋',name:'山西'},{code:'辽',name:'辽宁'},{code:'吉',name:'吉林'},
    {code:'黑',name:'黑龙江'},{code:'苏',name:'江苏'},{code:'浙',name:'浙江'},{code:'皖',name:'安徽'},
    {code:'闽',name:'福建'},{code:'赣',name:'江西'},{code:'鲁',name:'山东'},{code:'豫',name:'河南'},
    {code:'鄂',name:'湖北'},{code:'湘',name:'湖南'},{code:'粤',name:'广东'},{code:'桂',name:'广西'},
    {code:'琼',name:'海南'},{code:'川',name:'四川'},{code:'贵',name:'贵州'},{code:'云',name:'云南'},
    {code:'藏',name:'西藏'},{code:'陕',name:'陕西'},{code:'甘',name:'甘肃'},{code:'青',name:'青海'},
    {code:'宁',name:'宁夏'},{code:'新',name:'新疆'},{code:'蒙',name:'内蒙古'},{code:'港',name:'香港'},
    {code:'澳',name:'澳门'},{code:'台',name:'台湾'},
  ];
  const filtered = plates.filter(p => p.code.includes(search) || p.name.includes(search));

  return (
    <div className="tool-panel">
      <h2>车牌归属查询</h2>
      <p className="desc">查询车牌号省份简称</p>
      <input type="text" placeholder="输入省份简称或名称" value={search} onChange={e => setSearch(e.target.value)} style={{width:'100%',marginBottom:8}} />
      <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:4}}>
        {filtered.map(p => (
          <div key={p.code} style={{padding:8,background:'#f5f5f5',borderRadius:4,textAlign:'center'}}>
            <div style={{fontSize:'1.3em',fontWeight:'bold'}}>{p.code}</div>
            <div style={{fontSize:11,color:'#666'}}>{p.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IDCard() {
  const { t } = useTranslation();
  const [id, setId] = useState('');
  const [result, setResult] = useState('');

  const validate = () => {
    if (!id) { setResult(''); return; }
    const weights = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
    const checkCodes = '10X98765432';
    let info = [];

    if (id.length !== 18) {
      info.push('身份证号应为18位');
    } else {
      const province = id.substring(0, 2);
      const city = id.substring(2, 4);
      const county = id.substring(4, 6);
      const birth = id.substring(6, 14);
      const order = id.substring(14, 17);
      const check = id.substring(17).toUpperCase();

      info.push(`地区码: ${province}${city}${county}`);
      info.push(`出生日期: ${birth.substring(0,4)}-${birth.substring(4,6)}-${birth.substring(6,8)}`);
      info.push(`性别: ${parseInt(order) % 2 === 1 ? '男' : '女'}`);

      let sum = 0;
      for (let i = 0; i < 17; i++) sum += parseInt(id[i]) * weights[i];
      const expectedCheck = checkCodes[sum % 11];
      info.push(`校验码: ${check} ${check === expectedCheck ? '✓ 正确' : '✗ 应为 ' + expectedCheck}`);
    }
    setResult(info.join('\n'));
  };

  return (
    <div className="tool-panel">
      <h2>身份证号解析</h2>
      <p className="desc">解析和验证18位身份证号码</p>
      <div className="tool-controls">
        <input type="text" placeholder="输入18位身份证号" value={id} onChange={e => setId(e.target.value)} maxLength={18} style={{flex:1}} />
        <button onClick={validate}>解析</button>
      </div>
      <textarea placeholder="解析结果" value={result} readOnly rows={5} />
    </div>
  );
}

function AreaCode() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const codes = [
    {code:'010',city:'北京'},{code:'021',city:'上海'},{code:'022',city:'天津'},{code:'023',city:'重庆'},
    {code:'020',city:'广州'},{code:'0755',city:'深圳'},{code:'028',city:'成都'},{code:'027',city:'武汉'},
    {code:'025',city:'南京'},{code:'0571',city:'杭州'},{code:'029',city:'西安'},{code:'0731',city:'长沙'},
    {code:'0371',city:'郑州'},{code:'0531',city:'济南'},{code:'0551',city:'合肥'},{code:'0791',city:'南昌'},
    {code:'0591',city:'福州'},{code:'0592',city:'厦门'},{code:'0871',city:'昆明'},{code:'0851',city:'贵阳'},
    {code:'0771',city:'南宁'},{code:'0898',city:'海口'},{code:'0931',city:'兰州'},{code:'0951',city:'银川'},
    {code:'0971',city:'西宁'},{code:'0451',city:'哈尔滨'},{code:'0431',city:'长春'},{code:'024',city:'沈阳'},
    {code:'0411',city:'大连'},{code:'0532',city:'青岛'},{code:'0512',city:'苏州'},{code:'0574',city:'宁波'},
    {code:'0769',city:'东莞'},{code:'0757',city:'佛山'},{code:'0510',city:'无锡'},{code:'0311',city:'石家庄'},
    {code:'0351',city:'太原'},{code:'0471',city:'呼和浩特'},{code:'0577',city:'温州'},{code:'0595',city:'泉州'},
  ];
  const filtered = codes.filter(c => c.code.includes(search) || c.city.includes(search));

  return (
    <div className="tool-panel">
      <h2>区号查询</h2>
      <p className="desc">中国主要城市电话区号</p>
      <input type="text" placeholder="输入区号或城市名" value={search} onChange={e => setSearch(e.target.value)} style={{width:'100%',marginBottom:8}} />
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:4}}>
        {filtered.map(c => (
          <div key={c.code} style={{padding:8,background:'#f5f5f5',borderRadius:4,textAlign:'center'}}>
            <div style={{fontWeight:'bold'}}>{c.code}</div>
            <div style={{fontSize:12,color:'#666'}}>{c.city}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ZipCode() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const zips = [
    {code:'100000',city:'北京'},{code:'200000',city:'上海'},{code:'300000',city:'天津'},{code:'400000',city:'重庆'},
    {code:'510000',city:'广州'},{code:'518000',city:'深圳'},{code:'610000',city:'成都'},{code:'430000',city:'武汉'},
    {code:'210000',city:'南京'},{code:'310000',city:'杭州'},{code:'710000',city:'西安'},{code:'410000',city:'长沙'},
    {code:'450000',city:'郑州'},{code:'250000',city:'济南'},{code:'230000',city:'合肥'},{code:'330000',city:'南昌'},
    {code:'350000',city:'福州'},{code:'361000',city:'厦门'},{code:'650000',city:'昆明'},{code:'550000',city:'贵阳'},
    {code:'530000',city:'南宁'},{code:'570000',city:'海口'},{code:'730000',city:'兰州'},{code:'750000',city:'银川'},
    {code:'810000',city:'西宁'},{code:'150000',city:'哈尔滨'},{code:'130000',city:'长春'},{code:'110000',city:'沈阳'},
    {code:'116000',city:'大连'},{code:'266000',city:'青岛'},{code:'215000',city:'苏州'},{code:'315000',city:'宁波'},
    {code:'214000',city:'无锡'},{code:'050000',city:'石家庄'},{code:'030000',city:'太原'},{code:'010000',city:'呼和浩特'},
    {code:'325000',city:'温州'},{code:'362000',city:'泉州'},
  ];
  const filtered = zips.filter(z => z.code.includes(search) || z.city.includes(search));

  return (
    <div className="tool-panel">
      <h2>邮编查询</h2>
      <p className="desc">中国主要城市邮政编码</p>
      <input type="text" placeholder="输入邮编或城市名" value={search} onChange={e => setSearch(e.target.value)} style={{width:'100%',marginBottom:8}} />
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:4}}>
        {filtered.map(z => (
          <div key={z.code} style={{padding:8,background:'#f5f5f5',borderRadius:4,textAlign:'center'}}>
            <div style={{fontWeight:'bold'}}>{z.code}</div>
            <div style={{fontSize:12,color:'#666'}}>{z.city}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function University() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const unis = [
    {name:'北京大学',type:'985/211',city:'北京'},{name:'清华大学',type:'985/211',city:'北京'},
    {name:'复旦大学',type:'985/211',city:'上海'},{name:'上海交通大学',type:'985/211',city:'上海'},
    {name:'浙江大学',type:'985/211',city:'杭州'},{name:'南京大学',type:'985/211',city:'南京'},
    {name:'中国科学技术大学',type:'985/211',city:'合肥'},{name:'武汉大学',type:'985/211',city:'武汉'},
    {name:'华中科技大学',type:'985/211',city:'武汉'},{name:'中山大学',type:'985/211',city:'广州'},
    {name:'西安交通大学',type:'985/211',city:'西安'},{name:'哈尔滨工业大学',type:'985/211',city:'哈尔滨'},
    {name:'中国人民大学',type:'985/211',city:'北京'},{name:'北京师范大学',type:'985/211',city:'北京'},
    {name:'南开大学',type:'985/211',city:'天津'},{name:'天津大学',type:'985/211',city:'天津'},
    {name:'东南大学',type:'985/211',city:'南京'},{name:'厦门大学',type:'985/211',city:'厦门'},
    {name:'山东大学',type:'985/211',city:'济南'},{name:'四川大学',type:'985/211',city:'成都'},
    {name:'吉林大学',type:'985/211',city:'长春'},{name:'同济大学',type:'985/211',city:'上海'},
    {name:'北京航空航天大学',type:'985/211',city:'北京'},{name:'北京理工大学',type:'985/211',city:'北京'},
    {name:'中南大学',type:'985/211',city:'长沙'},{name:'湖南大学',type:'985/211',city:'长沙'},
    {name:'华南理工大学',type:'985/211',city:'广州'},{name:'电子科技大学',type:'985/211',city:'成都'},
    {name:'重庆大学',type:'985/211',city:'重庆'},{name:'西北工业大学',type:'985/211',city:'西安'},
    {name:'兰州大学',type:'985/211',city:'兰州'},{name:'华东师范大学',type:'985/211',city:'上海'},
    {name:'大连理工大学',type:'985/211',city:'大连'},{name:'中国农业大学',type:'985/211',city:'北京'},
    {name:'东北大学',type:'985/211',city:'沈阳'},{name:'西北农林科技大学',type:'985/211',city:'杨凌'},
    {name:'中国海洋大学',type:'985/211',city:'青岛'},{name:'中央民族大学',type:'985/211',city:'北京'},
    {name:'国防科技大学',type:'985/211',city:'长沙'},
  ];
  const filtered = unis.filter(u => u.name.includes(search) || u.city.includes(search) || u.type.includes(search));

  return (
    <div className="tool-panel">
      <h2>985/211 大学</h2>
      <p className="desc">中国 985/211 重点大学列表</p>
      <input type="text" placeholder="搜索大学名称..." value={search} onChange={e => setSearch(e.target.value)} style={{width:'100%',marginBottom:8}} />
      <div style={{maxHeight:400,overflow:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead><tr style={{background:'#f5f5f5'}}><th style={{padding:6,border:'1px solid #ddd',textAlign:'left'}}>名称</th><th style={{padding:6,border:'1px solid #ddd'}}>类型</th><th style={{padding:6,border:'1px solid #ddd'}}>城市</th></tr></thead>
          <tbody>
            {filtered.map((u,i) => <tr key={i}><td style={{padding:6,border:'1px solid #ddd'}}>{u.name}</td><td style={{padding:6,border:'1px solid #ddd',textAlign:'center'}}>{u.type}</td><td style={{padding:6,border:'1px solid #ddd',textAlign:'center'}}>{u.city}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==================== GAME TOOLS (6) ====================

function DiceTool() {
  const { t } = useTranslation();
  const [result, setResult] = useState(null);
  const [rolling, setRolling] = useState(false);

  const diceEmojis = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

  const roll = () => {
    setRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      const temp = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] % 6) + 1;
      setResult(temp);
      count++;
      if (count >= 10) { clearInterval(interval); setRolling(false); }
    }, 80);
  };

  return (
    <div className="tool-panel">
      <h2>掷骰子</h2>
      <p className="desc">点击掷骰子，随机 1-6</p>
      <div style={{textAlign:'center'}}>
        {result && <div style={{fontSize:'6em',lineHeight:1.2}}>{diceEmojis[result]}</div>}
        <div style={{fontSize:'2em',margin:10}}>{result || '?'}</div>
        <button onClick={roll} disabled={rolling} style={{fontSize:'1.2em',padding:'10px 30px'}}>掷骰子</button>
      </div>
    </div>
  );
}

function CoinTool() {
  const { t } = useTranslation();
  const [result, setResult] = useState(null);
  const [flipping, setFlipping] = useState(false);

  const flip = () => {
    setFlipping(true);
    let count = 0;
    const interval = setInterval(() => {
      const temp = crypto.getRandomValues(new Uint32Array(1))[0] % 2;
      setResult(temp === 0 ? '正' : '反');
      count++;
      if (count >= 15) { clearInterval(interval); setFlipping(false); }
    }, 60);
  };

  return (
    <div className="tool-panel">
      <h2>抛硬币</h2>
      <p className="desc">随机正面或反面</p>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'5em',lineHeight:1.2}}>
          {result === '正' ? '🪙' : result === '反' ? '🪙' : '❓'}
        </div>
        <div style={{fontSize:'1.5em',margin:8,fontWeight:'bold'}}>
          {result || '点击抛硬币'}
        </div>
        <button onClick={flip} disabled={flipping} style={{fontSize:'1.2em',padding:'10px 30px'}}>抛硬币</button>
      </div>
    </div>
  );
}

function ReactionTool() {
  const { t } = useTranslation();
  const [state, setState] = useState('idle');
  const [startTime, setStartTime] = useState(0);
  const [result, setResult] = useState(null);
  const timeoutRef = useRef(null);

  const start = () => {
    setState('waiting');
    setResult(null);
    const delay = 1500 + Math.random() * 3000;
    timeoutRef.current = setTimeout(() => {
      setState('ready');
      setStartTime(Date.now());
    }, delay);
  };

  const click = () => {
    if (state === 'waiting') {
      clearTimeout(timeoutRef.current);
      setState('tooEarly');
    } else if (state === 'ready') {
      const reaction = Date.now() - startTime;
      setResult(reaction);
      setState('done');
    }
  };

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  return (
    <div className="tool-panel">
      <h2>反应速度测试</h2>
      <p className="desc">测试你的反应速度</p>
      <div
        onClick={click}
        style={{
          width:'100%',height:180,display:'flex',alignItems:'center',justifyContent:'center',
          cursor:'pointer',borderRadius:8,fontSize:'1.5em',fontWeight:'bold',
          background:state==='waiting'?'#e74c3c':state==='ready'?'#2ecc71':state==='tooEarly'?'#e67e22':'#3498db',
          color:'#fff',transition:'background 0.3s'
        }}
      >
        {state === 'idle' && '点击开始'}
        {state === 'waiting' && '等待绿色...'}
        {state === 'ready' && '现在点击!'}
        {state === 'tooEarly' && '太早了! 点击重试'}
        {state === 'done' && `${result} 毫秒! 点击重试`}
      </div>
      {state !== 'waiting' && state !== 'ready' && (
        <button onClick={start} style={{marginTop:10,width:'100%'}}>开始测试</button>
      )}
    </div>
  );
}

function LuckyTool() {
  const { t } = useTranslation();
  const [result, setResult] = useState('');
  const [rolling, setRolling] = useState(false);

  const fortunes = [
    '🍀 大吉大利，今天好运连连！','⭐ 心想事成，万事如意！','🌈 幸运之星眷顾你！',
    '🎉 好运正在向你走来！','💫 今天会有意外惊喜哦！','🔥 运势爆棚，势不可挡！',
    '✨ 机遇就在眼前，把握住！','🌸 幸福就在不远处等着你！','🎯 目标即将达成，加油！',
    '💪 努力终有回报，坚持下去！','🦋 转机即将到来！','🌻 阳光总在风雨后！',
    '🎈 保持乐观，好运自然来！','🐉 龙马精神，意气风发！','🏆 成功在向你招手！',
    '💎 你是被好运眷顾的人！','🚀 一飞冲天，青云直上！','🦄 奇迹即将发生！',
    '🎊 喜事连连，好运不断！','🌟 做最好的自己，好运自来！',
  ];

  const draw = () => {
    setRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setResult(fortunes[Math.floor(Math.random() * fortunes.length)]);
      count++;
      if (count >= 12) { clearInterval(interval); setRolling(false); }
    }, 80);
  };

  return (
    <div className="tool-panel">
      <h2>今日运势</h2>
      <p className="desc">随机抽取今日运势签</p>
      <div style={{textAlign:'center',padding:20}}>
        <div style={{fontSize:'1.3em',minHeight:60,display:'flex',alignItems:'center',justifyContent:'center'}}>
          {result || '点击抽取运势签 ✨'}
        </div>
        <button onClick={draw} disabled={rolling} style={{fontSize:'1.1em',padding:'10px 30px'}}>抽签</button>
      </div>
    </div>
  );
}

function EatTool() {
  const { t } = useTranslation();
  const [result, setResult] = useState('');
  const [rolling, setRolling] = useState(false);

  const foods = [
    '🍜 拉面','🍕 披萨','🍣 寿司','🌮 塔可','🍔 汉堡','🥟 饺子',
    '🍛 咖喱饭','🍝 意大利面','🌯 卷饼','🥘 火锅','🍱 便当','🍲 麻辣烫',
    '🍗 炸鸡','🥩 牛排','🍤 天妇罗','🥗 沙拉','🍜 兰州拉面','🍚 盖浇饭',
    '🥪 三明治','🌭 热狗','🧆 烤肉','🍳 蛋炒饭','🫕 砂锅','🍿 爆米花',
    '🥨 面包','🍩 甜甜圈','🧁 杯子蛋糕','🍪 饼干','🍦 冰淇淋','🥤 奶茶',
  ];

  const pick = () => {
    setRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setResult(foods[Math.floor(Math.random() * foods.length)]);
      count++;
      if (count >= 15) { clearInterval(interval); setRolling(false); }
    }, 60);
  };

  return (
    <div className="tool-panel">
      <h2>今天吃什么</h2>
      <p className="desc">选择困难？随机帮你决定今天吃什么</p>
      <div style={{textAlign:'center',padding:20}}>
        <div style={{fontSize:'2.5em',minHeight:80,display:'flex',alignItems:'center',justifyContent:'center'}}>
          {result || '🤔'}
        </div>
        <button onClick={pick} disabled={rolling} style={{fontSize:'1.1em',padding:'10px 30px'}}>随机选择</button>
      </div>
    </div>
  );
}

function BubbleTool() {
  const { t } = useTranslation();
  const [bubbles, setBubbles] = useState(() =>
    Array.from({length: 24}, (_, i) => ({ id: i, popped: false }))
  );

  const pop = (id) => {
    setBubbles(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));
  };

  const reset = () => {
    setBubbles(Array.from({length: 24}, (_, i) => ({ id: i, popped: false })));
  };

  const colors = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff922b','#cc5de8','#20c997','#ff6b9d'];
  const allPopped = bubbles.every(b => b.popped);

  return (
    <div className="tool-panel">
      <h2>泡泡纸</h2>
      <p className="desc">捏泡泡纸解压——点击泡泡来捏爆它们</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:8,maxWidth:360,margin:'0 auto'}}>
        {bubbles.map(b => (
          <div key={b.id}
            onClick={() => !b.popped && pop(b.id)}
            style={{
              width:48,height:48,borderRadius:'50%',
              background:b.popped?'#e0e0e0':colors[b.id % colors.length],
              cursor:b.popped?'default':'pointer',
              transition:'all 0.15s',
              transform:b.popped?'scale(0.7)':'scale(1)',
              opacity:b.popped?0.3:1,
              boxShadow:b.popped?'none':'0 3px 8px rgba(0,0,0,0.2)'
            }}
          />
        ))}
      </div>
      {allPopped && <div style={{textAlign:'center',marginTop:12,fontSize:'1.1em'}}>全部捏爆了! 🎉</div>}
      <button onClick={reset} style={{display:'block',margin:'12px auto 0'}}>重置</button>
    </div>
  );
}

export {
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
};

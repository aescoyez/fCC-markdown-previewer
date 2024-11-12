import React, { useState } from 'react'
import './App.css'
import {FaEdit, FaEye, FaExpandArrowsAlt, FaCompressArrowsAlt} from 'react-icons/fa'
import {marked} from 'marked'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github.css';

hljs.registerLanguage('javascript', javascript);

marked.setOptions({
    gfm: true, // Enable GitHub-flavored Markdown
    breaks: true, // Convert line breaks to <br> tags
    highlight: (code: string) => {
    return hljs.highlight(code, { language: 'javascript' }).value;
  },
});

function App() {
  const defaultMarkdown = `# This is a header (H1 size)
## This is a sub header (H2 size)
You can also include [links](https://www.freecodecamp.org)
You can preview inline code \`<p>Hello world!</p>\` or a code block:
\`\`\`javascript
const print = (msg) => {
console.log(msg);
}
\`\`\`
You can also list items:
- item 1
  - sub item a
- item 2
- ...
 > Display block quotes
images:
![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
or even **bolded** text
`;
  const [markdown, setMarkdown] = useState<string>(defaultMarkdown);
  const [zoomedElement, setZoomedElement] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdown(event.target.value);
    };

  const parseMarkdown = () => {
    return {__html: marked.parse(markdown)};
  }

  const toggleZoom = (currId: string) => {
    setZoomedElement(prevId => (prevId === currId ? null : currId));
  };

  return (
    <div className="background">
      <div className={`editor-container ${zoomedElement === "editor" ? "zoomed-in" : zoomedElement ? "hidden" : ""}`}>
        <div className="editor-header">
          <p><FaEdit style={{ transform: 'translateY(2px)', paddingRight: '5px'}}></FaEdit>Editor</p>
          <button onClick={() => toggleZoom("editor")}>{zoomedElement === "editor" ? <FaCompressArrowsAlt/> : <FaExpandArrowsAlt/>}</button>
        </div>
        <textarea id="editor" onChange={handleChange} value={markdown} placeholder="Type Markdown here...">{markdown}</textarea>
      </div>
      <div className={`previewer-container ${zoomedElement === "previewer" ? "zoomed-in" : zoomedElement ? "hidden" : ""}`}>
        <div className="previewer-header">
          <p><FaEye style={{ transform: 'translateY(2px)', paddingRight: '5px' }}></FaEye>Previewer</p>
          <button onClick={() => toggleZoom("previewer")}>{zoomedElement === "previewer" ? <FaCompressArrowsAlt/> : <FaExpandArrowsAlt/>}</button>
        </div>
        <div id="preview" dangerouslySetInnerHTML={parseMarkdown()}>
        </div>
      </div>

    </div>
  )
}

export default App

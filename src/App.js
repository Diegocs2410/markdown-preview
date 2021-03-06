import { useState } from "react";
import { marked } from "marked";
import Prism from "prismjs";
import Bounce from "react-reveal/Bounce";
import Fade from "react-reveal/Fade";

const initialState = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/FreeCodeCamp_logo.svg/400px-FreeCodeCamp_logo.svg.png)
`;

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  },
});

// INSERTS target="_blank" INTO HREF TAGS (required for Codepen links)
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

function App() {
  const [textMarkdown, setTextMarkdown] = useState(initialState);
  const markdown = marked(textMarkdown);

  return (
    <div className="container">
      <Bounce>
        <h1 className="text-center mt-5 mb-3">MarkDown previewer</h1>
      </Bounce>
      <Fade>
        <img
          src="https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg"
          alt="freecodecamp "
          className="w-100 mb-4"
        />
      </Fade>
      ;
      <div
        className="row bg-gradient rounded mb-5 pb-5"
        style={{ minHeight: "100vh", backgroundColor: "#C14644" }}
      >
        <div className="col-12 col-md-6 ">
          <h4 className="text-center text-light fw-bold my-2 p-3 shadowText">
            Enter Your Text to convert
          </h4>
          <textarea
            id="editor"
            className="form-control m-2 min-vh-100  "
            value={textMarkdown}
            onChange={(e) => setTextMarkdown(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-6 overflow-hidden">
          <h4 className="text-center text-light fw-bold my-2 p-3 shadowText">
            Markdown Converted
          </h4>
          <div
            className="bg-light p-2 min-vh-100"
            id="preview"
            dangerouslySetInnerHTML={{ __html: markdown }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;

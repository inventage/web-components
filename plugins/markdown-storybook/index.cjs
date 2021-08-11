const unified = require('unified');
const remark2Html = require('remark-html');
const remarkParse = require('remark-parse');
const remarkGfm = require('remark-gfm');
const remarkFrontmatter = require('remark-frontmatter');
const remarkHighlightjs = require('remark-highlight.js');
const yaml = require('js-yaml');
const { storybookPlugin: modernWebStorybookPlugin } = require('@web/dev-server-storybook');

// Taken from https://github.com/CleverCloud/clever-components/blob/master/stories/lib/markdown.cjs
// Big Thanks @hsablonniere!
//
// Special patched version of '@web/dev-server-storybook'
// This loads plain markdown documents with kind/title frontmatter support
// Don't do this at home ;-)
function storybookWdsPlugin() {
  const modernWebPlugin = modernWebStorybookPlugin({ type: 'web-components' });
  return {
    ...modernWebPlugin,
    async transform(context) {
      if (context.path.endsWith('.md')) {
        context.body = markdownToCsfWithDocsPage(context.body);
      } else {
        return modernWebPlugin.transform(context);
      }
    },
  };
}

// Same here but for the rollup static build
// This loads plain markdown documents with kind/title frontmatter support
// Don't do this at home ;-)
function storybookRollupPlugin() {
  return {
    name: 'md-plain',
    transform(code, id) {
      if (id.endsWith('.md')) {
        return markdownToCsfWithDocsPage(code);
      }
    },
  };
}

function markdownToCsfWithDocsPage(markdownText) {
  const processor = unified().use(remarkParse).use(remarkGfm).use(remarkFrontmatter, ['yaml']).use(remarkHighlightjs).use(remark2Html);
  const markdownAst = processor.parse(markdownText);

  const { children = [] } = markdownAst;
  const frontmatterNode = children.find(node => node.type === 'yaml');
  const kind = getKind(frontmatterNode);

  const headingNode = children.find(node => node.type === 'heading' && node.depth === 1);
  const subtitle = getSubTitle(frontmatterNode, headingNode);

  const title = [kind, subtitle].filter(a => a != null).join('/');

  const { contents: html } = processor().processSync(markdownText);

  const csfScript = `

    import { React } from '@web/storybook-prebuilt/web-components.js';

    const html = ${JSON.stringify(html)};

    class HtmlComponent extends React.Component {
      constructor(props) {
        super(props);
        this.ref = React.createRef();
      }
      componentDidMount() {
        setTimeout(() => {
          // LOL, without this, SB tries to syntax highlight and we get [Object object]
          this.ref.current.innerHTML = html;
        }, 0);
      }
      render() {
        return React.createElement('div', {
          ref: this.ref,
          className: 'markdown-body',
          style: {
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto',
          }
        });
      }
    }

    export default {
      title: '${title}',
      parameters: {
        docsOnly: true,
        docs: {
          page: HtmlComponent,
        }
      },
    }

    export const page = () => '';
  `;

  return csfScript;
}

function getKind(frontmatterNode) {
  if (frontmatterNode != null) {
    const fmObject = yaml.load(frontmatterNode.value);
    if (fmObject.kind != null) {
      return fmObject.kind;
    }
  }

  return null;
}

function getSubTitle(frontmatterNode, headingNode) {
  if (frontmatterNode != null) {
    const fmObject = yaml.load(frontmatterNode.value);
    if (fmObject.title != null) {
      return fmObject.title;
    }
  }

  if (headingNode != null) {
    return headingNode.children.map(c => c.value).join('');
  }

  return 'Untitled';
}

module.exports = { storybookRollupPlugin, storybookWdsPlugin };

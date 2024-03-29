import frontmatter from 'remark-frontmatter';
import highlight from 'remark-highlight.js';
import remark2Html from 'remark-html';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { unified } from 'unified';
import yaml from 'js-yaml';
import { storybookPlugin as modernWebStorybookPlugin } from '@web/dev-server-storybook';

// Taken from https://github.com/CleverCloud/clever-components/blob/11.2.1/src/stories/lib/markdown.cjs
// Big Thanks @hsablonniere!
//
// Special patched version of '@web/dev-server-storybook'
// This loads plain markdown documents with kind/title frontmatter support
// Don't do this at home ;-)
export const storybookWdsPlugin = () => {
  const modernWebPlugin = modernWebStorybookPlugin({ type: 'web-components' });
  // noinspection UnnecessaryLocalVariableJS
  const patchedPlugin = {
    ...modernWebPlugin,
    async transform(context) {
      if (context.path.endsWith('.md')) {
        context.body = await markdownToCsfWithDocsPage(context.body);
      } else {
        return modernWebPlugin.transform(context);
      }
    },
  };

  return patchedPlugin;
};

// Same here but for the rollup static build
// This loads plain markdown documents with kind/title frontmatter support
// Don't do this at home ;-)
export const storybookRollupPlugin = () => {
  return {
    name: 'md-plain',
    transform(code, id) {
      if (id.endsWith('.md')) {
        return markdownToCsfWithDocsPage(code);
      }
    },
  };
};

const markdownToCsfWithDocsPage = async markdownText => {
  const processor = unified().use(remarkParse).use(remarkGfm).use(frontmatter, ['yaml']).use(highlight).use(remark2Html, { sanitize: false });

  const markdownAst = processor.parse(markdownText);

  const frontmatterNode = markdownAst.children.find(node => node.type === 'yaml');
  const kind = getKind(frontmatterNode);

  const headingNode = markdownAst.children.find(node => node.type === 'heading' && node.depth === 1);
  const subtitle = getSubTitle(frontmatterNode, headingNode);

  const title = [kind, subtitle].filter(a => a != null).join('/');

  const html = await processor.process(markdownText);

  // noinspection UnnecessaryLocalVariableJS
  const csfScript = `

    import { React } from '@web/storybook-prebuilt/web-components.js';

    const html = ${JSON.stringify(`${html}`)};

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
};

const getKind = frontmatterNode => {
  if (frontmatterNode != null) {
    const fmObject = yaml.load(frontmatterNode.value);
    if (fmObject.kind != null) {
      return fmObject.kind;
    }
  }

  return null;
};

const getSubTitle = (frontmatterNode, headingNode) => {
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
};

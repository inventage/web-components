/**
 * Excludes private and protected properties from the manifest.
 *
 * @return {Partial<import('@custom-elements-manifest/analyzer').Plugin>}
 *
 * @see https://lit-and-friends.slack.com/archives/CE6D9DN05/p1630306980020300?thread_ts=1630305566.016200&cid=CE6D9DN05
 */
export function excludePrivateProtectedPlugin() {
  return {
    name: 'excludePrivateProtected',
    packageLinkPhase({ customElementsManifest }) {
      customElementsManifest?.modules?.forEach(mod => {
        mod?.declarations?.forEach(dec => {
          if (dec.kind === 'class' || dec.kind === 'mixin') {
            dec.members = dec?.members?.filter(i => i?.privacy !== 'protected')?.filter(i => i?.privacy !== 'private');
          }
        });
      });
    },
  };
}

/**
 * @deprecated Use test-data.json instead
 */
export const data = {
  menus: [
    {
      id: 'menu1',
      items: [
        {
          id: 'parent1',
          label: {
            de: 'Parent1_de',
            en: 'Parent1_en',
          },
          url: '/some/path/parent1',
          application: 'app1',
        },
        {
          id: 'parent2',
          defaultItem: 'item2.2',
          label: {
            de: 'Parent2_de',
            en: 'Parent2_en',
          },
          items: [
            {
              id: 'item2.1',
              label: {
                de: 'Item 2.1_de',
                en: 'Item 2.1_en',
              },
              url: '/some/path/item2.1',
              application: 'app1',
            },
            {
              id: 'item2.2',
              label: {
                de: 'Item 2.2_de',
                en: 'Item 2.2_en',
              },
              url: '/some/path/item2.2',
              application: 'app1',
            },
          ],
        },
      ],
    },
    {
      id: 'menu2',
      dropdown: true,
      icon: '/some/icon/url',
      label: {
        en: 'Group2_en',
        de: 'Group2_de',
      },
      items: [
        {
          id: 'parent3',
          label: {
            de: 'Parent3_de',
            en: 'Parent3_en',
          },
          url: '/some/path/parent3',
          items: [
            {
              id: 'item3.1',
              label: {
                de: 'Item 3.1_de',
                en: 'Item 3.1_en',
              },
              url: '/some/path/item3.1',
              application: 'app2',
            },
            {
              id: 'item3.2',
              label: {
                de: 'Item 3.2_de',
                en: 'Item 3.2_en',
              },
              url: '/some/path/item3.2',
              internalRouting: false,
            },
            {
              label: {
                de: 'Item generatedId_de',
                en: 'Item generatedId_en',
              },
              url: '/some/path/generatedId',
            },
          ],
        },
        {
          id: 'parent4',
          label: {
            de: 'Parent4_de',
            en: 'Parent4_en',
          },
          url: '/some/path/parent4',
        },
      ],
    },
    {
      id: 'menu3',
      items: [
        {
          id: 'parent5',
          label: 'Parent5',
          url: '/some/path/parent5',
          items: [
            {
              id: 'item5.1',
              label: 'Item 5.1',
              url: '/some/path/item5.1',
              internalRouting: false,
              destination: 'extern',
            },
          ],
        },
      ],
    },
  ],
};

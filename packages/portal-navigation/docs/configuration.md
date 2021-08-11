---
kind: Portal Navigation
---

# Configuration

The structure and behavior of a portal navigation is defined by its configuration. The configuration must
adhere to the following structure.

## Structure

```json
{
  "menus": [
    {
      "id": "main",
      "items": [
        {
          "label": "Home",
          "url": "/url/to/home"
        },
        {
          "label": "Projects",
          "items": [
            {
              "labels": "Project 1",
              "url": "/url/to/project1"
            },
            {
              "id": "project2",
              "label": "Project 2",
              "url": "/url/to/project2"
            }
          ]
        }
      ]
    }
  ]
}
```

## Menu

| Attribute    | Type                                  | Mandatory | Default |
| ------------ | ------------------------------------- | --------- | ------- |
| items        | `Array<MenuItem>`                     | x         |         |
| dropdown (1) | `boolean`                             |           | false   |
| label (1)    | `String` or `Array<ISO-Code, String>` |           |         |
| icon (1)     | `String`                              |           |         |

(1) If dropdown is true a label and/or icon is necessary.

## Item

| Attribute                   | Type                                  | Mandatory | Default | Menu (4)    |
| --------------------------- | ------------------------------------- | --------- | ------- | ----------- |
| id                          | `String`                              | (1)       |         |             |
| icon                        | `String`                              | (3)       |         |             |
| label                       | `String` or `Array<ISO-Code, String>` | (3)       |         |             |
| url                         | `String`                              | (2)       |         | ignored (5) |
| internalRouting             | `boolean`                             |           | false   | ignored     |
| internalRoutingApplications | `Array<String>`                       |           |         | ignored     |
| destination                 | `String`                              |           |         | ignored (5) |
| application                 | `String`                              |           |         | ignored     |

(1) If you need to identify an item to be able to make it a defaultItem or assign badge values, you need an explicit id.

(2) If a parent item only shows its child items and never needs any routing you might get away with having no url. Otherwise, this can be considered mandatory.

(3) You need to provide a label and/or an icon.

(4) If an item has itself items it is a parent item. Some item attributes have no effect on parent items.

(5) Parent items will show the default item's url (or the first item's url, if there is no default item).

## Parent Items

| Attribute   | Type          | Mandatory | Default          |
| ----------- | ------------- | --------- | ---------------- |
| items       | `Array<Item>` | x         |                  |
| defaultItem | `String`      |           | first child item |

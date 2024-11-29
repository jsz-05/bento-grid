# Dynamic Bento Grid Template

This repository provides a flexible and draggable bento grid template, ideal for creating dynamic layouts. It’s currently used on my [portfolio site](https://jeffreyszhou.com/). Feel free to use and modify this project, just credit me.


https://github.com/user-attachments/assets/2be9ca71-883d-4973-9bf8-4dfb601e75fc


## Overview

The grid functionality is powered by [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout), a powerful library for building responsive grids in React. This template adds smooth transitions and animations to the layout changes using CSS.

## How It Works

The **react-grid-layout** library manages the grid’s core behavior, including item placement and resizing. By integrating React state management, the layout configuration changes dynamically based on user actions, such as clicking navigation buttons.

CSS animations are applied to `.react-grid-item` elements, enabling smooth transitions during layout changes. The key here is CSS properties like `transform`, `transition`, and `will-change`.

### Key CSS Styles

Below are some critical CSS styles used to create the smooth appearance and functionality of the grid, found in ```index.css```

```css
/* Style when dragging */
.react-grid-item.react-grid-placeholder {
  background: rgba(211, 211, 211, 0.99);    /* Light gray placeholder color */
  transition-duration: 100ms;               /* Short transition for quick feedback */
  z-index: 2;
  user-select: none;                        /* Disable text selection */
  border-radius: 25px;
  transition: all 400ms ease 0s !important; /* Smooth animation */
  will-change: transform;
}

/* Grid item style */
.react-grid-item {
  transition: 400ms ease 0s;                /* Smooth transitions between layouts */
}
```

### React Integration

React manages the grid’s layout configuration by dynamically updating the props passed to `react-grid-layout`. Here’s a basic flow of how the grid adjusts between the predefined layouts:

1. **Initial Layout**: Define the starting grid configuration.
2. **User Interaction**: Capture interactions (e.g., navigation clicks).
3. **State Updates**: Update the grid layout stored in React state.
4. **Render**: Pass the new layout to `react-grid-layout` for rendering.

To create grid layouts for various states/views, see this example (utils/layout.helper.ts):
   ```javascript
   const layout1 = [
     { i: 'item1', x: 0, y: 0, w: 2, h: 2 },
     { i: 'item2', x: 2, y: 0, w: 2, h: 2 },
     // Add more items as needed
   ];

   const layout2 = [
     { i: 'item1', x: 0, y: 0, w: 3, h: 1 },
     { i: 'item2', x: 3, y: 0, w: 1, h: 2 },
     // Add more items as needed
   ];
   ```


## Quick Start:

- Clone or fork the repo: ```git clone https://github.com/jsz-05/bento-grid.git```

- Install ```node_modules``` by running ```npm i```

- Run the Vite app ```npm run dev```


## NOTES (PLEASE READ BEFORE CREATING AN ISSUE):

1. **CSS Imports**: Failing to import the required styles from `react-grid-layout` can break the grid rendering.
2. **Manual Configuration**: In this project, grid layouts are manually configured for each view. You might want to explore automating this process to reduce redundancy, since complex layouts can be a pain to edit in ```layout.helper.ts```. For my website, I rigged a jank setup to grab the positions of the tiles from the console debugger once I had them in a layout I liked.
3. **Performance**: Adding too many animations or using large grid layouts can impact performance. Use CSS properties like `will-change` to optimize rendering.


## License

This project is licensed under the [MIT License](LICENSE).

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)


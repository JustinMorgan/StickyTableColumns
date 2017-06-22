# StickyTableColumns

This is a proof-of-concept for an HTML `table` with a sticky first column. The horizontal scrollbar starts at the second column, and the "sticky" first column stays in place as the user scrolls through the table.

The tricky part of this is that the `table`'s auto-stretch behavior is preserved. If the "sticky" cell is taller than the rest of the row, the other cells will stretch to match it. Otherwise, the "sticky" cell will stretch to match the rest of the row. There are other solutions available for the sticky-cell problem, but none I've seen can dynamically stretch to accommodate arbitrary content height.

There's a tiny Express server in here as well, but all it does is serve the proof-of-concept page.

![screenshot](https://github.com/JustinMorgan/StickyTableColumns/raw/master/screencap.PNG)

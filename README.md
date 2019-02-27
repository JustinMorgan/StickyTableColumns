# Sticky HTML Table Columns

## Introduction

This is a CSS and vanilla JS implementation of an HTML `table` with a "sticky" (fixed and floating) first column. The horizontal scrollbar starts at the second column, and the "sticky" first column stays in place as the user scrolls through the table.

![screenshot](https://github.com/JustinMorgan/StickyTableColumns/raw/master/screencap.PNG)

## Why this is different from all the other "fixed table headers" implementations

The tricky part of this is that the table's auto-stretch behavior is preserved. If the "sticky" cell is taller than the rest of the row, the other cells will grow to match it. Otherwise, the "sticky" cell will grow to match the rest of the row. 

There are plenty of other solutions available for the sticky-cell problem, but as far as I can tell, none of them support dynamically stretching/shrinking to fit cell content the way vanilla HTML tables do. This can be awkward when you don't want to hard-code the row height in advance.

## What's in here

There are only two functional pieces here, both in the `StickyTableColumns` subfolder:
- stickify.css
- stickify.js

There's also a working example site in the `Example` subfolder, including a sample page and a tiny Express server that does nothing but serve it.

## To use this in your project

- Include stickify.css and stickify.js in your page.
- Tag the table(s) you want to stickify with `class="stickify"`.
- The table must have `table-layout:fixed`, so make sure you set an explicit width for `th` and `td` in your table.

Note that **this is just a proof of concept** for the dynamic grow/shrink behavior, not a general-purpose plugin. It will probably need some tweaks before you can use it in your project. I've tried to make it easy to modify if you want more features (e.g. more than one sticky column).

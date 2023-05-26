# Sticky HTML Table Columns

## Introduction

This is a CSS and vanilla JS implementation of an HTML `table` with a "sticky" (fixed and floating) first column. The horizontal scrollbar starts at the second column, and the "sticky" first column stays in place as the user scrolls horizontally through the table.

Note that this is a **proof of concept,** not a general-purpose plugin. It will probably need some tweaks before you can use it in your project. I've tried to make it easy to modify if you want more features (e.g. more than one sticky column).

![screenshot](https://github.com/JustinMorgan/StickyTableColumns/raw/master/screencap.PNG)

## Why this is different from all the other "fixed table headers" implementations

The tricky part of this is that the auto-stretch behavior of a vanilla HTML table is preserved. If a sticky cell is taller than the other cells in the row, the whole row will grow to match it. Otherwise, the sticky cell will grow to match the rest of the row. 

There are other solutions out there for the sticky-column problem, but as far as I can tell, none of them support dynamic row height. This can be a problem when you don't want to hard-code the row height in advance.

## How to use this in your project

- Each cell in your table must have an explicit width set in your CSS. This just means you need a `width` setting for `td` and `th`.
- Include stickify.css and stickify.js in your page.
- Tag the table(s) you want to stickify with `class="stickify"`.
- Alternatively, you can manually run the `window.stickify` function on the tables you want to affect.

## What's in here

There are only two moving parts here:
- stickify.css
- stickify.js

There's also an `example.html` to show you what it looks like.

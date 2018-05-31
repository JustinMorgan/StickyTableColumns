let stickify = (function() {
  //Making the sticky column float in place is easy; we did that with a few lines of CSS. Our problem
  //now is that we've pulled it out of the normal flow by setting position:absolute on it. That means
  //the row won't automatically stretch to match its height, nor will short "sticky cells" stretch to 
  //fill the row they're in.
  //To solve this problem, we're going to calculate the correct height of each row and force each cell
  //to fill that height. Since padding and border could conceivably be different across the row, we
  //need to take those into account during both steps: Include them when calculating rowHeight, then
  //subtract them again when setting each cell's CSS height property.
  function normalizeRowHeights(table) {
    //Grab all table rows and convert it into an array
    let rows = [].slice.apply(table.rows);
    
    rows.forEach(row => {
      //Now grab all this row's cells in an array
      let cells = [].slice.apply(row.cells);
      
      //Don't worry about cells spanning multiple rows; they won't affect the calculation except in
      //some truly bizarre edge cases
      cells = cells.filter(cell => !(cell.rowSpan > 1));
      
      //Turn the array of cells into an array of height values
      let cellHeights = cells.map(c => c.offsetHeight);
      
      //Find the maximum. This is the height of the tallest cell in the row, including the "sticky"
      //cells. All the other cells need to stretch to match it.
      let rowHeight = Math.max.apply(null, cellHeights);

      cells.forEach(cell => {
        //We've calculated the offsetHeight this cell needs to match, but that's not a property we
        //can set. We're going to be setting the `height` style property, which means we have to
        //subtract padding and border from the offsetHeight value we have.
        let cellStyle = cell.currentStyle || window.getComputedStyle(cell);
        let offsets = [
          cellStyle.paddingBottom, 
          cellStyle.paddingTop, 
          cellStyle.borderBottomWidth,
          cellStyle.borderTopWidth
        ];
        //No need to do the calculation ourselves; we don't want to deal with units like px, pt,
        //percentage values, and so forth. The CSS calc function will handle all that.
        cell.style.height = `calc(${rowHeight + 1}px - ${offsets.join(" - ")})`;
      });
    });
  }

  //Inject inner and outer wrapper divs if they're not already present
  function createScrollBox(table) {
    let scroll = table.parentNode;

    if (!scroll.classList.contains("scroll")) {
      scroll = document.createElement('div');
      scroll.classList.add("scroll");
  
      //Now we need to offset the scrollable box by the width of the "sticky" column to make sure 
      //the scrollbar and non-floating cells aren't hidden beneath them. To do that, we have to
      //calculate the total offsetWidth of the sticky column. 
      //Since this version supports only one sticky column, we can just use the first cell of the
      //first row.
      //NOTE: Multiple "sticky" columns aren't supported yet, but could be with a few adjustments.
      //This function assumes exactly one sticky column comprising the first cell of each row,
      //all having the same width.
      //NOTE: It's MUCH easier to just set an explicit width for .scroll in the CSS. This is here 
      //to demonstrate that it can be done dynamically.
      if (table && table.rows[0] && table.rows[0].cells[0]) {
        let topRow = table.rows[0];
        let stickyCell = topRow.cells[0];
        let stickyWidth = stickyCell.offsetWidth;
        scroll.style.marginLeft = stickyWidth + "px";
      }

      //Inject the scrollbox as a wrapper for the table
      table.parentNode.insertBefore(scroll, table);
      scroll.appendChild(table);
    }

    //Now we inject an outer shell with position:relative for the floating header to stick to.
    if (!scroll.parentNode.classList.contains("wrap")) {
      let wrapper = document.createElement('div');
      wrapper.classList.add("wrap");

      scroll.parentNode.insertBefore(wrapper, scroll);
      wrapper.appendChild(scroll);
    }
  }
  
  return function(table) {
      createScrollBox(table);
      normalizeRowHeights(table);
      table.style.visibility = "inherit";
  };
})();


  //Grab all the tables on the page with the "stickify" flag class and fix all their row heights.
  let tables = document.querySelectorAll("table.stickify");
  [].forEach.call(tables, table => {
    stickify(table);
  });
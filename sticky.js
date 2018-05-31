(function() {
  //Making the sticky column float in place is easy; we did that with a few lines of CSS. Our problem
  //now is that we've pulled it out of the normal flow by setting position:absolute on it. That means
  //the row won't automatically stretch to match its height, nor will short "sticky cells" stretch to 
  //fill the row they're in.
  //To solve this problem, we're going to calculate the correct height of each row and force each cell
  //to fill that height. Since padding and border could conceivably be different across the row, we
  //need to take those into account during both steps: Include them when calculating rowHeight, then
  //subtract them again when setting each cell's CSS height property.
  function normalizeHeights(table) {
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
  
  //Since this is an example, grab the one and only table on the page and process it.
  let table = document.getElementsByTagName("table")[0];
  normalizeHeights(table);
})()

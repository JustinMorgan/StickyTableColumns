(function() {
  function normalizeHeights(table) {
    let rows = [].slice.apply(table.rows);
    rows.forEach(row => {
      let cells = [].slice.apply(row.cells);
      cells = cells.filter(cell => !(cell.rowSpan > 1));
      let cellHeights = cells.map(c => c.clientHeight);
      let rowHeight = Math.max.apply(null, cellHeights);

      cells.forEach(cell => {
        let cellStyle = cell.currentStyle || window.getComputedStyle(cell);
        let offsets = [
          cellStyle.paddingBottom, 
          cellStyle.paddingTop, 
          cellStyle.borderBottomWidth,
          cellStyle.borderTopWidth
        ];
        cell.style.height = `calc(${rowHeight + 1}px - ${offsets.join(" - ")})`;
      });
    });
  }
  let table = document.getElementsByTagName("table")[0];
  normalizeHeights(table);
})()

// 將顯示為 blocklyFlyout 且不是 none 的元素的寬度設置為 600px
document.querySelectorAll('.blocklyFlyout:not([style*="display:none"])').forEach(flyout => {
    flyout.style.width = '600px';
});


// 添加點擊事件監聽器，並為每個類別添加點擊事件
document.querySelectorAll('.blocklyToolboxCategory').forEach(category => {
  category.addEventListener('click', () => {
    // 在 .blocklyFlyout 中找到 class=blocklyWorkspace 元素
    const workspace = document.querySelectorAll('.blocklyFlyout .blocklyWorkspace')[1];
    if (!workspace) return;

    // 在 .blocklyWorkspace 中找到 class=blocklyBlockCanvas 元素
    const blockCanvas = workspace.querySelector('.blocklyBlockCanvas');
    if (!blockCanvas) return;

    // 找到所有 class=blocklyDraggable 的元素
    const draggableElements = blockCanvas.querySelectorAll('.blocklyDraggable');
    draggableElements.forEach(draggableElement => {
      // 創建要添加的元素
      const newElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      newElement.setAttribute('transform', 'translate(10,32)');

      const leftPosition = draggableElement.getBoundingClientRect().left;

      newElement.innerHTML = `
        <rect x="${leftPosition}" y="0" width="250" height="20" fill="lightgrey"></rect>
        <text class="blocklyText" x="${leftPosition + 10}" y="14" fill="black" style="font-weight: bold;">${blocksDescriptions[window.blockTypeIdMap[draggableElement.getAttribute('data-id')].type]}</text>
      `;

      //newElement.innerHTML = `
        //<rect x="140" y="0" width="250" height="20" fill="lightgrey"></rect>
        //<text class="blocklyText" x="150" y="14" fill="black" style="font-weight: bold;">${blocksDescriptions[window.blockTypeIdMap[draggableElement.getAttribute('data-id')].type]}</text>
      //`;

      // 在 draggableElement 的 child 中添加新的元素
      draggableElement.appendChild(newElement);
    });
  });
});


const blocksDescriptions = {
  "controls_if": "如果if成立，就執行do裡面的指令",
  "another_block_type": "另一種塊的描述",
  "yet_another_block_type": "另一個塊的描述"
};
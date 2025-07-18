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
        newElement.setAttribute('transform', 'translate(0,0)');
        const description = blocksDescriptions[window.blockTypeIdMap[draggableElement.getAttribute('data-id')].type] || '描述不可用';  // 提供默认描述，防止undefined
        newElement.innerHTML = `
      <rect id="background" x="140" y="0" width="250" height="20" fill="lightgrey"></rect>
      <text id="dynamicText" class="blocklyText" x="150" y="14" fill="black" style="font-weight: bold;">${blocksDescriptions[window.blockTypeIdMap[draggableElement.getAttribute('data-id')].type]}</text>
    `;
        if (description !== '描述不可用') {  // 只有在描述有效时才添加元素
          draggableElement.appendChild(newElement);
        }
      });

      // 獲取所有的文字元素
      var textElements = document.querySelectorAll('#dynamicText');

      // 遍歷所有文字元素
      for (var i = 0; i < textElements.length; i++) {
        var textElement = textElements[i];
        var bbox = textElement.getBBox();
        var rect = document.getElementById('background');
        var rect = textElement.parentNode.querySelector('rect');
        // 設定外框的尺寸和位置
        rect.setAttribute('x', bbox.x - 10); // 略微擴大背景框以包括一些邊距
        rect.setAttribute('y', bbox.y - 10);
        rect.setAttribute('width', bbox.width + 20);
        rect.setAttribute('height', bbox.height + 20);
      }
  });
});

document.querySelectorAll('.blocklyFlyout:not([style*="display:none"])').forEach(flyout => {
  flyout.style.width = '600px';
});

// 添加点击事件监听器，并为每个类别添加点击事件
document.querySelectorAll('.blocklyToolboxCategory').forEach(category => {
  category.addEventListener('click', () => {
    // 检查是否是 "Variables" 类别
    if (category.textContent.trim() === "Variables") {  // 假设类别名称是“Variables”，确保这与您的实际内容匹配
      const workspace = document.querySelectorAll('.blocklyFlyout .blocklyWorkspace')[1];
      if (!workspace) return;

      const blockCanvas = workspace.querySelector('.blocklyBlockCanvas');
      if (!blockCanvas) return;

      const draggableElements = blockCanvas.querySelectorAll('.blocklyDraggable');
      draggableElements.forEach(draggableElement => {
        const typeId = draggableElement.getAttribute('data-id');
        const blockType = window.blockTypeIdMap && window.blockTypeIdMap[typeId] ? window.blockTypeIdMap[typeId].type : null;

        // 确保只处理 Variables 类别中的特定块
        if (blockType === 'variables_set' || blockType === 'variables_get') {
          const description = variables_descriptions[blockType] || '描述不可用';
          const newElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          newElement.setAttribute('transform', 'translate(0,0)');
          newElement.innerHTML = `
            <rect id="background" x="140" y="0" width="250" height="20" fill="lightgrey"></rect>
            <text id="dynamicText" class="blocklyText" x="150" y="14" fill="black" style="font-weight: bold;">${description}</text>
          `;
          if (description !== '描述不可用') {
            draggableElement.appendChild(newElement);
          }
        }
      });

      // 获取所有的文字元素
      var textElements = document.querySelectorAll('#dynamicText');
      for (var i = 0; i < textElements.length; i++) {
        var textElement = textElements[i];
        var bbox = textElement.getBBox();
        var rect = textElement.parentNode.querySelector('rect');
        // 设置外框的尺寸和位置
        rect.setAttribute('x', bbox.x - 10); // 略微扩大背景框以包括一些边距
        rect.setAttribute('y', bbox.y - 10);
        rect.setAttribute('width', bbox.width + 20);
        rect.setAttribute('height', bbox.height + 20);
      }
    }
  });
});



const blocksDescriptions = {
  //"controls_if": "<tspan x=\"150\" dy=\"0\" fill=\"black\" >if (condition){</tspan><tspan x=\"150\" dy=\"20\" fill=\"black\"> //執行內部命令</tspan><tspan x=\"150\" dy=\"40\" fill=\"black\">}if{</tspan>",
  "logic_compare": "<tspan x=\"158\" dy=\"0\" fill=\"black\">(x == y)</tspan><tspan x=\"158\" dy=\"20\" fill=\"black\">// 可以更換 '==' 為其他符號</tspan>",
  "logic_operation": "<tspan x=\"158\" dy=\"0\" fill=\"black\">(x && y)</tspan><tspan x=\"158\" dy=\"20\" fill=\"black\">// 可以更換 '&&'或 '||'</tspan>",
  "controls_repeat_ext": "<tspan x=\"378\" dy=\"0\" fill=\"black\">for (int i = 0; i <= n; i++) {</tspan><tspan x=\"378\" dy=\"20\" fill=\"black\">   //執行內部命令</tspan><tspan x=\"378\" dy=\"40\" fill=\"black\">}</tspan>",
  "controls_whileUntil": "<tspan x=\"378\" dy=\"0\" fill=\"black\">while (condition) {</tspan><tspan x=\"378\" dy=\"20\" fill=\"black\">   //執行內部命令</tspan><tspan x=\"378\" dy=\"40\" fill=\"black\">}</tspan>",
  "controls_for": "<tspan x=\"378\" dy=\"0\" fill=\"black\">for (int i = 0; i <= n; i++) {</tspan><tspan x=\"378\" dy=\"20\" fill=\"black\">   //執行內部命令</tspan><tspan x=\"378\" dy=\"40\" fill=\"black\">}</tspan>",
  "controls_flow_statements": "<tspan x=\"378\" dy=\"0\" fill=\"black\">break;</tspan><tspan x=\"378\" dy=\"20\" fill=\"black\">continue;</tspan>",
  "math_number": "<tspan x=\"340\" dy=\"0\" fill=\"black\">123</tspan>",
  "math_arithmetic": "<tspan x=\"340\" dy=\"0\" fill=\"black\">(x + y)</tspan><tspan x=\"340\" dy=\"20\" fill=\"black\">// 可以更换 '+' 為其他符號</tspan>",
  "text": "<tspan x=\"523\" dy=\"0\" fill=\"black\">\"Hello, World!\"</tspan><tspan x=\"523\" dy=\"20\" fill=\"black\">// 可以更換字串內容</tspan>",
  "text_print": "<tspan x=\"518\" dy=\"0\" fill=\"black\">printf(\"%d\",123);</tspan>",
  "controls_if": `
  <tspan x="150" dy="0" fill="black">if (condition) {</tspan>
  <tspan x="350" dy="0" fill="black">if (condition) {</tspan>
  <tspan x="150" dy="20" fill="black"> // 執行內部命令</tspan>
  <tspan x="350" dy="0" fill="black"> // 執行內部命令</tspan>
  <tspan x="150" dy="20" fill="black">}</tspan>
  <tspan x="350" dy="0" fill="black">} else if (condition) {</tspan>
  <tspan x="350" dy="20" fill="black"> // 執行內部命令</tspan>
  <tspan x="350" dy="20" fill="black">}</tspan>
  <tspan x="360" dy="0" fill="black">else {</tspan>
`

};


const variables_descriptions = {
  "variables_set": "<tspan x=\"194\" dy=\"0\" fill=\"black\">a = 123 ;</tspan>",
  "variables_get": "<tspan x=\"202\" dy=\"0\" fill=\"black\"> a ;</tspan>",
  
};


document.getElementById('tab_javascript').style.display = 'none';
document.getElementById('tab_python').style.display = 'none';
document.getElementById('tab_php').style.display = 'none';
document.getElementById('tab_lua').style.display = 'none';
document.getElementById('tab_dart').style.display = 'none';
document.getElementById('tab_xml').style.display = 'none';
document.getElementById('tab_json').style.display = 'none';

// 添加到HTML中的Prism初始化脚本
document.addEventListener('DOMContentLoaded', function() {
  // 等待页面完全加载
  setTimeout(function() {
    if (window.Prism) {
      try {
        console.log("Prism全局初始化开始...");
        // 预处理行号
        const lineNumbersBlocks = document.querySelectorAll('pre.line-numbers');
        if (lineNumbersBlocks.length > 0) {
          console.log("处理行号:", lineNumbersBlocks.length, "个代码块");
          lineNumbersBlocks.forEach(function(block) {
            if (!block.querySelector('.line-numbers-rows')) {
              const code = block.querySelector('code');
              if (code) {
                const match = code.innerHTML.match(/\n(?!$)/g);
                const linesNum = match ? match.length + 1 : 1;
                const lines = new Array(linesNum + 1).join('<span></span>');
                
                const lineNumbersWrapper = document.createElement('span');
                lineNumbersWrapper.className = 'line-numbers-rows';
                lineNumbersWrapper.innerHTML = lines;
                
                block.appendChild(lineNumbersWrapper);
              }
            }
          });
        }
        
        // 高亮所有代码
        window.Prism.highlightAll();
        console.log("Prism初始化完成!");
      } catch (e) {
        console.error("Prism初始化错误:", e);
      }
    } else {
      console.error("Prism未找到!");
    }
  }, 500);
});

// 添加复制代码功能
(function() {
  if (!window.Prism || !document.querySelectorAll) {
    return;
  }
  
  // 监听DOM变化，为新的代码块添加复制按钮
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        const addedNodes = mutation.addedNodes;
        for (let i = 0; i < addedNodes.length; i++) {
          if (addedNodes[i].nodeType === 1) { // 元素节点
            const node = addedNodes[i];
            const codeBlocks = node.querySelectorAll ? node.querySelectorAll('pre:not(.copied-button-added)') : [];
            
            // 为新代码块添加复制按钮
            Array.prototype.forEach.call(codeBlocks, function(pre) {
              addCopyButton(pre);
            });
          }
        }
      }
    });
  });
  
  // 开始监听DOM变化
  observer.observe(document.body, { childList: true, subtree: true });
  
  // 为代码块添加复制按钮
  function addCopyButton(pre) {
    if (!pre || pre.classList.contains('copied-button-added')) {
      return;
    }
    
    pre.classList.add('copied-button-added');
    
    const code = pre.querySelector('code');
    if (!code) return;
    
    // 创建复制按钮
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = '复制';
    button.setAttribute('aria-label', '复制代码');
    
    // 添加复制功能
    button.addEventListener('click', function() {
      const text = code.textContent;
      
      navigator.clipboard.writeText(text).then(function() {
        button.textContent = '已复制!';
        setTimeout(function() {
          button.textContent = '复制';
        }, 2000);
      }).catch(function(err) {
        console.error('复制失败:', err);
        button.textContent = '复制失败';
        setTimeout(function() {
          button.textContent = '复制';
        }, 2000);
      });
    });
    
    // 创建一个容器将代码块包裹起来，以便于定位复制按钮
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    
    // 获取父元素并插入wrapper
    const parent = pre.parentNode;
    if (parent) {
      parent.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
    }
    
    // 添加复制按钮
    wrapper.appendChild(button);
  }
  
  // 初始化时为所有代码块添加复制按钮
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      const codeBlocks = document.querySelectorAll('pre:not(.copied-button-added)');
      Array.prototype.forEach.call(codeBlocks, addCopyButton);
    }, 800);
  });
})(); 
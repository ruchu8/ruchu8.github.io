        document.addEventListener('DOMContentLoaded', function() {
            document.addEventListener('copy', function(e) {
                // 获取当前选择的文本
                const selectedText = document.getSelection().toString();
                
                // 获取当前页面的URL
                const currentUrl = window.location.href;

                // 定义尾巴内容
                const tail = `\n\n转载出处: ${currentUrl}\n本文出自: 【如初的网盘】`;

                // 创建一个新的剪贴板数据对象
                const clipboardData = e.clipboardData || window.clipboardData;
                
                // 设置新的文本内容（原文本 + 尾巴内容）
                clipboardData.setData('text/plain', selectedText + tail);
                
                // 阻止默认的复制行为
                e.preventDefault();
            });
        });


        <script type="text/javascript" id="myhk" src="https://myhkw.cn/api/player/171819249893" key="171819249893" m="1"></script>
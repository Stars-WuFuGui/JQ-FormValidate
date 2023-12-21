<div class="container mt-5">
 <div>
    <h2>Validator Plugin Usage</h2>
    <p>该插件依赖 jQuery 3.6.0 或以上，并且基于 HTML 的 Form 进行操作。</p>
    <p>(2.2 版本及以下仅支持 Input 管理)</p>
    <h3>一. 使用方式</h3>
    <h5>
    	在开始前确保已导入 jQuery 3.6.0 及以上版本和 FormValidate.js 以及 FormValidate.css。
    	        <br>
        &lt;script src="https://cdn.jsdelivr.net/gh/Stars-WuFuGui/JQ-FormValidate@main/2.2/FormValidate.js"&gt;&lt;/script&gt;
        <br>
    		&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Stars-WuFuGui/JQ-FormValidate@main/2.2/FormValidate.css"&gt;
    </h5><h6><a href="https://cdn.jsdelivr.net/gh/Stars-WuFuGui/JQ-FromAailable@main/2.2/MainTest.html">演示文件</a></h6>
    <ol>
        <li><strong>确保至少有一种可以使用 jQuery 获取表单的方式。</strong></li>
        <li><strong>表单不需要 label，替换为 Input 的 placeholder 属性。</strong></li>
        <li><strong>必须具有 name 属性（用作唯一标识）。</strong></li>
        <li><strong>在 script 中创建对象并初始化：</strong>
            </br><pre>
                <code class="html">
                    let validator = new Validator();
                    validator.initForm($('#Form'));
                </code>
            </pre>
            <p>此时表单已完成初始加载（默认为不为空即通过验证）。</p>
            <p>注: 最好每个表单都有自己的对象 以免发生串表管理</p>
        </li>
        <li>
            <strong>对某一个 Input（以下称为控件）进行配置:</strong>
            <ul>
                <li><strong>inputName:</strong> 控件的名称(也就是placeholder属性的内容)</li>
                <li><strong>validate:</strong> 正则表达式</li>
                <li><strong>color:</strong> 不符合正则时弹出的颜色</li>
                <li><strong>message:</strong> 不符合正则时弹出的提示</li>
                <li><strong>submitFunction:</strong> 额外验证方式，需要一个 function 返回 true 则为通过，否则返回失败原因。常见的 ajax 请求如下：
                    </br><pre>
                        <code class="javascript">
                            function reName(input) {
                                // 返回一个 Promise 对象
                                return new Promise(function (resolve, reject) {
                                    $.ajax({
                                        type: "Post",
                                        url: "reName",
                                        async: true,
                                        contentType: "application/json",
                                        data: input.val(),
                                        success: function (bool) {
                                            if (bool) {
                                                resolve(bool);
                                            } else {
                                                resolve("账户重复");
                                            }
                                        },
                                        error: function () {
                                            reject("请求失败");
                                        }
                                    });
                                });
                            }
                        </code>
                    </pre>
                    常见的一般函数如下：
                    </br><pre>
                        <code class="javascript">
                            function rePassword(input){
                                if(input.val()=="Password"){
                                    return true;
                                }
                                return "密码不为Password";
                            }
                        </code>
                    </pre>
                </li>
                <li><strong>FunctionType:</strong> 额外验证方式是否启用 ajax</li>
                <li><strong>submitBool:</strong> 该列是否默认能提交（一般为 false）。如果不使用 submitFunction 则不需要填写该列。</li>
                <li><strong>afterBlur:</strong> 关联该列和另一列</li>
                <li><strong>afterBlurFrequency:</strong> 可迭代次数，默认为1(列如关联密码和确认密码)<br>
                	以下为示例(需要自己创建一个html页面或者<a href="https://cdn.jsdelivr.net/gh/Stars-WuFuGui/JQ-FromAailable@main/2.2/Test.html">进去copy一个</a>)
	                </br><pre>
		                <code class="html">
		                	&lt;script src="https://code.jquery.com/jquery-3.6.0.min.js"&gt;&lt;/script&gt;
		                	&lt;script src="https://cdn.jsdelivr.net/gh/Stars-WuFuGui/JQ-FormValidate@main/2.2/FormValidate.js"&gt;&lt;/script&gt;
   					&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Stars-WuFuGui/JQ-FormValidate@main/2.2/FormValidateStandalone.css"&gt;
					//注:此处使用的是独立版本即不使用bootstrap.css的css Link 如果使用bootstrap则使用以下Link
					&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Stars-WuFuGui/JQ-FormValidate@main/2.2/FormValidate.css"&gt;
		                	&lt;form id="form1"&gt;
		                		&lt;input type="password" name="userpassword" id="userPassword" value="" placeholder="密码"&gt;
				    		&lt;input type="password" name="ruserpassword" id="ruserPassword" value="" placeholder="确认密码"&gt;
		                	&lt;/form&gt; 
		                	&lt;script&gt;
		                		var validator = new Validator();
		                		validator.initForm($("#form1"));
		                		validator.setValidate("userpassword",{
					                "inputName":"密码",
					                "validate":/^[a-zA-Z0-9]{4,12}$/,
					                "color":"red",
					                "message":"密码必须为4-12位",
					                "submitFunction":rePassword,
					                "submitBool":false,
					                "afterBlur":"ruserpassword"
					            })
					            validator.setValidate("ruserpassword",{
					                "inputName":"确认密码",
					                "validate":/^[a-zA-Z0-9]{4,12}$/,
					                "color":"red",
					                "message":"确认密码必须为4-12位",
					                "submitFunction":rePassword,
					                "submitBool":false,
					                "afterBlur":"userpassword"
					            })
		                		function rePassword() {
						            if ($("#userPassword").val()==$("#ruserPassword").val()){
						                return true;
						            }
						            return "两次密码不相同1111";
						        }
		                	&lt;/script&gt;
		                </code>
		            </pre>
                </li>
            </ul>
        </li>
        <li>
            <strong>验证表单(常用于修改):</strong>
            <p>Q:为什么会有该方法?</p>
            <p>A:用于解决非用户填入的数据,如使用js对控件进行设值或者控件具有value属性,此时不会触发焦点离开事件故而出现提示词盖住内容的情况</p>
            <p>Q:怎么使用?</p>
            <p>A: 使用如下代码</p>
            </br><pre>
                <code class="html">
                    validator.loadValue();
                </code>
            </pre>
            <p>即可使用触发整个表单的焦点离开事件</p>
        </li>
        <li>
            <strong>表单提交:</strong>
            <ul>
                <li>
                    <p>Form的Action提交 只需在Form表单加上Action属性当发生表单提交事件时  <strong>验证通过</strong>  即可提交表单</p>
                    </br><pre>
                        <code class="html">
                            &lt;form action="#"&gt;
                                &lt;input name="placeholder" placeholder="表单内容"&gt;
                            &lt;/form&gt;
                        </code>
                    </pre>
                </li>
                <li>
                    <p>如果使用ajax提交则需要使用</p>
                    </br><pre>
                        <code class="html">
                            validator.afterSubmit=function(){
                                $.ajax({
                                    type: "Post",
                                    url: "Action",
                                    contentType: "application/json",
                                    dataType: "json",
                                    data: JSON.stringify(validator.getValue()),
                                    success: function(data) {
                                        // 可以提示或其他逻辑
                                    },
                                    error: function(error) {
                                        console.error("Error:", error);
                                    }
                                });
                            };
                        </code>
                    </pre>
                    <p>当然也可以引用已有的函数</p>
                    </br><pre>
                        <code class="html">
                            validator.afterSubmit=PostAjax;
                            function PostAjax(){
                                $.ajax({
                                    type: "Post",
                                    url: "Action",
                                    contentType: "application/json",
                                    dataType: "json",
                                    data: JSON.stringify(validator.getValue()),
                                    success: function(data) {
                                        // 可以提示或其他逻辑
                                    },
                                    error: function(error) {
                                        console.error("Error:", error);
                                    }
                                });
                            };
                        </code>
                    </pre>
                    <p>这时 发生表单提交事件时  <strong>验证通过</strong>  即可触发该函数 并且取消Form的默认提交</p>
                </li>
            </ul>
        </li>
    </ol>
    <h3>二. 实现原理</h3>
    <ol>
    	<li>
    		:2.2版本即以下
    		<ul>
    			基于prototype实现多个表单管理,定义方法initForm传入表单获取表单内input并且</br>
    			获取input的name作为key 其次初始化其表单验证内容,在控件焦点离开时触发事件从而</br>
    			获取该对象管理表单中对应的key所对应的属性,将属性取出来并对比,对于ajax请求则使用.then处理</br>
    		</ul>
    	</li>
    	<li><strong>作者开发时遇到的问题:</strong>
    		<ol>
    			<li>
    				:最最最开始准备写一个传入表单然后验证提示的但是发现如果只提示不符合规则不行
    				</br>得写提示,那么提示写在哪里呢?参考到某网站的验证方式,觉得很高级于是写出来的一个初版插件
    			</li>
    			<li>
    				:如何实现控件串联呢?密码,确认密码多个控件如果单一改变就太low了,于是多添加了一个逻辑迭代
    			</li>
    			<li>
    				:刚开始使用函数写 后面出现串表单现象 改成prototype模式
    			</li>
    		</ol>
    	</li>
    </ol>
	 <h3>三,更新日志</h3>
    <ol>
    	<li>
    		<strong>2023/12/21/23:23</strong>
		<span>更改了getValue方法 条件 由input[name="...."]修改成 *[name="....."]</span>
    	</li>
    </ol>
</div>

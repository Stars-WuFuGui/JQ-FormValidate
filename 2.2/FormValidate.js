/* 具有如下属性:
	   将 Validator 创建成类似 java 的对象 以实现多个表单管理
	   调用时使用 new Validator();
	   举例: {
	       1: var v1 = new Validator();
	       // 初始化表单验证
	       v1.initForm($("#userForm"))
	       // 初始化之后表单中带有 name 和 placeholder 属性的已被初始化
	       (单选框和多选框,复选框不可使用推荐添加required属性)
	       (因为单选框多选框复选框只需要有选择就行不需要额外验证)
	   }
	   defaultColor 通过验证之后默认为什么颜色 默认为"#808080"(淡灰色)
	   validates 具有两个属性 name 和 validate
		   name ---> input 的 name 属性
		   validate 具有如下属性:
		   "inputName": "控件名称",
		   "validate": 正则表达式,
		   "color": 不符合正则时弹出的颜色,
		   "message": 不符合正则时弹出的提示,
		   "submitFunction": 额外验证方式(需要一个 function 返回 true 则为通过否则返回失败原因),
		         常见的 ajax 请求如下
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
		   "FunctionType": 额外验证方式 是否启用 ajax,
		   "submitBool": 该列是否默认能提交(一般为 false) // 如果不使用 submitFunction 则不需要填写该列
		   "afterBlur": 关联该列和另一列
		   "afterBlurFrequency": 可迭代次数  //默认为1 
	*/
/*
* author:WuFuGui
* version:2.2
*
* */
function Validator() {
	this.defaultColor = "#808080";
    this.validates = {};
    this.submitFunction = void 0;
    this.afterSubmit = void 0;
    this.form = void 0;
};
Validator.prototype = {
    loadValue: function () {
        var self = this
        for (var key in self.validates) {
            self.blured(self.form.find("input[name='" + key + "']"), 0);
        }
    },
    initForm: function (form) {
        var self = this;
        self.form = form;
        // 设置 placeholder 的逻辑
        form.find('input').each(function () {
            let attr = $(this).attr("placeholder");
            let name = $(this).attr('name');
            if (attr == "" || attr === void 0) {
                return;
            }
            let inputType = $(this).attr('type');
            $(this).attr("placeholder", "");
            var placeholderSpan =$("<span>").text("请输入" + attr).addClass("placeholder").data('name', name).click(function () {
                $(form).find('input[name="' + name + '"]').focus();
            });
            if(inputType == "date" || inputType == "file"){
            	$(placeholderSpan).addClass("dateAction");
            }
            $(this).after(placeholderSpan);
            self.addValidate(name, { "inputName": attr, "validate": "", "color": "red", "message": "格式错误" });
        });
        self.loadingPlaceholder(form);
    },
    loadingPlaceholder: function (form) {
        var self = this;

        $(form).submit(function (e) {
            var flag = true;
            form.find('input').each(function () {
                var name = $(this).attr('name');
                var value = $(this).val();

                if (name == void 0 || name == "" || self.validates[name] == void 0) {
                    return;
                }

                var validateElement = self.validates[name]["submitBool"];
                if (validateElement == void 0) {

                }else if(!validateElement){
                    flag=false;
                }

                if (self.validates[name]["validate"] != void 0 && self.validates[name]["validate"] != "") {
                    if (!value.match(self.validates[name]["validate"])) {
                        flag = false;
                    }
                }

                if (value == "" || value == void 0) {
                    flag = false;
                }
            });

            if (!flag) {
                self.loadValue();
                alert("请按要求填写表单");
                return flag;
            }
            var afterSubmit = self.afterSubmit;
            if (afterSubmit != void 0 && flag) {
                e.preventDefault();
                afterSubmit()
            }
            return flag;
        });

        $(self.form).find('input:not([type="checkbox"]):not([type="radio"]):not([type="submit"])').on('focus', function () {
            var inputName = $(this).attr('name');
            $(self.form).find(".placeholder").each(function (index, element) {
                var nameValue = $(this).data("name");
                if (inputName == nameValue) {
                    $(this).addClass('action');
                    return;	
                }
            });
        });

        $(self.form).find('input:not([type="checkbox"]):not([type="radio"]):not([type="submit"])').on('blur', function () {
            var bool = self.validates[$(this).attr('name')]["afterBlurFrequency"];
            self.blured($(this), bool);
        });
    },

    blured: function (Eml, bool) {
        var self = this;
        var inputName = $(Eml).attr('name');
        let val = $(Eml).val();
        var flag = true;
        var validateElement1 = self.validates[inputName];
        var validateElement2;

        if (bool-- >= 1) {
            if (validateElement1 != void 0) {
                validateElement2 = validateElement1["afterBlur"];
                if (validateElement2 != void 0) {
                    self.blured($("input[name='" + validateElement2 + "']"), bool);
                }
            }
        }

        $(self.form).find(".placeholder").each(function (index, element) {
            var nameValue = $(this).data("name");
            if (nameValue == void 0) {
                return;
            }

            if (flag) {
                var nameValue = $(this).data("name");
                if (inputName == nameValue) {
                    flag = false;
                    $(this).addClass('action');
                    var validateElement = self.validates[nameValue]["submitFunction"];
                    var validateElement1 = self.validates[nameValue]["FunctionType"];
                    if (val == "") {
                        $(this).css("color", "red");
                        $(this).text(self.validates[nameValue]["inputName"] + "不能为空");
                        $(this).removeClass("action");
                        return;
                    }

                    if (self.validates[nameValue]["validate"] != void 0 && self.validates[nameValue]["validate"] != "") {
                        if (!val.match(self.validates[nameValue]["validate"])) {
                            $(this).css("color", self.validates[nameValue]["color"]);
                            $(this).text(self.validates[nameValue]["message"]);
                            return;
                        }
                    }
                   
                    if (validateElement1 != void 0 && validateElement1) {
                    	self.validates[nameValue]["submitBool"] = false;
                        if (validateElement != void 0 && validateElement != "") {
                            var thisElement = $(this);
                            var submitFunction = validateElement($(Eml));
                            submitFunction.then(function (result) {
                                if (result != true) {
                                    self.validates[nameValue]["submitBool"] = false;
                                    $(thisElement).css("color", self.validates[nameValue]["color"]);
                                    $(thisElement).text(self.validates[nameValue]["inputName"] + result);
                                } else {
                                    $(thisElement).css("color", "green");
                                    $(thisElement).text(self.validates[nameValue]["inputName"] + "可用");
                                    self.validates[nameValue]["submitBool"] = true;
                                }

                            }).catch(function (error) {
                                console.error(error);
                            });
                        } else {
                            $(this).css("color", self.validates[nameValue]["color"]);
                            $(this).text(self.validates[nameValue]["input	Name"] + "SubmitFunction异常");
                        }
                    } else {
                        if (validateElement != void 0 && validateElement != "") {
                            var submitFunction = validateElement($(Eml));
                            if (submitFunction != true) {
                                self.validates[nameValue]["submitBool"] = false;
                                $(this).css("color", self.validates[nameValue]["color"]);
                                $(this).text(self.validates[nameValue]["inputName"] + submitFunction);
                                return;
                            } else {
                            	$(this).css("color", "green");
                                $(this).text(self.validates[nameValue]["inputName"]);
                                self.validates[nameValue]["submitBool"] = true;
                                return;
                            }
                        }
                    }
                    
                    $(this).css("color", self.defaultColor);
                    $(this).text(self.validates[nameValue]["inputName"]);
                }
            }
        });
    },

    getValue:function(rule){
        var self = this;
        var values = {};
        $.each(self.validates, function (name, value) {
            var val = self.form.find("input[name='"+name+"']").val();
            if (rule!= void 0 && rule[name]!=void 0){
                name = rule[name];
            }
            values[name] = val;
        });
        return values;
    },

    setValidates: function (validate) {
        this.validates = validate;
    },

    addValidate: function (name, validate) {
        var inputName = validate["inputName"];
        if (inputName === "" || inputName === void 0) {
            validate["inputName"] = name;
        }
        var color = validate["color"];
        if (color === "" || color === void 0) {
            validate["color"] = "red";
        }
        var message = validate["message"];
        if (message === "" || message === void 0) {
            validate["message"] = "格式错误";
        }
        var afterBlurFrequency = validate["afterBlurFrequency"];
        if (afterBlurFrequency === "" || afterBlurFrequency === void 0) {
            validate["afterBlurFrequency"] = 1;
        }
        this.validates[name] = validate;
    },

    setValidate: function (name, validate) {
        var inputName = validate["inputName"];
        if (inputName === "" || inputName === void 0) {
            validate["inputName"] = name;
        }
        var color = validate["color"];
        if (color === "" || color === void 0) {
            validate["color"] = "red";
        }
        var message = validate["message"];
        if (message === "" || message === void 0) {
            validate["message"] = "格式错误";
        }
        var afterBlurFrequency = validate["afterBlurFrequency"];
        if (afterBlurFrequency === "" || afterBlurFrequency === void 0) {
            validate["afterBlurFrequency"] = 1;
        }
        this.validates[name] = validate;
        $(".placeholder").each(function (index, element) {
            var thisPlaceholder = $(this).data("name");
            if (thisPlaceholder == name) {
                $(this).text("请输入" + inputName);
            }
        });
    }
}

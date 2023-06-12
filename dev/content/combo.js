
//requirements: bootstrap 5.2.3, jquery 3.5.1, font-awesome 4.7.0
(function ($) {
    combo = function () {
        this.init.apply(this, arguments);
    };

    combo.prototype = {
        constructor: combo.prototype.constructor,
        defaultOptions: {
            searchable: false,
            emptyMessage: "",
            dataValueField: "",
            dataTextField: "",
            data: [],
        },

        options: {},

        currentValue: null,

        init: function (element, options) {
            //main element
            this.$element = element;

            this.options = $.extend(true, {}, this.defaultOptions, options);

            this.setData(this.options.data);

            this.refresh();
        },

        //مقدار دهی مجدد فقط دیتا
        setData: function (data) {
            
            this.options.data = data;
        },

        select: function (data = undefined) {

            if (data == undefined) {
                return this.currentValue;
            }
            else {
                this.currentValue = data;
                
                this.refresh();
            }
        },

        //بازسازی گرید
        refresh: function () {

            var that = $(this.$element)
            that.empty();

            var settings = this.options;

            var tempData = settings.data;
            //این متد را نوشتیم که بتوانیم از این متد برای سرچ استفاده کنیم
            const render = () => {
                var totalTempData = tempData.length;

                var data = ``;
                for (let i = 0; i < tempData.length; i++) {
                    const element = tempData[i];
                    data += `
                        <li value="${tempData[i][settings.dataValueField]}">${tempData[i][settings.dataTextField]}</li>
                    `;
                }

                //ساخت سرچ باکس
                var searchBox = ``;
                if (settings.searchable != false) {
                    searchBox = `
                        <div class="row p-2">
                            <div class="col-md-12">
                                <div class="input-group">
                                    <input type="text" class="form-control smfp-searchBox" >
                                    <span class="input-group-text fa fa-search"></span>
                                </div>
                            </div>
                        </div>
                    `;
                }

                //اگر به کمبو ولیو داده شده بود
                var label = ``;
                if (this.currentValue != null) {

                    var selectedData = settings.data.find(p => p[settings.dataValueField] == this.currentValue);
                    label = selectedData[settings.dataTextField];
                } else {
                    label = settings.emptyMessage;
                }

                //ساخت کامپوننت
                that.append(`
                    <div class="combo">
                        <div class="label">
                            <span class="smfp-label">${label}</span>
                        </div>
                        <div class="items" style="display: none;">
                            ${searchBox}
                            <ul>
                                ${data}
                            </ul>
                        </div>
                    </div>
                `);
                
                let myComboLabel = that.find(".combo .label");
                let myComboItems = that.find(".combo .items");

                //اگر خارج از کمبو کلیک شد بسته شود
                $(window).on("click", (e) => {
                    myComboLabel.removeClass("active");
                    myComboItems.prop("style", "display:none;");
                });

                //زمانی که روی کمبو کلیک شد
                that.find(".combo .label").on("click", (e) => {
                    e.stopPropagation();

                    myComboLabel.toggleClass("active");
                    if(myComboLabel.hasClass("label active")) {
                        myComboItems.prop("style", "display:block;");
                    } else {
                        myComboItems.prop("style", "display:none;");
                    }
                });
                
                if (settings.searchable != false) {
                    //زمانی که روی سرچ باکس کلیک کرد پنجره آیتم ها بسته نشود
                    that.find(".combo .smfp-searchBox").on("click", (e) => {
                        e.stopPropagation(); 
                    });

                    //زمانیکه در سرچ باکس تایپ کرد
                    that.find(".combo .smfp-searchBox").on("keyup", (e) => {
                        let value = e.target.value;
                        if(value == null)
                            tempData = settings.data;
                        else
                            tempData = settings.data.filter(p => p[settings.dataTextField].includes(value));
                            
                        console.log(tempData);
                        that.find(".items ul").empty();
                        var data = ``;
                        for (let i = 0; i < tempData.length; i++) {
                            const element = tempData[i];
                            data += `
                                <li value="${tempData[i][settings.dataValueField]}">${tempData[i][settings.dataTextField]}</li>
                            `;
                        }
                        that.find(".items ul").append(`
                            ${data}
                        `);
                        
                        setItemsEvent();
                    });
                }

                setItemsEvent();
            }

            const setItemsEvent = () => {
                
                let myComboLabel = that.find(".combo .label");
                let myComboItems = that.find(".combo .items");
                //زمانیکه روی آیتم های کمبو کلیک شد
                that.find(".combo .items li").on("click", (e) => {
                    e.stopPropagation();

                    this.select(e.target.value);
                    myComboLabel.removeClass("active");
                    myComboItems.prop("style", "display:none;");
                });
            };

            render();
        },
    };

    $.fn.combo = function (options) {
        return this.each(function () {
            if (!$(this).data('combo'))
                $(this).data('combo', new combo(this, options));
            else
                $(this).data('combo', new combo(this, options));
        });
    }

}(jQuery));
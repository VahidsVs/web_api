
//requirements: bootstrap 5.2.3, jquery 3.5.1, font-awesome 4.7.0
(function ($) {
    confirm = function () {
        this.init.apply(this, arguments);
    };

    confirm.prototype = {
        constructor: confirm.prototype.constructor,
        defaultOptions: {
            okText: "OK",
            cancelText: "Cancel",
            title: "Title",
            content: "Content",
            okCallback: function() {},
        },

        options: {},
        defer: {},

        init: function (element, options) {
            //main element
            this.$element = element;

            this.options = $.extend(true, {}, this.defaultOptions, options);

            this.refresh();
        },

        show: function () {
            $(this.$element).modal("show");
        },

        //بازسازی گرید
        refresh: function () {

            $("#windowPopupConfirm").remove();

            var that = $(this.$element)
            this.$element.id = "windowPopupConfirm";
            this.$element.setAttribute("class", "modal fade");
            this.$element.setAttribute("tabindex", "-1");
            this.$element.setAttribute("aria-hidden", "true");
            this.$element.setAttribute("style", "display: none;");

            var settings = this.options;

            //این متد را نوشتیم که بتوانیم از این متد برای سرچ استفاده کنیم
            const render = () => {
                
                //ساخت گرید
                that.append(`
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-6">${settings.title}</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                ${settings.content}
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-success smfp-btnOk" data-bs-dismiss="modal" aria-label="Close">${settings.okText}</button>
                                <button class="btn btn-danger smfp-btnCancel" data-bs-dismiss="modal" aria-label="Close">${settings.cancelText}</button>
                            </div>
                        </div>
                    </div>
                `);

                 $("body").append(that);

                 that.find(".smfp-btnOk").on("click", settings.okCallback);
            }

            render();
        },
    };

    $.fn.confirm = function (options) {
        return this.each(function () {
            if (!$(this).data('confirm'))
                $(this).data('confirm', new confirm(this, options));
            else
                $(this).data('confirm', new confirm(this, options));
        });
    }

}(jQuery));